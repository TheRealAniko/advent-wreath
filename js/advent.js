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

/**
 * Updates the burn progress of each candle.
 * Model:
 * - Candle i starts burning on adventSundays[i]
 * - and burns down gradually until Christmas Eve.
 * 
 * today: Date object (can be mocked for testing)
 * adventSundays: array of 4 Date objects
 * christmasEve: Date object
 */
export const updateCandleBurnProgress = (today, adventSundays, christmasEve) => {
    const candles = document.querySelectorAll(".candle");
    if (!candles.length || adventSundays.length !== 4) return;

    const todayTime = today.getTime();
    const christmasTime = christmasEve.getTime();

    candles.forEach((candle, index) => {
        const startDate = adventSundays[index];
        const startTime = startDate.getTime();

        let progress = 0;

        if (todayTime <= startTime) {
            // Befor this candle's Advent: not burned at all
            progress = 0;
        } else if (todayTime >= christmasTime) {
            // After Christmas Eve: fully burned
            progress = 1;
        } else {
            // During this candle's Advent: calculate progress
            const total = christmasTime - startTime;
            const elapsed = todayTime - startTime;
            progress = elapsed / total;
        }

        // Clamp progress between 0 and 1
        const clamped = Math.max(0, Math.min(1, progress));

        // Map progress (0-1) to a scale factor
        // 1.0 = full height, 0.3 = almost burned down
        const minScale = 0.3;
        const scale = 1 - (1 - minScale) * clamped;

        candle.style.setProperty("--wax-scale", scale.toFixed(3));
    });
};