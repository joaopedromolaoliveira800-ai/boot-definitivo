require("dotenv").config();
const mineflayer = require("@wp2508/mineflayer");

const host = (process.env.MC_HOST || "").trim();
const port = Number(process.env.MC_PORT || "25565");
const username = (process.env.MC_USERNAME || "").trim();
const version = (process.env.MC_VERSION || "").trim() || false;
const auth = (process.env.MC_AUTH || "microsoft").trim().toLowerCase();

if (!host || !username) {
  console.error("Configure MC_HOST and MC_USERNAME in environment variables.");
  process.exit(1);
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("MC_PORT must be a valid port between 1 and 65535.");
  process.exit(1);
}

// Do not use bots to bypass Aternos auto-shutdown or its rules.
if (/(^|\.)aternos\.me$/i.test(host) || /(^|\.)aternos\.org$/i.test(host)) {
  console.error("Connection blocked: this bot will not connect to Aternos to keep it artificially online.");
  process.exit(1);
}

if (!["microsoft", "offline"].includes(auth)) {
  console.error("MC_AUTH must be 'microsoft' or 'offline'.");
  process.exit(1);
}

console.log(`Connecting to ${host}:${port} as ${username}...`);
const options = { host, port, username, auth };
if (version) options.version = version;

const bot = mineflayer.createBot(options);

bot.once("login", () => console.log("Login successful."));
bot.once("spawn", () => console.log("Bot entered the world."));
bot.on("kicked", (reason) => console.log("Kicked by server:", reason));
bot.on("error", (err) => console.error("Bot error:", err.message));
bot.once("end", (reason) => {
  console.log("Connection ended:", reason || "no reason provided");
  console.log("Automatic reconnect is not enabled in this template.");
});

process.on("SIGTERM", () => {
  try { bot.quit("Service shutting down"); } catch (_) {}
  setTimeout(() => process.exit(0), 1000);
});
