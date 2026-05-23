# Skills

Kumpulan skill untuk membantu planning dan implementasi backend/frontend dengan pola modular, reusable, dan konsisten.

Skill modular lama yang sudah dihapus tidak didokumentasikan di sini. README ini hanya fokus pada skill yang masih ada di workspace saat ini.

## Daftar Skill

| Skill | Fokus |
| --- | --- |
| `planning-backend` | Planning lengkap backend: domain modules, shared services, Redis profile cache, query performance, Swagger, formatter/linter, dan integration testing. |
| `planning-frontend` | Planning lengkap frontend: Tailwind CSS, reusable components, form validation, dialogs, toast, shared services, dan formatting data/input. |
| `backend-profile-cache` | Backend profile flow: get profile dengan Redis cache, update profile, update password, cache invalidation, dan response sanitization. |
| `backend-query-tooling` | Backend query/tooling: hindari N+1, gunakan bulk/whereIn, Biome/Oxlint, integration test only, dan Swagger docs. |
| `frontend-crud-dialogs` | Frontend CRUD: create/update dialog untuk form kurang dari 7 input, realtime Zod validation, delete/hapus confirmation, dan success toast. |
| `frontend-formatting-inputs` | Frontend formatting: tanggal, harga, total, jumlah, nominal, amount, separator ribuan titik, dan submit numeric clean value. |
| `frontend-reusable-components` | Frontend reusable UI: Tailwind components, table, pagination, search, filters, shared services, dan API client placement. |

## Planning Skills

### `planning-backend`

Gunakan untuk pekerjaan backend yang butuh arahan lengkap dari awal sampai akhir.

Mencakup:

- Struktur backend berdasarkan domain/module.
- Pemisahan domain service, repository, controller, DTO, validation, dan shared services.
- Shared service untuk email, password hashing, token, Redis/cache, logging, config, database, queue, HTTP client, dan error handling.
- `get profile` dengan Redis cache.
- `update profile` dengan cache invalidation/refresh.
- `update password` dengan current password verification dan shared password hasher.
- Pencegahan N+1 query dengan bulk query, eager loading, join, atau `whereIn`/`IN`.
- Swagger/OpenAPI request dan response body yang sesuai dengan DTO/runtime behavior.
- Formatter dan linter untuk Node.js/Bun dengan preferensi Biome atau Oxlint, hindari ESLint kecuali sudah ada.
- Hanya membuat/update integration test, dikerjakan di akhir.

Path:

`planning-backend/SKILL.md`

### `planning-frontend`

Gunakan untuk pekerjaan frontend yang butuh arahan lengkap dari awal sampai akhir.

Mencakup:

- Tailwind CSS.
- Modular reusable components.
- Table, pagination, search, filters.
- Shared services/API client.
- Realtime validation dengan Zod jika tersedia.
- Modal/dialog untuk create/update form dengan input kurang dari 7.
- Confirmation popup untuk delete/remove/hapus.
- Success toast untuk create/update/delete.
- Formatting `tanggal`, `harga`, `total`, `jumlah`, `nominal`, dan `amount`.
- Input numeric dengan separator ribuan titik seperti `1.000`, tetapi submit value tetap numeric/clean.

Path:

`planning-frontend/SKILL.md`

## Backend Focused Skills

### `backend-profile-cache`

Gunakan saat mengerjakan endpoint profile.

Mencakup:

- `getProfile` memakai Redis cache jika Redis tersedia/diminta.
- Cache key seperti `profile:{userId}`.
- Cache payload harus sanitized.
- Jangan cache password, password hash, reset token, refresh token, secret, atau sensitive auth state.
- `updateProfile` harus invalidate/refresh cache.
- `updatePassword` harus verify current password, hash password baru, dan tidak return data password.

Path:

`backend-profile-cache/SKILL.md`

### `backend-query-tooling`

Gunakan saat mengerjakan query database, list endpoint, tooling, integration test, atau Swagger docs.

Mencakup:

- Hindari N+1 query.
- Jika looping record, collect id lalu gunakan bulk query, eager loading, join, atau `whereIn`/`IN`.
- Query detail tetap di repository/service, bukan controller.
- Prefer Biome atau Oxlint untuk Node.js/Bun.
- Jangan tambah ESLint kecuali project sudah menggunakan ESLint.
- Hanya integration test files, dan dikerjakan di akhir.
- Swagger/OpenAPI harus mencerminkan request body, response body, params, query params, status code, dan auth requirement yang benar.

Path:

`backend-query-tooling/SKILL.md`

## Frontend Focused Skills

### `frontend-crud-dialogs`

Gunakan saat mengerjakan create/update/delete flow di frontend.

Mencakup:

- Create/update form dengan kurang dari 7 input sebaiknya memakai modal/dialog.
- Jika 7 input atau lebih, pertimbangkan page/drawer/multi-section layout.
- Realtime validation dengan Zod jika project mendukung.
- Delete/remove/hapus wajib memakai confirmation popup.
- Success create/update/delete wajib memakai toast.

Path:

`frontend-crud-dialogs/SKILL.md`

### `frontend-formatting-inputs`

Gunakan saat mengerjakan tampilan data atau input numeric/currency.

Mencakup:

- Display `tanggal` dengan locale/style yang sesuai, default Indonesia jika field berbahasa Indonesia.
- Display `harga`, `total`, `jumlah`, `nominal`, dan `amount` dengan separator ribuan titik.
- Input `nominal`, `jumlah`, `amount`, `total`, dan `harga` menampilkan format seperti `1.000`.
- Submit value tetap numeric/clean sesuai kontrak API.
- Gunakan shared formatter/helper, jangan sebar logic formatting di table cell atau form component.

Path:

`frontend-formatting-inputs/SKILL.md`

### `frontend-reusable-components`

Gunakan saat membangun atau refactor reusable frontend components.

Mencakup:

- Tailwind CSS component patterns.
- Reusable `DataTable`, `Pagination`, `SearchInput`, `FilterControls`, form fields, dialogs, empty/loading/error states.
- Feature-specific columns/rules tetap di feature folder.
- Shared UI primitive dan shared services ditempatkan di shared folders.
- API call tidak langsung dari deeply nested UI component jika project punya service layer.

Path:

`frontend-reusable-components/SKILL.md`

## Rekomendasi Penggunaan

Gunakan `planning-backend` atau `planning-frontend` untuk pekerjaan besar, fitur baru, atau refactor yang menyentuh banyak area.

Gunakan focused skill saat tugasnya spesifik, misalnya hanya profile cache, hanya query performance, hanya CRUD dialog, hanya formatting input, atau hanya reusable components.

Focused skill tidak menggantikan planning skill. Planning skill tetap menjadi versi lengkap dan utuh untuk arahan end-to-end.

## Struktur Saat Ini

```text
skills/
  planning-backend/
    SKILL.md
    evals/evals.json
  planning-frontend/
    SKILL.md
    evals/evals.json
  backend-profile-cache/
    SKILL.md
    evals/evals.json
  backend-query-tooling/
    SKILL.md
    evals/evals.json
  frontend-crud-dialogs/
    SKILL.md
    evals/evals.json
  frontend-formatting-inputs/
    SKILL.md
    evals/evals.json
  frontend-reusable-components/
    SKILL.md
    evals/evals.json
```

## Eval Files

Setiap skill memiliki `evals/evals.json` berisi prompt contoh untuk menguji apakah skill memberi arahan yang sesuai.

Eval ini belum menjalankan benchmark otomatis. File tersebut disiapkan sebagai titik awal jika ingin menjalankan review/evaluation loop di kemudian hari.
