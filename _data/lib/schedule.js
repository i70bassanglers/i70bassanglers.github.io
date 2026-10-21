const fs = require("fs");
const path = require("path");

// The season-ending Club Championship is a normal club tournament (it appears
// on the schedule and has its own results page) but it does NOT count toward
// Angler of the Year or Co-Angler of the Year points.
//
// It is identified by the word "Championship" in the `lake` column of
// tournaments.csv, e.g. "Championship - Melvern Lake". If a future season
// renames the event (e.g. "Club Classic"), update CHAMPIONSHIP_PATTERN so the
// event is still excluded from the standings.
const CHAMPIONSHIP_PATTERN = /championship/i;

function isChampionshipLake(lake) {
  return CHAMPIONSHIP_PATTERN.test((lake || "").trim());
}

// Minimal CSV line splitter that understands double-quoted fields.
function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);

  return cells.map(cell => cell.trim());
}

// Read tournaments.csv into plain objects:
// { date, lake, ramp, estimated_safe_light, status, isChampionship, countsForStandings }
function readSchedule() {
  const csvPath = path.join(__dirname, "..", "tournaments.csv");
  const text = fs.readFileSync(csvPath, "utf8");
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) return [];

  const header = splitCsvLine(lines.shift());

  return lines
    .map(line => {
      const cells = splitCsvLine(line);
      const row = {};
      header.forEach((key, index) => {
        row[key] = cells[index] !== undefined ? cells[index] : "";
      });

      row.date = (row.date || "").trim();
      row.isChampionship = isChampionshipLake(row.lake);
      row.countsForStandings = !row.isChampionship;

      return row;
    })
    .filter(row => row.date.length > 0);
}

// Dates of scheduled events that do not count toward AOY / CAOY points.
function championshipDates() {
  return new Set(
    readSchedule()
      .filter(row => row.isChampionship)
      .map(row => row.date)
  );
}

// Number of scheduled events that count toward AOY / CAOY points.
function countingTournamentsCount() {
  return readSchedule().filter(row => row.countsForStandings).length;
}

module.exports = {
  CHAMPIONSHIP_PATTERN,
  isChampionshipLake,
  readSchedule,
  championshipDates,
  countingTournamentsCount
};
