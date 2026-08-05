# Catatan Riwayat & Perkembangan Project SIAKAD RA AL-ISLAM

Dokumen ini berfungsi sebagai rekam jejak (*changelog & context*) agar riwayat pengerjaan dan detail teknis tetap tersimpan permanen di repository Git dan dapat langsung dibaca oleh developer maupun asisten AI di server/lingkungan mana pun.

---

## 📅 Log Pembaruan Terkini

### [2026-08-05] Sinkronisasi Data Profil Orang Tua Siswa
- **Tujuan**: Menampilkan data pekerjaan, alamat, agama, jenis kelamin, dan kontak orang tua siswa secara otomatis dan dinamis sesuai data detail masing-masing siswa yang terhubung, tanpa mengubah layout UI.
- **Perubahan File**:
  - `app/Models/User.php`: Ditambahkan accessor dan `$appends` dinamis (`occupation`, `phone`, `address`, `religion`, `gender`) yang membaca data dari relasi `Student` terkait.
  - `app/Http/Controllers/Admin/UserController.php`: Eager load relasi `children.studentClass` saat menampilkan profil orang tua (`show`).
  - `resources/js/pages/admin/users/show.tsx`: Menampilkan data riil siswa pada card informasi orang tua.
- **Status**: ✅ Selesai & Terverifikasi (Build Asset Sukses).

---

### [2026-08-04] Implementasi Kalender Pendidikan TA 2026/2027 (Semua Role)
- **Tujuan**: Menyediakan kalender pendidikan resmi sesuai Lampiran SK Dirjen Pendis No. 4860 Tahun 2026 untuk role **Admin**, **Guru**, dan **Orang Tua**.
- **Perubahan File**:
  - `database/seeders/AcademicCalendarSeeder.php`: 25 agenda akademik dan hari libur resmi semester gasal & genap.
  - `resources/js/pages/admin/academic-calendars/index.tsx`: Tampilan format dokumen resmi matriks 6 bulan/semester, mode kalender interaktif, dan fungsi cetak PDF presisi.
  - `resources/js/components/app-sidebar.tsx` & `app-sidebar-nav.tsx`: Menu navigasi kalender aktif untuk admin, teacher, dan parent.
  - `resources/js/pages/admin/dashboard.tsx`, `teacher/dashboard.tsx`, `parent/dashboard.tsx`: Widget agenda kegiatan terdekat.
- **Status**: ✅ Selesai & Terverifikasi.

---

## ⚙️ Petunjuk untuk Sesi / Server SSH Baru
Jika membuka project ini di server atau sesi baru, asisten AI dapat langsung membaca file `PROJECT_HISTORY.md` ini untuk memahami arsitektur dan perkembangan terakhir project secara instan.
