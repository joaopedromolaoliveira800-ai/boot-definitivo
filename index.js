require("dotenv").config();
const mineflayer = require("mineflayer");

const host = (process.env.MC_HOST || "").trim();
const port = Number(process.env.MC_PORT || "25565");
const username = (process.env.MC_USERNAME || "").trim();
const version = (process.env.MC_VERSION || "").trim() || false;
const auth = (process.env.MC_AUTH || "microsoft").trim().toLowerCase();

if (!host || !username) {
  console.error("Configure MC_HOST e MC_USERNAME nas variáveis de ambiente.");
  process.exit(1);
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("MC_PORT precisa ser uma porta válida entre 1 e 65535.");
  process.exit(1);
}

// Aternos proíbe bots/reconexões usados para contornar o desligamento automático.
// Este template não se conecta a domínios Aternos.
if (/(^|\\.)aternos\\.me$/i.test(host) || /(^|\\.)aternos\\.org$/i.test(host)) {
  console.error("Conexão bloqueada: não use este bot para manter um servidor Aternos ativo.");
  process.exit(1);
}

if (!["microsoft", "offline"].includes(auth)) {
  console.error("MC_AUTH deve ser 'microsoft' ou 'offline'.");
  process.exit(1);
}

console.log(`Conectando a ${host}:${port} como ${username}...`);
const options = { host, port, username, auth };
if (version) options.version = version;

const bot = mineflayer.createBot(options);

bot.once("login", () => console.log("Login realizado."));
bot.once("spawn", () => console.log("Bot entrou no mundo e ficará parado."));
bot.on("kicked", (reason) => console.log("Servidor expulsou o bot:", reason));
bot.on("error", (err) => console.error("Erro do bot:", err.message));
bot.once("end", (reason) => {
  console.log("Conexão encerrada:", reason || "sem motivo informado");
  console.log("Este template não tenta reconectar automaticamente.");
});
process.on("SIGTERM", () => {
  try { bot.quit("Encerrando o serviço"); } catch (_) {}
  setTimeout(() => process.exit(0), 1000);
});
