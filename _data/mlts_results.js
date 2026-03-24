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
        // Normalize coangler: treat "-" or blank as null
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
        if (b.weight !== a.weight) {
          return b.weight - a.weight;
        }
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

    return {
      byDate: resultsByDate,
      all: rows
    };
  });
};
