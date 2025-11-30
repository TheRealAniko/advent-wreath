import { pad } from './utils.js';

const MS = {
    SECOND: 1000,
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
};

const TIMEZONE_LABEL = "Europe/Berlin";

/**
 * Sets up a live countdown that updates the given element
 * every second until the targetDate is reached.
 *
 * @param {Date} targetDate - The date we are counting down to
 * @param {HTMLElement | null} element - The DOM element where the text should appear
 */

export const setupCountdown = (targetDate, element) => {
    if (!element) {
        console.warn("Countdown element not found.");
        return;
    }

    const updat = () => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            element.innerHTML = `
    <span class="countdown-time">It is Christmas Eve! </span>
    <span class="countdown-tz">${TIMEZONE_LABEL}</span>
  `;
            return;
        }

        const days = Math.floor(diff / MS.DAY);
        const hours = Math.floor((diff % MS.DAY) / MS.HOUR);
        const minutes = Math.floor((diff % MS.HOUR) / MS.MINUTE);
        const seconds = Math.floor((diff % MS.MINUTE) / MS.SECOND);

        element.innerHTML = `
  <span class="countdown-time">
    ${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s
  </span>
  <span class="countdown-label">
    until Christmas Eve
  </span>
  <span class="countdown-tz">
    ${TIMEZONE_LABEL}
  </span>
`;
    };

    updat();
    setInterval(updat, 1000);
}