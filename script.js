// Countdown logic

// Sanity check
// const countdownElement = document.getElementById('countdown');

// if (countdownElement) {
//     countdownElement.textContent = "Countdown is working.";
// } else {
//     console.warn("Countdown element not found.");
// }

// Calculate time difference

// 1) Get countdown element
const countdownElement = document.getElementById("countdown");

if (!countdownElement) {
    console.error("Countdown element not found.");
}

// 2) Define time constants
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

// 3) Get "now" and define target date
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const TIMEZONE_LABEL = "Europe/Berlin";

    function pad(value) {
        return value.toString().padStart(2, "0");
    }

    // Months
    const christmasEve = new Date(currentYear, 11, 24, 0, 0, 0, 0);

    // 4) Calculate the differnce in milliseconds
    const diffMs = christmasEve - now;

    // 5) If Christmas Eve is in the past or now
    if (diffMs <= 0) {
        if (countdownElement) {
            countdownElement.textContent = `It is Christmas Eve! (${TIMEZONE_LABEL})`;
        }
    } else {
        // 6) Convert diffMs to days, hours, minutes, seconds
        const days = Math.floor(diffMs / MS_PER_DAY);
        const daysRemainder = diffMs % MS_PER_DAY;

        const hours = Math.floor(daysRemainder / MS_PER_HOUR);
        const hoursRemainder = daysRemainder % MS_PER_HOUR;

        const minutes = Math.floor(hoursRemainder / MS_PER_MINUTE);
        const minutesRemainder = hoursRemainder % MS_PER_MINUTE;

        const seconds = Math.floor(minutesRemainder / MS_PER_SECOND);

        // 7) Display the result
        const countdownText = `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)} until Christmas Eve (${TIMEZONE_LABEL})`;


        if (countdownElement) {
            countdownElement.textContent = countdownText;
        }

        console.log("diffMs:", diffMs);
        console.log("days:", days, "hours:", hours, "minutes:", minutes, "seconds:", seconds);
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);