# Si-Akad RA Al-Islam

Sistem Informasi Akademik (Si-Akad) untuk RA Al-Islam. Aplikasi ini dibangun untuk memudahkan manajemen akademik, presensi, dan penilaian siswa, serta memfasilitasi komunikasi antara pihak sekolah (admin dan guru) dengan orang tua dan siswa.

## 🚀 Fitur Utama

- **Role-Based Access Control**: Mendukung multi-role (Admin, Guru, Orang Tua, Siswa).
- **Manajemen Data Siswa & Guru**: Pengelolaan data biodata dan akademik siswa.
- **Presensi (Kehadiran)**: Pencatatan kehadiran siswa secara berkala.
- **Nilai & Akademik**: Pencatatan nilai kokurikuler dan rapor akademik.
- **Cetak Laporan**: Generate dokumen PDF untuk biodata, presensi, dan laporan rapor.
- **Dashboard Terintegrasi**: Tampilan khusus untuk masing-masing peran (Admin, Guru, Orang Tua).

## 🛠️ Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React.js, Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL / SQLite
- **Lainnya**: `barryvdh/laravel-dompdf` (Cetak PDF), `league/csv` (Import Data)

## ⚙️ Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js & NPM

## 📦 Instalasi & Menjalankan Aplikasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan pengembangan lokal:

1. **Clone repositori**
   ```bash
   git clone https://github.com/rizkym1/si-akad.git
   cd si-akad
   ```

2. **Install dependensi Backend (PHP)**
   ```bash
   composer install
   ```

3. **Install dependensi Frontend (Node)**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment**
   Duplikat file `.env.example` menjadi `.env`, lalu atur koneksi database Anda.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Migrasi & Seeding Database**
   Jalankan migrasi database beserta data dummy/seeder awal (termasuk Role & User).
   ```bash
   php artisan migrate --seed
   ```

6. **Jalankan Development Server**
   Buka 2 terminal terpisah untuk menjalankan backend dan frontend secara bersamaan.
   
   Terminal 1 (Vite & Asset Compilation):
   ```bash
   npm run dev
   ```

   Terminal 2 (Laravel Server):
   ```bash
   php artisan serve
   ```

7. Buka browser dan akses aplikasi di `http://localhost:8000`.

## 🤝 Kontribusi

Aplikasi ini dikembangkan untuk keperluan internal RA Al-Islam. Jika Anda tergabung dalam tim pengembang, pastikan untuk membuat branch terpisah (misalnya dari `main` atau `production`) untuk setiap fitur baru yang akan ditambahkan.
