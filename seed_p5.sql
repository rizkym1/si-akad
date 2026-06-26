INSERT IGNORE INTO p_tema (tema_id, tema_nama) VALUES (1, 'Kearifan Lokal'), (2, 'Gaya Hidup Berkelanjutan');
INSERT IGNORE INTO p_proyek (proyek_id, tema_id, proyek_nama, proyek_judul, proyek_deskripsi, kelas_id) VALUES 
(1, 1, 'Proyek 1', 'Mengenal Budaya Daerah', 'Siswa diajak mengenal kebudayaan lokal daerah setempat.', 2025100000000000001);

INSERT IGNORE INTO p_dimensi (dimensi_id, dimensi_nama) VALUES (1, 'Beriman, Bertakwa, dan Berakhlak Mulia'), (2, 'Berkebinekaan Global'), (3, 'Bergotong Royong');
INSERT IGNORE INTO p_elemen (elemen_id, dimensi_id, elemen_nama) VALUES 
(1, 1, 'Akhlak Beragama'), 
(2, 2, 'Mengenal dan menghargai budaya'), 
(3, 3, 'Kolaborasi');

INSERT IGNORE INTO p_subelemen (subelemen_id, elemen_id, subelemen_nama) VALUES 
(1, 1, 'Mengenal sifat-sifat Tuhan'),
(2, 2, 'Mendalami budaya dan identitas budaya'),
(3, 3, 'Kerja sama');

INSERT IGNORE INTO p_targetelemen (targetelemen_id, elemen_id, subelemen_id, jenjang_id, fase, targetelemen_detail) VALUES 
(1, 1, 1, 1, 'A', 'Mengenal sifat-sifat utama Tuhan'),
(2, 2, 2, 1, 'A', 'Mampu mengenali identitas diri dan budaya asal'),
(3, 3, 3, 1, 'A', 'Mampu bekerja sama dalam kelompok kecil');

INSERT IGNORE INTO p_target (target_id, proyek_id, targetelemen_id) VALUES (1, 1, 1), (2, 1, 2), (3, 1, 3);

INSERT IGNORE INTO p_nilai (target_id, siswa_id, nilai_data) VALUES 
(1, 1, 4), (2, 1, 3), (3, 1, 4),
(1, 2, 3), (2, 2, 4), (3, 2, 3);
