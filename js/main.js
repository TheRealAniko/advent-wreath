import { setupCountdown } from "./countdown.js";
import { getAdventSundays, getCurrentAdvent, applyAdventToCandles } from "./advent.js";

const countdownElement = document.getElementById("countdown");

const now = new Date();
const currentYear = now.getFullYear();
const christmasEve = new Date(currentYear, 11, 24, 0, 0, 0, 0);


// 1) Start countdown
setupCountdown(christmasEve, countdownElement);

// 2) Handle Advent candles
const adventSundays = getAdventSundays(currentYear);
const today = new Date();
const cuurentAdvent = getCurrentAdvent(today, adventSundays);

// Aply the advent state to the candles in the DOM
applyAdventToCandles(cuurentAdvent);