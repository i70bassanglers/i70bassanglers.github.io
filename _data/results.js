const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const siteConfig = require("./site.json");
const scoring = siteConfig.scoring;

// Derive a MM/DD/YYYY date string from a filename like "03_21_2026.csv"
function dateFromFilename(filename) {
  const base = path.basename(filename, ".csv"); // "03_21_2026"
  const parts = base.split("_");               // ["03", "21", "2026"]
  if (parts.length !== 3) return null;
  return `${parts[0]}/${parts[1]}/${parts[2]}`; // "03/21/2026"
}

function parseMmDdY(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("/").map(s => parseInt(s, 10));
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const month = parts[0] - 1;
  const day = parts[1];
  const year = parts[2];
  return new Date(year, month, day);
}

function formatDateUS(dateObj) {
  if (!dateObj) return "";
  return dateObj.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
}

function normalizeOptionalFloat(value) {
  const trimmed = (value || "").trim();
  if (trimmed === "-" || trimmed === "") return null;
  const parsed = parseFloat(trimmed);
  return isNaN(parsed) ? null : parsed;
}

function parseCSVFile(filePath) {
  const dateStr = dateFromFilename(filePath);
  const dateObj = parseMmDdY(dateStr);
  const formattedDate = formatDateUS(dateObj);

  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const rawCoangler = (data.coangler || "").trim();
        const coangler = (rawCoangler === "-" || rawCoangler === "") ? null : rawCoangler;

        rows.push({
          ...data,
          date: dateStr,
          dateObj,
          formattedDate,
          coangler,
          count: parseInt(data.count, 10) || 0,
          weight: parseFloat(data.weight) || 0,
          big_bass: normalizeOptionalFloat(data.big_bass)
        });
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

function applyBestTournamentsRule(person) {
  const cap = scoring.best_tournaments_count;

  // Sort tournaments by points descending to find the best N
  const sorted = [...person.tournaments].sort((a, b) => b.points - a.points);
  const countedDates = new Set(sorted.slice(0, cap).map(t => t.date));

  // Mark each tournament entry and sum points and weight from counted ones only
  let tournamentPoints = 0;
  let tiebreakerWeight = 0;
  person.tournaments.forEach(t => {
    t.counted = countedDates.has(t.date);
    if (t.counted) {
      tournamentPoints += t.points;
      tiebreakerWeight += t.weight;
    }
  });

  person.tournamentPoints = tournamentPoints;
  person.tiebreakerWeight = Math.round(tiebreakerWeight * 100) / 100;
}

function computeStandings(resultsByDate, meetings) {
  // Build meeting attendance map: name -> points (capped)
  const meetingPointsMap = {};
  meetings.forEach(meeting => {
    (meeting.attendees || []).forEach(name => {
      meetingPointsMap[name] = Math.min(
        (meetingPointsMap[name] || 0) + scoring.meeting_points,
        scoring.meeting_points_cap
      );
    });
  });

  // Maps keyed by name for anglers and co-anglers separately
  const anglerMap = {};
  const coAnglerMap = {};

  function ensurePerson(map, name) {
    if (!map[name]) {
      map[name] = {
        name,
        totalPoints: 0,
        tournamentPoints: 0,
        meetingPoints: 0,
        tiebreakerWeight: 0,
        tournaments: []
      };
    }
    return map[name];
  }

  function awardPoints(map, name, date, formattedDate, placementPoints, bigBassBonus, weight) {
    const person = ensurePerson(map, name);
    const tourneyPoints = placementPoints + bigBassBonus;
    person.tournaments.push({
      date,
      formattedDate,
      placement: null,  // filled in below
      placementPoints,
      bigBassBonus,
      points: tourneyPoints,
      weight,           // boat weight for tiebreaker
      counted: true     // default; applyBestTournamentsRule may set to false
    });
  }

  resultsByDate.forEach(dateEntry => {
    const { date, formattedDate, results, bigBass } = dateEntry;

    // Determine which boats get the big bass bonus (ties both get it)
    const bigBassWeight = bigBass ? bigBass.big_bass : null;
    const bigBassWinners = new Set(
      results
        .filter(r => r.big_bass !== null && r.big_bass === bigBassWeight)
        .map(r => r.angler)
    );

    // Assign placement points — only among boats that weighed fish
    // Boats are already sorted by weight desc in resultsByDate
    let placementRank = 0;
    results.forEach((result) => {
      const hasfish = result.count > 0;
      if (hasfish) placementRank++;

      const placementPoints = hasfish
        ? Math.max(scoring.first_place_points - (placementRank - 1), scoring.no_fish_points + 1)
        : scoring.no_fish_points;

      const bigBassBonus = bigBassWinners.has(result.angler) ? scoring.big_bass_bonus : 0;

      // Award angler
      awardPoints(anglerMap, result.angler, date, formattedDate, placementPoints, bigBassBonus, result.weight);
      anglerMap[result.angler].tournaments.at(-1).placement = hasfish ? placementRank : null;

      // Award co-angler (same placement points and weight as their boat)
      if (result.coangler) {
        awardPoints(coAnglerMap, result.coangler, date, formattedDate, placementPoints, bigBassBonus, result.weight);
        coAnglerMap[result.coangler].tournaments.at(-1).placement = hasfish ? placementRank : null;
      }
    });
  });

  // Apply best-N tournaments rule and fold in meeting points
  const allNames = new Set([...Object.keys(anglerMap), ...Object.keys(coAnglerMap)]);
  allNames.forEach(name => {
    const meetingPts = meetingPointsMap[name] || 0;

    if (anglerMap[name]) {
      applyBestTournamentsRule(anglerMap[name]);
      anglerMap[name].meetingPoints = meetingPts;
      anglerMap[name].totalPoints = anglerMap[name].tournamentPoints + meetingPts;
    }
    if (coAnglerMap[name]) {
      applyBestTournamentsRule(coAnglerMap[name]);
      coAnglerMap[name].meetingPoints = meetingPts;
      coAnglerMap[name].totalPoints = coAnglerMap[name].tournamentPoints + meetingPts;
    }
  });

  // Sort by total points descending, tiebreaker weight descending
  const sortByPoints = list => list.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    return b.tiebreakerWeight - a.tiebreakerWeight;
  });

  return {
    anglers: sortByPoints(Object.values(anglerMap)),
    coAnglers: sortByPoints(Object.values(coAnglerMap))
  };
}

