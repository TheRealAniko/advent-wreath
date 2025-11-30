import { setupCountdown } from "./countdown.js";

const countdownElement = document.getElementById("countdown");

const now = new Date();
const currentYear = now.getFullYear();
const christmasEve = new Date(currentYear, 11, 24, 0, 0, 0, 0);

setupCountdown(christmasEve, countdownElement);