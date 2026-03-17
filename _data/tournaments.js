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

// Shift a time string like "7:30AM" or "6:00PM" by offsetMinutes
// (positive = forward, negative = backward) and return the result in the same
// format, or null if the input isn't a valid time or is "TBD".
function shiftTime(timeStr, offsetMinutes) {
  if (!timeStr || timeStr.trim().toUpperCase() === "TBD") return null;

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  // Convert to 24-hour for arithmetic
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes + offsetMinutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  // Convert back to 12-hour
  let displayHours = newHours % 12;
  if (displayHours === 0) displayHours = 12;
  const displayMeridiem = newHours < 12 ? "AM" : "PM";
  const displayMinutes = String(newMinutes).padStart(2, "0");

  return `${displayHours}:${displayMinutes}${displayMeridiem}`;
}

module.exports = function() {
  const csvPath = path.join(__dirname, "tournaments.csv");

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

        // Derive checkin (30 min before) and weighin (8 hours after) from estimated_safe_light
        const nextWithTimes = next ? {
          ...next,
          checkin: shiftTime((next.estimated_safe_light || "").trim(), -30),
          weighin: shiftTime((next.estimated_safe_light || "").trim(), 8 * 60)
        } : null;

        resolve({ 
          tournaments: rows,
          next: nextWithTimes
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
