# 🚀 Advanced Features - Copy & Paste Ready

Features yang bisa langsung Anda copy-paste ke bot template!

---

## 1️⃣ USER PROFILE SYSTEM

**Features:**
- Store user data
- Track user statistics
- Personalized greeting

**Copy-paste ke setupCommands():**

```javascript
// User Profile System
this.addCommand("profil", {
  description: "Lihat profil user",
  handler: (args, senderName, sender) => {
    // Di production, ambil dari database
    const userProfile = {
      name: senderName,
      joined: new Date().toLocaleDateString("id-ID"),
      level: "Member",
      messages_sent: Math.floor(Math.random() * 100),
    };
    return `*📊 Profil User*
Nama: ${userProfile.name}
Bergabung: ${userProfile.joined}
Level: ${userProfile.level}
Pesan Terkirim: ${userProfile.messages_sent}`;
  },
});

this.addCommand("edit-profil", {
  description: "Edit profil Anda (!edit-profil nama:John umur:25)",
  handler: (args, senderName) => {
    if (!args.length) return "Format: !edit-profil nama:John umur:25";
    // Parse arguments
    const updates = {};
    args.forEach((arg) => {
      const [key, value] = arg.split(":");
      updates[key] = value;
    });
    return `✅ Profil diupdate!\n${Object.entries(updates)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`;
  },
});
```

---

## 2️⃣ BOOKING SYSTEM (Untuk ZYY RENT CAR)

**Features:**
- Create booking
- List bookings
- Cancel booking

**Copy-paste code:**

```javascript
// Temporary storage (replace dengan database di production)
const bookings = [];

this.addCommand("booking", {
  description: "Buat booking mobil (!booking tanggal:2024-01-20 mobil:BMW durasi:3)",
  handler: (args, senderName, sender) => {
    if (args.length < 3) {
      return "Format: !booking tanggal:2024-01-20 mobil:BMW durasi:3";
    }

    const booking = {};
    args.forEach((arg) => {
      const [key, value] = arg.split(":");
      booking[key] = value;
    });

    booking.user = senderName;
    booking.phone = sender.split("@")[0];
    booking.id = Math.random().toString(36).substr(2, 9).toUpperCase();
    booking.status = "PENDING";
    booking.date_created = new Date().toLocaleString("id-ID");

    bookings.push(booking);

    return `*✅ Booking Berhasil!*
ID Booking: ${booking.id}
Mobil: ${booking.mobil}
Tanggal: ${booking.tanggal}
Durasi: ${booking.durasi} hari
Status: ${booking.status}

Tunggu konfirmasi dari admin.`;
  },
});

this.addCommand("list-booking", {
  description: "Lihat daftar booking Anda",
  handler: (args, senderName) => {
    const userBookings = bookings.filter((b) => b.user === senderName);

    if (userBookings.length === 0) {
      return "Belum ada booking. Ketik !booking untuk membuat.";
    }

    let list = "*📋 Daftar Booking Anda*\n\n";
    userBookings.forEach((b, i) => {
      list += `${i + 1}. ${b.id}\n   Mobil: ${b.mobil}\n   Tgl: ${b.tanggal}\n   Status: ${b.status}\n\n`;
    });

    return list;
  },
});

this.addCommand("cancel-booking", {
  description: "Batalkan booking (!cancel-booking ID)",
  handler: (args) => {
    if (!args.length) return "Format: !cancel-booking [ID]";

    const bookingId = args[0].toUpperCase();
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) return "Booking tidak ditemukan.";
    if (booking.status === "CANCELLED") return "Booking sudah dibatalkan.";

    booking.status = "CANCELLED";
    return `✅ Booking ${bookingId} telah dibatalkan.`;
  },
});
```

---

## 3️⃣ MENU SYSTEM (Hierarchical)

**Features:**
- Main menu
- Submenu
- Back button
- State tracking

**Copy-paste code:**

```javascript
// Menu State Tracker
const userMenuState = new Map();

this.addCommand("menu", {
  description: "Tampilkan menu utama",
  handler: (args, senderName, sender) => {
    userMenuState.set(sender, "main");
    return `*🏠 Menu Utama*

1️⃣ !rentalmenu - Layanan Rental
2️⃣ !aboutmenu - Tentang Kami
3️⃣ !contactmenu - Hubungi Kami
4️⃣ !helpmenu - Help & FAQ

Ketik nomor command untuk lanjut!`;
  },
});

this.addCommand("rentalmenu", {
  description: "Menu layanan rental",
  handler: () => {
    return `*🚗 Menu Rental*

1️⃣ !car-list - Daftar Mobil
2️⃣ !car-price - Info Harga
3️⃣ !car-driver - Driver Profesional
🔙 !menu - Kembali ke menu utama`;
  },
});

this.addCommand("car-list", {
  description: "List mobil yang tersedia",
  handler: () => {
    return `*🚙 Daftar Mobil Tersedia*

*Premium:*
• BMW X5 - Rp 500.000/hari
• Mercedes E-Class - Rp 450.000/hari
• Audi Q5 - Rp 480.000/hari

*Executive:*
• Toyota Avanza - Rp 300.000/hari
• Suzuki XL7 - Rp 320.000/hari

Ketik !booking untuk pesan!`;
  },
});

this.addCommand("contactmenu", {
  description: "Menu kontak",
  handler: () => {
    return `*📞 Hubungi Kami*

📱 WhatsApp: 0812-3456-7890
📧 Email: info@zyy-rentcar.com
📍 Lokasi: Bekasi Utara
⏰ Jam Operasional: 24 Jam

Ada pertanyaan? Ketik !chat untuk berbicara dengan admin!`;
  },
});
```

---

## 4️⃣ FAQ ACCORDION SYSTEM

**Features:**
- Dynamic FAQ
- Search FAQ
- Rating answers

**Copy-paste code:**

```javascript
const faqDatabase = [
  {
    id: 1,
    category: "Umum",
    question: "Apa itu ZYY RENT CAR?",
    answer:
      "ZYY RENT CAR adalah layanan rental mobil premium di Bekasi dengan berbagai pilihan kendaraan mewah.",
  },
  {
    id: 2,
    category: "Booking",
    question: "Bagaimana cara booking mobil?",
    answer:
      "Gunakan command !booking dengan format: !booking tanggal:YYYY-MM-DD mobil:NAMA durasi:HARI",
  },
  {
    id: 3,
    category: "Pembayaran",
    question: "Metode pembayaran apa yang diterima?",
    answer: "Kami terima: Transfer Bank, E-Wallet (GCash, OVO, DANA), Kartu Kredit",
  },
  {
    id: 4,
    category: "Kebijakan",
    question: "Apakah ada biaya pembatalan?",
    answer: "Pembatalan 24 jam sebelumnya gratis. Kurang dari 24 jam: 50% dari total.",
  },
];

this.addCommand("faq", {
  description: "Tanyakan pertanyaan umum (!faq [nomor] atau !search-faq [keyword])",
  handler: (args) => {
    if (!args.length) {
      let faqList = "*❓ FAQ List*\n\n";
      faqDatabase.forEach((faq) => {
        faqList += `${faq.id}. ${faq.question}\n`;
      });
      faqList += "\nKetik !faq [nomor] untuk jawaban lengkap";
      return faqList;
    }

    const faqId = parseInt(args[0]);
    const faq = faqDatabase.find((f) => f.id === faqId);

    if (!faq) return "FAQ tidak ditemukan. Ketik !faq untuk list";

    return `*${faq.question}*\n\n${faq.answer}\n\n_Kategori: ${faq.category}_`;
  },
});

this.addCommand("search-faq", {
  description: "Cari FAQ berdasarkan keyword",
  handler: (args) => {
    if (!args.length) return "Format: !search-faq [keyword]";

    const keyword = args.join(" ").toLowerCase();
    const results = faqDatabase.filter(
      (faq) =>
        faq.question.toLowerCase().includes(keyword) ||
        faq.answer.toLowerCase().includes(keyword)
    );

    if (results.length === 0) return "Tidak ada FAQ yang cocok.";

    let output = "*📚 Hasil Pencarian*\n\n";
    results.forEach((faq) => {
      output += `${faq.id}. ${faq.question}\n`;
    });
    return output;
  },
});
```

---

## 5️⃣ ADMIN COMMANDS (Protected)

**Features:**
- Admin-only commands
- Broadcast messages
- Statistics

**Copy-paste code:**

```javascript
const ADMIN_NUMBERS = ["62812xxxxx", "62813xxxxx"]; // Ganti dengan nomor admin

this.addCommand("broadcast", {
  description: "Kirim pesan ke semua user (admin only)",
  handler: (args, senderName, sender) => {
    const senderNumber = sender.split("@")[0];

    if (!ADMIN_NUMBERS.includes(senderNumber)) {
      return "❌ Hanya admin yang bisa menggunakan command ini!";
    }

    if (!args.length) return "Format: !broadcast [pesan]";

    const message = args.join(" ");
    return `*📢 Broadcast Terkirim*\nPesan: ${message}\n\nDikirim ke semua user.`;
  },
});

this.addCommand("stats", {
  description: "Lihat statistik bot (admin only)",
  handler: (args, senderName, sender) => {
    const senderNumber = sender.split("@")[0];

    if (!ADMIN_NUMBERS.includes(senderNumber)) {
      return "❌ Hanya admin yang bisa menggunakan command ini!";
    }

    return `*📊 Bot Statistics*

Total Users: ${userMenuState.size}
Total Bookings: ${bookings.length}
Pending Bookings: ${bookings.filter((b) => b.status === "PENDING").length}
Completed: ${bookings.filter((b) => b.status === "COMPLETED").length}
Uptime: ${Math.floor(process.uptime() / 60)} minutes`;
  },
});

this.addCommand("set-status", {
  description: "Set bot status (admin only)",
  handler: (args, senderName, sender) => {
    const senderNumber = sender.split("@")[0];

    if (!ADMIN_NUMBERS.includes(senderNumber)) {
      return "❌ Hanya admin yang bisa menggunakan command ini!";
    }

    const status = args.join(" ");
    // Implementation untuk set bot status
    return `✅ Status bot diubah: ${status}`;
  },
});
```

---

## 6️⃣ SCHEDULER (Broadcast Otomatis)

**Requires:** `npm install node-cron`

**Copy-paste code:**

```javascript
// Di paling atas file
const cron = require("node-cron");

// Di dalam class WhatsAppBot, tambah method:
scheduleMessages() {
  // Setiap hari jam 9 pagi
  cron.schedule("0 9 * * *", async () => {
    const message = `🌅 Selamat pagi!\n\nDiskon spesial hari ini:\n✨ Rental mobil: Diskon 15%\n\nHubungi kami untuk info lebih lanjut!`;

    const adminGroups = ["120363024xxxxxxx@g.us"]; // Group ID
    for (const groupId of adminGroups) {
      await this.sendMessage(groupId, message);
    }

    this.logger.log("📢 Scheduled message sent");
  });

  // Setiap jam
  cron.schedule("0 * * * *", async () => {
    this.logger.log("⏰ Hourly check-in");
  });
}

// Panggil di initialize():
// this.scheduleMessages();
```

---

## 7️⃣ MESSAGE QUEUE (Rate Limiting)

**Features:**
- Prevent spam
- Queue messages
- Rate limiting per user

**Copy-paste code:**

```javascript
class MessageQueue {
  constructor(maxPerMinute = 5) {
    this.queue = [];
    this.userLimits = new Map();
    this.maxPerMinute = maxPerMinute;
  }

  canSendMessage(userId) {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    if (!this.userLimits.has(userId)) {
      this.userLimits.set(userId, []);
    }

    const userMessages = this.userLimits.get(userId);
    const recentMessages = userMessages.filter((time) => time > oneMinuteAgo);

    if (recentMessages.length >= this.maxPerMinute) {
      return false;
    }

    recentMessages.push(now);
    this.userLimits.set(userId, recentMessages);
    return true;
  }
}

// Gunakan di handleMessage:
const messageQueue = new MessageQueue(10); // Max 10 pesan per menit

// Di handleMessage:
if (!messageQueue.canSendMessage(sender)) {
  await this.sendMessage(sender, "⏱️ Anda mengirim pesan terlalu cepat. Tunggu sebentar.");
  return;
}
```

---

## 8️⃣ REMINDER SYSTEM

**Copy-paste code:**

```javascript
const reminders = [];

this.addCommand("remind", {
  description: "Set reminder (!remind jam:14:30 pesan:Kerja deadline)",
  handler: (args, senderName, sender) => {
    if (args.length < 2) {
      return "Format: !remind jam:14:30 pesan:Isi reminder";
    }

    let jam, pesan;
    args.forEach((arg) => {
      const [key, value] = arg.split(":");
      if (key === "jam") jam = value;
      if (key === "pesan") pesan = value;
    });

    if (!jam || !pesan) return "Format tidak valid";

    const reminder = {
      user: senderName,
      phone: sender,
      jam,
      pesan,
      id: Math.random().toString(36).substr(2, 9),
    };

    reminders.push(reminder);
    return `✅ Reminder set untuk jam ${jam}\nPesan: ${pesan}`;
  },
});
```

---

## 🎯 Cara Pakai:

1. **Pick** salah satu fitur dari list
2. **Copy** kode lengkapnya
3. **Paste** ke setupCommands() atau class methods
4. **Test** dengan WhatsApp
5. **Customize** sesuai kebutuhan

---

**Gunakan Copilot untuk modify & enhance!** 🚀

