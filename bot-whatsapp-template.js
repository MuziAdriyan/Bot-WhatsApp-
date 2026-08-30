/**
 * ============================================
 * BOT WHATSAPP TEMPLATE - BAILEYS
 * Ready to Use & Develop with Copilot
 * ============================================
 */

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  MessageType,
} = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

// ============================================
// CONFIG
// ============================================
const CONFIG = {
  PREFIX: "!",
  BOT_NAME: "ZYY Bot",
  OWNER_NUMBER: "62xxxxxxxxxxxx", // Ganti dengan nomor Anda
  AUTO_REPLY_ENABLED: true,
  LOG_MESSAGES: true,
};

// ============================================
// SIMPLE MESSAGE LOGGER
// ============================================
class MessageLogger {
  constructor() {
    this.logFile = path.join(__dirname, "bot_messages.log");
  }

  log(message) {
    const timestamp = new Date().toLocaleString("id-ID");
    const logEntry = `[${timestamp}] ${message}\n`;
    if (CONFIG.LOG_MESSAGES) {
      fs.appendFileSync(this.logFile, logEntry);
    }
    console.log(logEntry);
  }
}

const logger = new MessageLogger();

// ============================================
// COMMAND HANDLER
// ============================================
class CommandHandler {
  constructor() {
    this.commands = new Map();
    this.setupCommands();
  }

  setupCommands() {
    // Help Command
    this.addCommand("help", {
      description: "Tampilkan semua command",
      handler: () => {
        let helpText = `🤖 *${CONFIG.BOT_NAME} - Command List*\n\n`;
        this.commands.forEach((cmd, name) => {
          helpText += `${CONFIG.PREFIX}${name} - ${cmd.description}\n`;
        });
        return helpText;
      },
    });

    // Ping Command
    this.addCommand("ping", {
      description: "Check bot status",
      handler: () => "Pong! Bot aktif ✅",
    });

    // Info Command
    this.addCommand("info", {
      description: "Info bot",
      handler: () => {
        return `*${CONFIG.BOT_NAME}*\nStatus: Online ✅\nMenggunakan: Baileys\nPrefix: ${CONFIG.PREFIX}`;
      },
    });

    // Halo Command
    this.addCommand("halo", {
      description: "Sapa bot",
      handler: (args, senderName) => {
        return `Halo ${senderName}! 👋 Apa kabar?`;
      },
    });

    // Waktu Command
    this.addCommand("waktu", {
      description: "Tampilkan waktu sekarang",
      handler: () => {
        const now = new Date().toLocaleString("id-ID");
        return `⏰ *Waktu Sekarang*\n${now}`;
      },
    });

    // Stiker Command
    this.addCommand("stiker", {
      description: "Convert gambar jadi stiker (kirim gambar + !stiker)",
      handler: () => "Fitur ini perlu integrasi media lebih lanjut",
    });

    // Menu Rental (Custom untuk ZYY RENT CAR)
    this.addCommand("rental", {
      description: "Info layanan rental mobil",
      handler: () => {
        return `*🚗 ZYY RENT CAR - Layanan Premium*
        
Kami menyediakan:
• Mobil Mewah (BMW, Mercedes, Audi)
• Mobil Executive (Avanza, Xenia)
• Driver Profesional
• 24/7 Customer Support

Hubungi sekarang untuk info lebih detail!`;
      },
    });

    // Hitung Command
    this.addCommand("hitung", {
      description: "Kalkulator sederhana (contoh: !hitung 5+3)",
      handler: (args) => {
        if (!args.length) return "Gunakan: !hitung 5+3";
        try {
          const result = eval(args.join(" "));
          return `📊 Hasil: ${result}`;
        } catch (e) {
          return "❌ Format tidak valid";
        }
      },
    });
  }

  addCommand(name, config) {
    this.commands.set(name.toLowerCase(), config);
  }

  async execute(command, args, sender, senderName) {
    const cmd = this.commands.get(command.toLowerCase());
    if (!cmd) return null;

    try {
      return await Promise.resolve(cmd.handler(args, senderName, sender));
    } catch (error) {
      logger.log(`❌ Error executing command ${command}: ${error.message}`);
      return "❌ Terjadi kesalahan saat menjalankan command";
    }
  }

  getCommands() {
    return this.commands;
  }
}

const commandHandler = new CommandHandler();

