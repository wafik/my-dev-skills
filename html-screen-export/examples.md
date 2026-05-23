# HTML Screen Export - Contoh Uji Coba

Gunakan prompt berikut untuk menguji skill `html-screen-export`. Skill ini mengekspor elemen HTML berdasarkan `id` menjadi gambar secara server-side memakai headless browser, bukan screenshot manual.

## Prompt 1: Export Dua Screen

```text
Export screen-dashboard dan screen-order-list dari preview.html menjadi PNG. Jalankan server side, jangan minta saya screenshot manual.
```

### Yang Dicek

- Workflow memakai headless browser seperti Playwright atau Puppeteer.
- Hanya elemen `#screen-dashboard` dan `#screen-order-list` yang diekspor.
- Output menjadi `screen-dashboard.png` dan `screen-order-list.png`.
- Gambar tidak berupa screenshot full page.

## Prompt 2: Auto Detect Semua Screen

```text
Saya punya app-design-preview.html yang dibuat dari skill preview. Tolong export semua screen yang ada id screen-* menjadi gambar PNG ke folder exports.
```

### Yang Dicek

- Skill mencari semua elemen dengan id berawalan `screen-`.
- Semua screen diekspor ke folder `exports/`.
- Nama file mengikuti id, misalnya `screen-dashboard.png`.
- Jika tidak ada `screen-*`, skill memberi error yang jelas atau meminta id target.

## Prompt 3: High Resolution

```text
Ambil div dengan id screen-payment-success dari dist/mockup.html dan jadikan image high resolution untuk dikirim ke client.
```

### Yang Dicek

- Skill menargetkan hanya `#screen-payment-success`.
- Export memakai `deviceScaleFactor` tinggi, minimal 2.
- Output tetap tajam dan CSS/font sudah ter-render.

## Checklist Umum

- Export dilakukan server-side.
- Target dipilih berdasarkan HTML id.
- Default output PNG.
- Default folder output `exports/` di sebelah file HTML jika user tidak menentukan folder.
- Web fonts ditunggu dengan `document.fonts.ready` jika memungkinkan.
- CSS dan layout dirender oleh browser headless, bukan parser HTML sederhana.
- Response akhir menyebutkan file HTML sumber, id yang diekspor, dan path output gambar.
