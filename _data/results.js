const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

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

module.exports = function() {
  const csvPath = path.join(__dirname, "results.csv");

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => {
        const dateObj = parseMmDdY((data.date || "").trim());
        rows.push({
          ...data,
          dateObj,
          formattedDate: dateObj ? formatDateUS(dateObj) : (data.date || ""),
          count: parseInt(data.count, 10) || 0,
          weight: parseFloat(data.weight) || 0,
          big_bass: parseFloat(data.big_bass) || 0
        });
      })
      .on("end", () => {
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
          
          // Sort by weight descending, then big_bass descending
          dateEntry.results.sort((a, b) => {
            if (b.weight !== a.weight) {
              return b.weight - a.weight;
            }
            return b.big_bass - a.big_bass;
          });

          // Find the entry with the highest big_bass
          dateEntry.bigBass = dateEntry.results.reduce((max, current) => {
            if (!max || current.big_bass > max.big_bass) {
              return current;
            }
            return max;
          }, null);
        });

        // Convert to array and sort by date (earliest first)
        const resultsByDate = Object.values(byDate).sort((a, b) => {
          if (!a.dateObj) return 1;
          if (!b.dateObj) return -1;
          return a.dateObj - b.dateObj; // ascending
        });

        resolve({ 
          byDate: resultsByDate,
          all: rows
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
