/**
 * Returns an array of the four Advent Sundays for a given year.
 * Algorithm:
 * - Start from December 24th
 * - Walk backwards day by day
 * - Collect the four last Sundays before Christmas
 */

export const getAdventSundays = (year) => {
    const start = new Date(year, 11, 24); // December 24th
    const sundays = [];
    const cursor = new Date(start);

    while (sundays.length < 4) {
        if (cursor.getDay() === 0) {
            // 0 = Sunday
            // unshift so the earlist Sunday is first in the array
            sundays.unshift(new Date(cursor));
        }
        // Move back one day
        cursor.setDate(cursor.getDate() - 1);
    }
    return sundays;
};

/**
 * Returns which Advent Sunday today is:
 * 0 = before Advent
 * 1–4 = 1st, 2nd, 3rd, 4th Sunday of Advent
 */
export const getCurrentAdvent = (today, adventSundays) => {
    // Normalize time to midnight for accurate comparison
    const normalizedToday = new Date(
        today.getFullYear(), today.getMonth(), today.getDate()
    );

    let adventNumber = 0;

    adventSundays.forEach((sunday, index) => {
        const normalizedSunday = new Date(
            sunday.getFullYear(), sunday.getMonth(), sunday.getDate()
        );

        if (normalizedToday >= normalizedSunday) {
            adventNumber = index + 1; // 1-4
        }
    });

    return adventNumber;
};

/**
 * Applies the Advent state to the candles in the DOM.
 * For Advent N:
 * - candles 1..N are "active"
 * - candles (N+1)..4 are "inactive"
 */

export const applyAdventToCandles = (adventNumber) => {
    const candles = document.querySelectorAll(".candle");

    candles.forEach((candle, index) => {
        const isActive = index < adventNumber;
        candle.classList.toggle("active", isActive);
        candle.classList.toggle("inactive", !isActive);
    });
};