// ============================================
// AUTO REPLY DATA
// ============================================
const autoReplyData = {
  keywords: {
    halo: "Halo! Apa yang bisa saya bantu? 😊",
    hai: "Hai! Senang bertemu dengan Anda 👋",
    assalamualaikum: "Wa'alaikumassalam wa rahmatullahi wa barakatuh ☪️",
    terima: "Terima kasih! Saya appreciate banget 🙏",
    thanks: "Thanks! Senang bisa membantu 😊",
    "apa kabar": "Saya baik-baik saja! Bagaimana dengan Anda? 😄",
  },
};

// ============================================
// WHATSAPP BOT CLASS
// ============================================
class WhatsAppBot {
  constructor() {
    this.socket = null;
    this.logger = logger;
  }

  async initialize() {
    try {
      const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

      this.socket = makeWASocket({
        auth: state,
        printQRInTerminal: true,
      });

      // Handle credentials update
      this.socket.ev.on("creds.update", saveCreds);

      // Handle connection updates
      this.socket.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.logger.log("📱 Scan QR Code dengan WhatsApp Anda:");
          qrcode.generate(qr, { small: true });
        }

        if (connection === "connecting") {
          this.logger.log("⏳ Menghubungkan...");
        }

        if (connection === "open") {
          this.logger.log("✅ Bot Terhubung!");
        }

        if (connection === "close") {
          if (
            lastDisconnect?.error?.output?.statusCode !==
            DisconnectReason.loggedOut
          ) {
            this.logger.log("🔄 Reconnecting...");
            setTimeout(() => this.initialize(), 3000);
          } else {
            this.logger.log("❌ Device logged out");
          }
        }
      });

      // Handle incoming messages
      this.socket.ev.on("messages.upsert", (m) => {
        this.handleMessage(m);
      });
    } catch (error) {
      this.logger.log(`❌ Error initializing: ${error.message}`);
      setTimeout(() => this.initialize(), 5000);
    }
  }

  async handleMessage(m) {
    try {
      const message = m.messages[0];
      if (!message.message || message.key.fromMe) return;

      const text = message.message.conversation || 
                   message.message.extendedTextMessage?.text || "";
      const sender = message.key.remoteJid;
      const senderNumber = sender.split("@")[0];
      const isGroup = sender.includes("@g.us");

      // Get sender name
      let senderName = "User";
      if (isGroup) {
        const groupMetadata = await this.socket.groupMetadata(sender);
        const participant = groupMetadata.participants.find(
          (p) => p.id.split("@")[0] === senderNumber
        );
        senderName = participant?.pushName || participant?.id.split("@")[0];
      } else {
        senderName = message.pushName || senderNumber;
      }

      this.logger.log(
        `📨 [${isGroup ? "GROUP" : "PRIVATE"}] ${senderName}: ${text}`
      );

      // Command Handler
      if (text.startsWith(CONFIG.PREFIX)) {
        await this.handleCommand(text, sender, senderName, senderNumber);
        return;
      }

      // Auto Reply
      if (CONFIG.AUTO_REPLY_ENABLED) {
        await this.handleAutoReply(text, sender);
      }
    } catch (error) {
      this.logger.log(`❌ Error handling message: ${error.message}`);
    }
  }

  async handleCommand(text, sender, senderName, senderNumber) {
    const args = text.slice(CONFIG.PREFIX.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    const response = await commandHandler.execute(
      command,
      args,
      sender,
      senderName
    );

    if (response) {
      await this.sendMessage(sender, response);
      this.logger.log(`💬 Sent to ${senderName}: ${response}`);
    } else {
      await this.sendMessage(
        sender,
        `❌ Command '${CONFIG.PREFIX}${command}' tidak dikenal. Ketik '${CONFIG.PREFIX}help' untuk melihat command list`
      );
    }
  }

  async handleAutoReply(text, sender) {
    const lowerText = text.toLowerCase();

    for (const [keyword, reply] of Object.entries(autoReplyData.keywords)) {
      if (lowerText.includes(keyword)) {
        await this.sendMessage(sender, reply);
        this.logger.log(`🔄 Auto reply sent for keyword: ${keyword}`);
        break;
      }
    }
  }

  async sendMessage(jid, message) {
    try {
      await this.socket.sendMessage(jid, { text: message });
    } catch (error) {
      this.logger.log(`❌ Error sending message: ${error.message}`);
    }
  }

  start() {
    this.logger.log("🚀 Memulai Bot WhatsApp...");
    this.initialize();
  }
}

// ============================================
// MAIN EXECUTION
// ============================================
const bot = new WhatsAppBot();
bot.start();

// Graceful shutdown
process.on("SIGINT", () => {
  logger.log("👋 Bot dihentikan");
  process.exit(0);
});