module.exports = function() {
  const clubResultsDir = path.join(__dirname, "club_results");
  const meetingsPath = path.join(__dirname, "club_meetings.json");

  const csvFiles = fs.readdirSync(clubResultsDir)
    .filter(f => f.endsWith(".csv"))
    .map(f => path.join(clubResultsDir, f));

  const meetings = JSON.parse(fs.readFileSync(meetingsPath, "utf8"));

  return Promise.all(csvFiles.map(parseCSVFile)).then(allRowArrays => {
    const rows = allRowArrays.flat();

    // Group results by date
    const byDate = {};
    rows.forEach(row => {
      const dateKey = row.date;
      if (!byDate[dateKey]) {
        byDate[dateKey] = {
          date: row.date,
          dateObj: row.dateObj,
          formattedDate: row.formattedDate,
          results: [],
          bigBass: null
        };
      }
      byDate[dateKey].results.push(row);
    });

    // Sort results within each date and find big bass
    Object.keys(byDate).forEach(dateKey => {
      const dateEntry = byDate[dateKey];

      dateEntry.results.sort((a, b) => {
        if (b.weight !== a.weight) return b.weight - a.weight;
        return (b.big_bass ?? 0) - (a.big_bass ?? 0);
      });

      dateEntry.bigBass = dateEntry.results.reduce((max, current) => {
        if (current.big_bass === null) return max;
        if (!max || current.big_bass > max.big_bass) return current;
        return max;
      }, null);
    });

    // Convert to array and sort by date ascending
    const resultsByDate = Object.values(byDate).sort((a, b) => {
      if (!a.dateObj) return 1;
      if (!b.dateObj) return -1;
      return a.dateObj - b.dateObj;
    });

    const standings = computeStandings(resultsByDate, meetings);

    return {
      byDate: resultsByDate,
      all: rows,
      standings
    };
  });
};
