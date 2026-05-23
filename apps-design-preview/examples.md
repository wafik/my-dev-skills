# Apps Design Preview - Contoh Uji Coba

Gunakan prompt berikut untuk menguji apakah skill `apps-design-preview` otomatis menghasilkan preview aplikasi dalam satu file HTML, dengan banyak screen, phone frame, tampilan modern clean, tema yang sesuai domain, dan warna utama yang mudah dikustom dari CSS variables. Output seperti ini adalah default skill, jadi prompt uji coba tidak perlu menyebut "HTML", "CSS", "satu file", "banyak screen", atau "customable warna".

## Cara Pakai

1. Jalankan salah satu prompt di bawah.
2. Pastikan output berupa satu file HTML.
3. Buka file HTML di browser.
4. Cek apakah semua screen tampil dalam satu halaman preview.
5. Ubah warna di bagian `:root` untuk memastikan tema bisa dikustom dengan mudah.

## Prompt 1: Aplikasi Laundry

```text
Buatkan apps design preview untuk aplikasi mobile laundry UMKM.
```

### Yang Dicek

- Karena prompt tidak menyebut screen spesifik, ada 4 screen default dalam satu file HTML.
- Tiap screen berada di dalam phone frame.
- Ada label seperti `Dashboard`, `Daftar Order`, `Detail Order`, dan seterusnya.
- Warna utama dan warna pendukung dikontrol dari `:root`.
- Tampilan modern, clean, dan cocok untuk UMKM laundry.
- Konten terasa realistis untuk bisnis laundry, bukan placeholder generik.

## Prompt 2: Kasir Warung

```text
Tolong buat preview desain app kasir warung sederhana.
```

### Yang Dicek

- Ada screen transaksi utama dan screen sukses pembayaran.
- Ada item produk, total harga, metode pembayaran, dan riwayat transaksi yang masuk akal.
- Warna hijau/krem tidak tersebar sebagai hard-coded value berulang; harus ada token CSS.
- Layout antar screen bervariasi, bukan copy-paste list yang sama.
- Tampilan modern, clean, dan sesuai konteks warung/POS.

## Prompt 3: Booking Klinik

```text
Saya butuh apps design preview untuk aplikasi booking klinik.
```

### Yang Dicek

- Karena prompt tidak menyebut screen spesifik, ada 4 screen default yang cocok untuk booking klinik.
- Ada data dokter, jadwal, nomor antrian, notifikasi, dan profil pasien.
- Visual terasa konsisten antar screen.
- CSS memiliki token seperti `--app-primary`, `--app-primary-soft`, `--app-bg`, `--app-surface`, dan `--app-text`.
- Palette dipilih otomatis dan terasa cocok untuk aplikasi klinik jika user tidak memberi warna.

## Prompt 4: Admin Event Organizer

```text
Buatkan preview UI mobile untuk aplikasi admin event organizer.
```

### Yang Dicek

- Screen dashboard memiliki ringkasan event dan metrik.
- Screen peserta dan scan tiket terasa berbeda secara layout.
- Ada variasi card, badge, list, chart/stat dummy, tombol, dan nav.
- Preview tetap rapi saat browser dipersempit.

## Prompt 5: Minimal Sekali

```text
Buat preview app absensi karyawan.
```

### Yang Dicek

- Skill tetap membuat file HTML lengkap meskipun user tidak menyebut HTML/CSS.
- Skill otomatis membuat 4 screen yang masuk akal, misalnya dashboard, check-in, riwayat, dan profil atau izin/cuti.
- Warna dan style dipilih otomatis sesuai tema produktivitas/HR.
- Semua warna utama tetap mudah diganti dari `:root`.
- Hasil bukan wireframe kosong, melainkan mockup modern clean yang siap dipreview.

## Checklist Umum

Gunakan checklist ini untuk semua hasil uji coba:

- Output berupa satu file `.html` standalone.
- Ada `<style>` di bagian atas file.
- Ada blok `:root` untuk custom warna dan radius.
- Semua warna utama dan status penting dikontrol dari CSS variables.
- Ada `.screen-wrapper` untuk menampung banyak screen.
- Ada `.phone-frame`, `.phone-screen`, dan `.screen-content`.
- Ada label di bawah setiap screen.
- Ada 4 screen default jika user tidak menentukan jumlah screen.
- Jika memakai bottom nav, posisinya fixed di bagian bawah phone screen dan tidak menimpa konten.
- Warna utama, warna soft, background, surface, border, text, dan status bisa diganti cukup dari CSS variables.
- Tampilan modern, clean, dan sesuai tema app meskipun prompt user minimal.
- Konten sesuai domain aplikasi yang diminta.
- Tidak memakai `Lorem ipsum` atau placeholder generik berlebihan.
- Tidak membuat project React/Vite/Next kecuali user meminta.
- Tampilan bisa dibuka langsung di browser.

## Contoh Ekspektasi Output

File HTML yang baik biasanya memiliki struktur seperti ini:

```html
<style>
  :root {
    --app-primary: #14A6A6;
    --app-primary-soft: #E0F7F7;
    --app-bg: #FBFEFE;
    --app-surface: #FFFFFF;
    --app-text: #172B2B;
    --app-radius: 16px;
  }

  .screen-wrapper { ... }
  .phone-frame { ... }
  .phone-screen { ... }
  .screen-content { ... }
</style>

<div class="screen-wrapper">
  <div class="preview-screen-block">
    <div class="phone-frame">
      <div class="notch"></div>
      <div class="phone-screen">
        <div class="screen-content">
          <!-- Dashboard UI -->
        </div>
      </div>
    </div>
    <div class="screen-label">Dashboard</div>
  </div>
</div>
```
