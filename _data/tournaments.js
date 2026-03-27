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

// Convert a MM/DD/YYYY date string to the results filename slug: MM_DD_YYYY
function dateToSlug(dateStr) {
  return (dateStr || "").replace(/\//g, "_").toLowerCase();
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
  const clubResultsDir = path.join(__dirname, "club_results");

  // Build a set of dates that have a results file: "03/21/2026", etc.
  const resultsDates = new Set(
    fs.readdirSync(clubResultsDir)
      .filter(f => f.endsWith(".csv"))
      .map(f => {
        const parts = path.basename(f, ".csv").split("_"); // ["03","21","2026"]
        return parts.length === 3 ? `${parts[0]}/${parts[1]}/${parts[2]}` : null;
      })
      .filter(Boolean)
  );

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => {
        const dateObj = parseMmDdY((data.date || "").trim());
        const slug = dateToSlug((data.date || "").trim());
        rows.push({
          ...data,
          dateObj,
          formattedDate: dateObj ? formatDateUS(dateObj) : (data.date || ""),
          slug,
          hasResults: resultsDates.has((data.date || "").trim())
        });
      })
      .on("end", () => {
        // sort: earliest first; rows without valid date go to the end
        rows.sort((a, b) => {
          if (!a.dateObj) return 1;
          if (!b.dateObj) return -1;
          return a.dateObj - b.dateObj;
        });

        // find the first tournament on or after today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const next = rows.find(row => row.dateObj && row.dateObj >= today);
        const prev = rows.find(row => row.dateObj && row.dateObj < today);

        // Derive checkin (15 min before) and weighin (8 hours after) from estimated_safe_light
        const nextWithTimes = next ? {
          ...next,
          checkin: shiftTime((next.estimated_safe_light || "").trim(), -15),
          weighin: shiftTime((next.estimated_safe_light || "").trim(), 8 * 60)
        } : null;

        resolve({
          tournaments: rows,
          next: nextWithTimes,
          prev: prev
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
