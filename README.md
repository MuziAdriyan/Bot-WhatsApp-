# 🤖 ZYY WhatsApp Bot - Template Ready to Use

Bot WhatsApp full-featured dengan Baileys library. Siap dipakai dan dikembangkan lebih lanjut dengan GitHub Copilot!

## ✨ Fitur Utama

✅ **Command System** - Mudah tambah command baru  
✅ **Auto Reply** - Reply otomatis berdasarkan keyword  
✅ **Message Logging** - Semua pesan tercatat  
✅ **Group & Private Support** - Support grup dan private chat  
✅ **Error Handling** - Robust error management  
✅ **Ready for Database** - Siap integrasi MongoDB/SQLite  

---

## 🚀 Setup Instructions

### **1. Install Node.js**
Download dari [nodejs.org](https://nodejs.org/) (versi LTS)

### **2. Clone atau Download Project**
```bash
# Buat folder baru
mkdir zyy-bot
cd zyy-bot

# Copy file-file di atas ke folder ini
# - bot-whatsapp-template.js
# - package.json
# - README.md
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Edit Konfigurasi**
Buka `bot-whatsapp-template.js` dan ubah:

```javascript
const CONFIG = {
  PREFIX: "!",                          // Ganti sesuai preferensi
  BOT_NAME: "ZYY Bot",                  // Nama bot Anda
  OWNER_NUMBER: "62xxxxxxxxxxxx",       // Nomor WhatsApp Anda (pakai +62)
  AUTO_REPLY_ENABLED: true,
  LOG_MESSAGES: true,
};
```

**Format nomor:** `62` (bukan 0) + nomor HP tanpa +  
Contoh: Nomor 0812-3456-7890 → `62812345678`

### **5. Jalankan Bot**
```bash
npm start
```

**First Time?**
- Scan QR Code dengan WhatsApp Anda
- Tunggu sampai "Bot Terhubung!" muncul
- Bot siap digunakan!

---

## 📝 Cara Menggunakan

### **Command List Default**
```
!help      - Lihat semua command
!ping      - Check status bot
!info      - Info bot
!halo      - Sapa bot
!waktu     - Tampilkan waktu
!rental    - Info rental mobil
!hitung    - Kalkulator (contoh: !hitung 5+3)
```

### **Testing Bot**
Kirim pesan dari WhatsApp Anda:
```
!help
!ping
!halo
!waktu
```

---

## 🎯 Cara Menambah Command Baru

Dengan GitHub Copilot, ini super mudah!

**Contoh 1: Command Sederhana**
```javascript
// Tambah di setupCommands()
this.addCommand("quote", {
  description: "Tampilkan quote random",
  handler: () => {
    const quotes = [
      "Kesuksesan adalah journey, bukan destination",
      "Coding is art"
    ];
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    return `✨ *Quote of the Day*\n${random}`;
  },
});
```

**Contoh 2: Command dengan Arguments**
```javascript
this.addCommand("nama", {
  description: "SapaNama (contoh: !nama John)",
  handler: (args, senderName) => {
    const name = args.join(" ") || senderName;
    return `Hai ${name}! 👋 Senang berkenalan`;
  },
});
```

**Contoh 3: Command Kompleks**
```javascript
this.addCommand("info-mobil", {
  description: "Cari info mobil",
  handler: (args) => {
    const mobilData = {
      "bmw": "BMW X5 - Rp 500.000/hari",
      "mercy": "Mercedes E-Class - Rp 450.000/hari"
    };
    const mobil = args[0]?.toLowerCase();
    return mobilData[mobil] || "Mobil tidak ditemukan. Coba: bmw, mercy";
  },
});
```

---

## 💾 Auto Reply Setup

Edit di bagian `autoReplyData`:

```javascript
const autoReplyData = {
  keywords: {
    "halo": "Halo! Apa yang bisa saya bantu? 😊",
    "berapa harga": "Hubungi customer service kami untuk info harga",
    "jam operasional": "Kami buka 24 jam, hubungi: 0812-xxxx-xxxx",
    // Tambah keyword lainnya
  },
};
```

---

## 🔧 Pengembangan Lanjutan

### **Integrasi Database**
```bash
npm install mongoose
# atau
npm install sqlite3
```

Minta bantuan Copilot: 
*"Tambahkan MongoDB integration untuk menyimpan user data"*

### **Integrasi API**
```bash
npm install axios
```

Contoh: Ambil data dari API eksternal
*"Buat command !weather yang ambil data dari API cuaca"*

### **Scheduled Tasks**
```bash
npm install node-cron
```

Contoh: Kirim pesan otomatis tiap jam
*"Buat schedule broadcast setiap jam 9 pagi"*

### **File Upload/Media**
Dengan Copilot:
*"Tambahin fitur upload foto dan convert jadi stiker"*

---

## 📊 File Structure

```
zyy-bot/
├── bot-whatsapp-template.js    # Main bot file
├── package.json                # Dependencies
├── README.md                   # Dokumentasi
├── auth_info_baileys/          # QR session (auto generate)
└── bot_messages.log            # Log messages
```

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| QR tidak muncul | Kill process, hapus folder `auth_info_baileys/`, jalankan ulang |
| Bot tidak reply | Cek CONFIG.PREFIX, cek message format, lihat console errors |
| Koneksi putus | Normal jika WhatsApp logout di device lain. Re-scan QR |
| Port sudah terpakai | Ubah port di konfigurasi atau kill proses lain |

---

## ⚠️ Penting!

1. **Jangan** bagikan folder `auth_info_baileys/` - itu session Anda
2. **Gunakan** untuk tujuan legal saja
3. **Test dulu** di grup pribadi sebelum production
4. **Monitor** message logs untuk troubleshooting
5. **Update** dependencies: `npm update`

---

## 🎓 Next Steps dengan Copilot

1. Prompt: *"Tambahkan fitur database untuk simpan chat history"*
2. Prompt: *"Buat admin panel sederhana di localhost:3000"*
3. Prompt: *"Deploy bot ini ke Railway atau Replit"*
4. Prompt: *"Tambahkan payment gateway integration untuk booking rental"*

---

## 📞 Support

Jika ada error:
1. Cek folder `auth_info_baileys/` ada tidak
2. Lihat console log untuk error detail
3. Check koneksi internet
4. Coba hapus `node_modules` dan `npm install` ulang

---

## 📄 License

MIT License - Bebas dimodifikasi untuk keperluan Anda

---

**Happy Coding! 🚀**  
Develop lebih lanjut dengan GitHub Copilot dan buat bot yang awesome! 💻

