# ⚡ Quick Start - 5 Menit Setup

**Tidak perlu ribet, langsung ikuti steps ini!**

---

## ✅ Step 1: Install Node.js (2 menit)

Download dari: [nodejs.org](https://nodejs.org)
- Pilih **LTS** version
- Install seperti biasa
- Buka terminal/cmd, ketik: `node --version` → harusnya muncul versi

---

## ✅ Step 2: Setup Project (1 menit)

```bash
# Buat folder project
mkdir zyy-bot
cd zyy-bot

# Copy file ini ke folder:
# - bot-whatsapp-template.js
# - package.json
```

---

## ✅ Step 3: Install Dependencies (1 menit)

```bash
npm install
```

Tunggu sampai selesai (bisa 2-3 menit)

---

## ✅ Step 4: Edit Nomor Anda (30 detik)

Buka `bot-whatsapp-template.js`, cari:

```javascript
OWNER_NUMBER: "62xxxxxxxxxxxx", // <- GANTI INI
```

**Contoh:**
- Nomor: 0812-3456-7890
- Ubah jadi: `"62812345678"`

---

## ✅ Step 5: Jalankan Bot! (30 detik)

```bash
npm start
```

Tunggu sampai keluar QR Code di terminal!

---

## 📱 Step 6: Scan QR Code

1. Buka WhatsApp di HP
2. Pergi ke **Settings → Linked Devices**
3. **Scan QR Code** yang di terminal
4. Tunggu sampai tulisan `✅ Bot Terhubung!`

**SELESAI! Bot Anda aktif!** 🎉

---

## 🧪 Test Bot Anda

Kirim pesan dari WhatsApp:

```
!help          ← Lihat semua command
!ping          ← Test bot
!halo          ← Sapa bot
!rental        ← Test rental command
```

**Jika bot reply = Success!** ✅

---

## ❌ Ada Error?

### Error 1: "Cannot find module @whiskeysockets/baileys"
```bash
npm install @whiskeysockets/baileys qrcode-terminal
```

### Error 2: QR Code tidak muncul
```bash
# Kill bot (Ctrl+C)
rm -rf auth_info_baileys/
npm start
# Scan ulang QR
```

### Error 3: Bot not responding
- Pastikan nomor di CONFIG benar
- Check koneksi internet
- Lihat console untuk error message

---

## 🎯 Langkah Berikutnya

### Tambah Command Baru (Paling Mudah!)

Buka `bot-whatsapp-template.js`, cari `setupCommands()`, tambah:

```javascript
this.addCommand("salam", {
  description: "Sapa dengan salam",
  handler: () => "Wa'alaikumassalam wa rahmatullahi wa barakatuh ☪️",
});
```

Simpan file, bot otomatis restart. Test: `!salam`

**Done!** Sekarang bot punya command baru! 🎊

---

## 🚀 Setelah Berhasil

1. **Backup** nomor WhatsApp Anda (di folder `auth_info_baileys/`)
2. **Share** ke GitHub jika mau collaborative development
3. **Explore** file `ADVANCED_FEATURES.md` untuk features canggih
4. **Use** Copilot untuk tambah fitur custom

---

## 📞 Butuh Help?

### Buat Booking Feature?
Copilot prompt:
```
"Tambahkan booking system dengan command !booking. 
Simpan ke array. Admin bisa lihat dengan !admin-bookings"
```

### Integrasi Database?
Copilot prompt:
```
"Integrasi MongoDB untuk simpan booking data. 
Setup connection string dan create booking model"
```

### Deploy ke Server?
Copilot prompt:
```
"Siapkan bot untuk deploy ke Railway.app
Include: environment variables, graceful shutdown, error handling"
```

---

## 🎓 Pro Tips

✅ Jangan pakai folder `auth_info_baileys` di GitHub (git ignore itu)  
✅ Test command dulu di personal chat sebelum group  
✅ Setiap edit file, bot perlu restart  
✅ Gunakan Copilot untuk speedrun development  
✅ Log file otomatis di `bot_messages.log`  

---

## 🔐 Important!

⚠️ **JANGAN** bagikan session folder (`auth_info_baileys/`)  
⚠️ Session adalah access ke akun WhatsApp Anda  
⚠️ Hapus sebelum push ke GitHub  

---

**SELAMAT! Bot WhatsApp Anda sudah live!** 🚀

Next: Buka `COPILOT_TIPS.md` untuk belajar customize bot dengan Copilot

