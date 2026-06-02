const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

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
        const rawFish = (data.fish || "").trim();
        const fish = (rawFish === "-" || rawFish === "") ? null : parseInt(rawFish, 10) || null;

        function parseOptionalName(val) {
          const t = (val || "").trim();
          return (t === "-" || t === "") ? null : t;
        }

        rows.push({
          ...data,
          date: dateStr,
          dateObj,
          formattedDate,
          angler1: (data.angler1 || "").trim(),
          alt1: parseOptionalName(data.alt1),
          angler2: (data.angler2 || "").trim(),
          alt2: parseOptionalName(data.alt2),
          fish,
          final_weight: parseFloat(data.final_weight) || 0,
          big_bass: normalizeOptionalFloat(data.big_bass)
        });
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

function computeStandings(resultsByDate, scoring) {
  const teamMap = {};

  function teamKey(angler1, angler2) {
    return [angler1, angler2].map(n => n.toLowerCase()).sort().join("|");
  }

  function ensureTeam(angler1, angler2) {
    const key = teamKey(angler1, angler2);
    if (!teamMap[key]) {
      teamMap[key] = {
        angler1,
        angler2,
        totalPoints: 0,
        tiebreakerWeight: 0,
        tournaments: []
      };
    }
    return teamMap[key];
  }

  resultsByDate.forEach(dateEntry => {
    const { date, formattedDate, results, bigBass } = dateEntry;

    const bigBassWeight = bigBass ? bigBass.big_bass : null;
    let placementRank = 0;
    results.forEach(result => {
      const hasFish = result.final_weight > 0;
      if (hasFish) placementRank++;

      const placementPoints = hasFish
        ? Math.max(scoring.first_place_points - (placementRank - 1), scoring.no_fish_points + 1)
        : scoring.no_fish_points;

      const team = ensureTeam(result.angler1, result.angler2);
      team.tournaments.push({
        date,
        formattedDate,
        placement: hasFish ? placementRank : null,
        placementPoints,
        points: placementPoints,
        weight: result.final_weight,
        counted: true  // default; best-N rule may set to false below
      });
    });
  });

  // Apply best-N tournaments rule
  Object.values(teamMap).forEach(team => {
    const cap = scoring.best_tournaments_count;
    const sorted = [...team.tournaments].sort((a, b) => b.points - a.points);
    const countedDates = new Set(sorted.slice(0, cap).map(t => t.date));

    let totalPoints = 0;
    let tiebreakerWeight = 0;
    team.tournaments.forEach(t => {
      t.counted = countedDates.has(t.date);
      if (t.counted) {
        totalPoints += t.points;
        tiebreakerWeight += t.weight;
      }
    });

    team.totalPoints = totalPoints;
    team.tiebreakerWeight = Math.round(tiebreakerWeight * 100) / 100;
  });

  return Object.values(teamMap).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    return b.tiebreakerWeight - a.tiebreakerWeight;
  });
}

module.exports = function() {
  const mltsResultsDir = path.join(__dirname, "mlts_results");

  const csvFiles = fs.readdirSync(mltsResultsDir)
    .filter(f => f.endsWith(".csv"))
    .map(f => path.join(mltsResultsDir, f));

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

    // Sort results within each date by weight (descending), then by big_bass (descending)
    // Also find the big bass winner for each date
    Object.keys(byDate).forEach(dateKey => {
      const dateEntry = byDate[dateKey];

      dateEntry.results.sort((a, b) => {
        if (b.final_weight !== a.final_weight) return b.final_weight - a.final_weight;
        return (b.big_bass ?? 0) - (a.big_bass ?? 0);
      });

      dateEntry.bigBass = dateEntry.results.reduce((max, current) => {
        if (current.big_bass === null) return max;
        if (!max || current.big_bass > max.big_bass) return current;
        return max;
      }, null);
    });

    // Convert to array and sort by date (earliest first)
    const resultsByDate = Object.values(byDate).sort((a, b) => {
      if (!a.dateObj) return 1;
      if (!b.dateObj) return -1;
      return a.dateObj - b.dateObj;
    });

    const siteConfig = require("./site.json");
    const standings = computeStandings(resultsByDate, siteConfig.mlts_scoring);

    return {
      byDate: resultsByDate,
      all: rows,
      standings
    };
  });
};
