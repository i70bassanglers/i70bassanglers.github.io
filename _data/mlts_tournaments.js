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
  const csvPath = path.join(__dirname, "mlts_tournaments.csv");

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(csvPath)
      .pipe(csv()) // default: headers from first row -> keys on data objects
      .on("data", (data) => {
        // csv-parser yields values as strings; keep original fields and add dateObj/formattedDate
        const dateObj = parseMmDdY((data.date || "").trim());
        rows.push({
          ...data,
          dateObj,
          formattedDate: dateObj ? formatDateUS(dateObj) : (data.date || "")
        });
      })
      .on("end", () => {
        // sort: earliest first; rows without valid date go to the end
        rows.sort((a, b) => {
          if (!a.dateObj) return 1;
          if (!b.dateObj) return -1;
          return a.dateObj - b.dateObj;
        });

        // find the first tournament after today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize to start of day
        const next = rows.find(row => row.dateObj && row.dateObj >= today);

        resolve({ 
          tournaments: rows,
          next: next || null
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
