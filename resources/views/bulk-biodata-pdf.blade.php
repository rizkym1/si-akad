<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cetak Massal Biodata Siswa</title>
    <style>
        @page {
            margin: 2cm;
            size: A4 portrait;
        }
        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
        }
        .header-box {
            border: 1px solid #000;
            padding: 5px;
            display: inline-block;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .table-kelompok, .table-kelompok th, .table-kelompok td {
            border: 1px solid #000;
        }
        .table-kelompok th {
            padding: 5px;
            text-align: center;
        }
        .table-kelompok td {
            padding: 5px;
            text-align: center;
            height: 25px;
        }
        .photo-box {
            border: 1px solid #000;
            width: 3cm;
            height: 4cm;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .photo-img {
            width: 3cm;
            height: 4cm;
            object-fit: cover;
        }
        .section-title {
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
        }
        .form-table {
            width: 100%;
            border: none;
        }
        .form-table td {
            vertical-align: bottom;
            padding-bottom: 5px;
        }
        .td-label {
            width: 40%;
        }
        .td-sub-label {
            width: 40%;
            padding-left: 20px;
        }
        .td-sub-sub-label {
            width: 40%;
            padding-left: 40px;
        }
        .td-colon {
            width: 2%;
            text-align: center;
        }
        .td-value {
            width: 58%;
            border-bottom: 1px dotted #000;
        }
        .text-center { text-align: center; }
        .fw-bold { font-weight: bold; }
        .page-break { page-break-after: always; }
        
        .student-wrapper:last-child .last-page-break {
            page-break-after: auto;
        }
    </style>
</head>
<body>

@foreach($students as $student)
<div class="student-wrapper">
    <div style="text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 20px; font-size: 14pt;">NOMOR INDUK ANAK</div>
    
    <table style="width: 100%; margin-bottom: 20px;">
        <tr>
            <td style="width: 70%; vertical-align: top;">
                <table style="width: 90%; margin-bottom: 15px;">
                    <tr>
                        <td style="font-weight: bold; width: 80px;">No Induk</td>
                        <td style="border: 1px solid #000; padding: 5px;">{{ $student->nis ?? '' }}</td>
                    </tr>
                </table>
                <table class="table-kelompok" style="width: 90%;">
                    <tr>
                        <th rowspan="2">Kelompok<br>Tahun</th>
                        <th>Bermain</th>
                        <th>A</th>
                        <th>B</th>
                    </tr>
                    <tr>
                        <td style="height: 30px;">
                            {{ $student->studentClass && str_contains(strtolower($student->studentClass->name), 'bermain') ? ($student->studentClass->schoolYear->name ?? '') : '' }}
                        </td>
                        <td>
                            {{ $student->studentClass && str_contains(strtolower($student->studentClass->name), 'a') ? ($student->studentClass->schoolYear->name ?? '') : '' }}
                        </td>
                        <td>
                            {{ $student->studentClass && str_contains(strtolower($student->studentClass->name), 'b') ? ($student->studentClass->schoolYear->name ?? '') : '' }}
                        </td>
                    </tr>
                </table>
            </td>
            <td style="width: 30%; text-align: right; vertical-align: top;">
                @if($student->photo)
                    <img src="{{ public_path('storage/' . $student->photo) }}" class="photo-img" style="border: 1px solid #000; margin-left: auto;">
                @else
                    <table style="margin-left: auto; width: 3cm; height: 4cm; border: 1px solid #000;">
                        <tr><td style="text-align: center; vertical-align: middle;">Fhoto<br>3 X 4</td></tr>
                    </table>
                @endif
            </td>
        </tr>
    </table>

    <div class="section-title">A. Keterangan Tentang Identitas Anak</div>
    <table class="form-table">
        <tr>
            <td class="td-label">1. Nama</td><td class="td-colon"></td><td class="td-value" style="border:none;"></td>
        </tr>
        <tr>
            <td class="td-sub-label">1.1 Nama Lengkap</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->full_name) }}</td>
        </tr>
        <tr>
            <td class="td-sub-label">1.2 Nama Panggilan</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->nickname ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-label">2. Jenis Kelamin</td><td class="td-colon">:</td><td class="td-value">{{ $student->gender == 'male' ? 'LAKI-LAKI' : ($student->gender == 'female' ? 'PEREMPUAN' : '') }}</td>
        </tr>
        <tr>
            <td class="td-label">3. Tempat / Tanggal lahir</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->place_of_birth) }}{{ $student->place_of_birth && $student->date_of_birth ? ', ' : '' }}{{ $student->date_of_birth ? \Carbon\Carbon::parse($student->date_of_birth)->translatedFormat('d F Y') : '' }}</td>
        </tr>
        <tr>
            <td class="td-label">4. Alamat dan Nomor Telepon</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->student_address) }}{{ $student->student_address && ($student->phone ?? $student->student_phone) ? ' / ' : '' }}{{ $student->phone ?? $student->student_phone }}</td>
        </tr>
        <tr>
            <td class="td-label">5. Anak ke berapa</td><td class="td-colon">:</td><td class="td-value">{{ $student->child_order }}</td>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <td style="width: 70%; vertical-align: top;">
                <table class="form-table">
                    <tr>
                        <td class="td-label" style="width: 57%;">6. Jumlah Saudara</td><td class="td-colon" style="width: 3%;"></td><td class="td-value" style="border:none; width: 40%;"></td>
                    </tr>
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">6.1 Saudara Kandung</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Orang</td>
                    </tr>
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">6.2 Saudara Tiri</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Orang</td>
                    </tr>
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">6.3 Saudara Angkat</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Orang</td>
                    </tr>
                </table>
            </td>
            <td style="width: 30%; text-align: right; vertical-align: bottom;">
                <table style="margin-left: auto; width: 3cm; height: 4cm; border: 1px solid #000;">
                    <tr><td style="text-align: center; vertical-align: middle;">Fhoto<br>3 X 4</td></tr>
                </table>
            </td>
        </tr>
    </table>

    <table class="form-table">
        <tr>
            <td class="td-label">7. Anak Yatim/Piatu/Yatim Piatu</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label">8. Bahasa Sehari - ari Di Rumah</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label">9. Warga Negara</td><td class="td-colon">:</td><td class="td-value">INDONESIA</td>
        </tr>
        <tr>
            <td class="td-label">10. Kelainan Jasmani</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>

    <div class="section-title">B. Keterangan Tentang Identitas Orang Tua / Wali</div>
    <table class="form-table">
        <tr>
            <td class="td-label">1. Ayah Kandung / Tiri / Angkat atau Wali *)</td><td class="td-colon"></td><td class="td-value" style="border:none;"></td>
        </tr>
        <tr>
            <td class="td-sub-label">1.1 Nama</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->father_name ?? $student->guardian_name ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-sub-label">1.2 Tempat dan Tanggal Lahir</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-label">1.3 Agama</td><td class="td-colon">:</td><td class="td-value">ISLAM</td>
        </tr>
        <tr>
            <td class="td-sub-label">1.4 Pendidikan Tertinggi</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>
    <table style="width: 100%;">
        <tr>
            <td style="width: 70%; vertical-align: top;">
                <table class="form-table">
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">1.5 Pekerjaan/Jabatan</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;">{{ strtoupper($student->father_job ?? $student->guardian_job ?? '') }}</td>
                    </tr>
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">1.6 Penghasilan</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;"></td>
                    </tr>
                    <tr>
                        <td class="td-sub-label" style="width: 57%;">1.7 Warga Negara</td><td class="td-colon" style="width: 3%;">:</td><td class="td-value" style="width: 40%;">INDONESIA</td>
                    </tr>
                </table>
            </td>
            <td style="width: 30%; text-align: right; vertical-align: top;">
                <table style="margin-left: auto; width: 3cm; height: 4cm; border: 1px solid #000;">
                    <tr><td style="text-align: center; vertical-align: middle;">Fhoto<br>3 X 4</td></tr>
                </table>
            </td>
        </tr>
    </table>
    <table class="form-table">
        <tr>
            <td class="td-sub-label">1.8 Alamat dan Nomor Telepon</td><td class="td-colon"></td><td class="td-value" style="border:none;"></td>
        </tr>
        <tr>
            <td class="td-sub-sub-label">1.8.1 Rumah</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-sub-label">1.8.2 Kantor</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>

    <div class="page-break"></div>

    <table class="form-table">
        <tr>
            <td class="td-label">2. Ibu Kandung / Tiri / Angkat atau Wali *)</td><td class="td-colon"></td><td class="td-value" style="border:none;"></td>
        </tr>
        <tr>
            <td class="td-sub-label">2.1 Nama</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->mother_name ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-sub-label">2.2 Tempat dan Tanggal Lahir</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-label">2.3 Agama</td><td class="td-colon">:</td><td class="td-value">ISLAM</td>
        </tr>
        <tr>
            <td class="td-sub-label">2.4 Pendidikan Tertinggi</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-label">2.5 Pekerjaan/Jabatan</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->mother_job ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-sub-label">2.6 Penghasilan</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-label">2.7 Warga Negara</td><td class="td-colon">:</td><td class="td-value">INDONESIA</td>
        </tr>
        <tr>
            <td class="td-sub-label">2.8 Alamat dan Nomor Telepon</td><td class="td-colon"></td><td class="td-value" style="border:none;"></td>
        </tr>
        <tr>
            <td class="td-sub-sub-label">2.8.1 Rumah</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-sub-sub-label">2.8.2 Kantor</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>

    <div class="section-title">C. Mutasi</div>
    <table class="form-table">
        <tr>
            <td class="td-label" style="padding-left: 20px;">1. Diterima di RA ini</td><td class="td-colon">:</td><td class="td-value">{{ $student->accepted_date ? \Carbon\Carbon::parse($student->accepted_date)->translatedFormat('d F Y') : '' }}</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">2. Ditempatkan di Kelompok</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->accepted_grade ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">3. Berasal dari Keluarga / Ra *)</td><td class="td-colon">:</td><td class="td-value">{{ strtoupper($student->previous_school ?? '') }}</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">4. Meninggalkan RA ini Tanggal</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 40px; font-weight: normal;">Karena Pindah/Tamat/Melanjutkan ke</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>

    <div class="section-title">D. Jumlah Kehadiran di RA</div>
    <table class="form-table" style="width: 70%;">
        <tr>
            <td class="td-label" style="padding-left: 20px; width: 50%;">1. Kelompok Bermain</td>
            <td style="width: 25%;">Semester I</td><td class="td-colon">:</td><td class="td-value" style="width: 20%; text-align: right;">Hari</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;"></td>
            <td>Semester II</td><td class="td-colon">:</td><td class="td-value" style="text-align: right;">Hari</td>
        </tr>
        <tr><td colspan="4" style="height: 5px;"></td></tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">2. Kelompok A</td>
            <td>Semester I</td><td class="td-colon">:</td><td class="td-value" style="text-align: right;">Hari</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;"></td>
            <td>Semester II</td><td class="td-colon">:</td><td class="td-value" style="text-align: right;">Hari</td>
        </tr>
        <tr><td colspan="4" style="height: 5px;"></td></tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">3. Kelompok B</td>
            <td>Semester I</td><td class="td-colon">:</td><td class="td-value" style="text-align: right;">Hari</td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;"></td>
            <td>Semester II</td><td class="td-colon">:</td><td class="td-value" style="text-align: right;">Hari</td>
        </tr>
    </table>

    <div class="section-title">E. Keterangan Lain - lain Tentang Anak</div>
    <table class="form-table">
        <tr>
            <td class="td-label" style="padding-left: 20px;">1. Tinggal Pada Orang Tua / Menumpang<br>&nbsp;&nbsp;&nbsp;&nbsp;/Asrama</td><td class="td-colon" style="vertical-align: middle;">:<br></td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">2. Jarak Dari Tempat Ke Sekolah</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">3. Ke Sekolah Dengan Kendaraan</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
        <tr>
            <td class="td-label" style="padding-left: 20px;">4. Bakat / Minat Yang Menonjol</td><td class="td-colon">:</td><td class="td-value"></td>
        </tr>
    </table>

    <div class="page-break last-page-break"></div>
</div>
@endforeach

</body>
</html>
