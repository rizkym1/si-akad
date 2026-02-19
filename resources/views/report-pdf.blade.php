<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Siswa</title>
    <style>
        @page { margin: 20mm 15mm; }
        * { box-sizing: border-box; }

        body {
            font-family: Arial, sans-serif;
            font-size: 10pt;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
        }

        /* ── HEADER ── */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4pt;
        }
        .header-logo {
            width: 60pt;
            text-align: center;
            vertical-align: middle;
        }
        .header-logo img {
            width: 52pt;
            height: 52pt;
        }
        .header-info {
            vertical-align: middle;
            text-align: center;
        }
        .header-info .school-name {
            font-size: 13pt;
            font-weight: bold;
            color: #166534;
            text-transform: uppercase;
            letter-spacing: .5pt;
        }
        .header-info .report-title {
            font-size: 10pt;
            font-weight: bold;
            margin-top: 2pt;
        }
        .header-info .report-subtitle {
            font-size: 9pt;
            color: #166534;
            margin-top: 2pt;
        }
        .header-info .report-date {
            font-size: 8.5pt;
            color: #555;
            margin-top: 2pt;
        }

        .divider {
            border: none;
            border-top: 2pt solid #16a34a;
            margin: 6pt 0;
        }
        .divider-thin {
            border: none;
            border-top: .5pt solid #ccc;
            margin: 6pt 0;
        }

        /* ── STATISTIK ── */
        .stats-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8pt;
        }
        .stats-table td {
            width: 25%;
            text-align: center;
            padding: 6pt 4pt;
            border: 1pt solid #d1fae5;
            border-radius: 4pt;
            background: #f0fdf4;
        }
        .stats-table .stat-number {
            font-size: 16pt;
            font-weight: bold;
            color: #16a34a;
        }
        .stats-table .stat-label {
            font-size: 7.5pt;
            color: #555;
            margin-top: 2pt;
        }

        /* ── PER KELAS ── */
        .section-title {
            font-size: 9pt;
            font-weight: bold;
            color: #166534;
            margin-bottom: 4pt;
            text-transform: uppercase;
            letter-spacing: .3pt;
        }

        .class-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10pt;
        }
        .class-table th {
            background: #16a34a;
            color: #fff;
            font-size: 8pt;
            padding: 4pt 6pt;
            text-align: left;
        }
        .class-table td {
            font-size: 8.5pt;
            padding: 3pt 6pt;
            border-bottom: .5pt solid #e5e7eb;
        }
        .class-table tr:nth-child(even) td {
            background: #f0fdf4;
        }

        /* ── TABEL DATA SISWA ── */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10pt;
        }
        .data-table th {
            background: #16a34a;
            color: #fff;
            font-size: 8pt;
            padding: 5pt 4pt;
            text-align: center;
        }
        .data-table td {
            font-size: 8pt;
            padding: 4pt;
            border-bottom: .5pt solid #e5e7eb;
            vertical-align: top;
        }
        .data-table tr:nth-child(even) td {
            background: #f0fdf4;
        }
        .badge-male {
            background: #dbeafe;
            color: #1d4ed8;
            border-radius: 4pt;
            padding: 1pt 5pt;
            font-size: 7.5pt;
        }
        .badge-female {
            background: #fce7f3;
            color: #be185d;
            border-radius: 4pt;
            padding: 1pt 5pt;
            font-size: 7.5pt;
        }

        /* ── FOOTER ── */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20pt;
        }
        .footer-table td {
            width: 50%;
            vertical-align: top;
            font-size: 8.5pt;
        }
        .footer-table .sign-box {
            text-align: center;
        }
        .footer-table .sign-line {
            margin-top: 40pt;
            border-top: 1pt solid #333;
            width: 120pt;
            display: inline-block;
        }
    </style>
</head>
<body>

    {{-- ── HEADER ── --}}
    <table class="header-table">
        <tr>
            <td class="header-logo">
                <img src="data:image/png;base64,{{ $logoBase64 }}" alt="Logo">
            </td>
            <td class="header-info">
                <div class="school-name">Raudhatul Atfhal Al-Islam</div>
                <div class="report-title">LAPORAN DATA SISWA</div>
                {{-- ✅ Tampilkan nama tahun pelajaran yang dipilih --}}
                <div class="report-subtitle">Tahun Pelajaran: {{ $periode }}</div>
                <div class="report-date">Dicetak pada: {{ now()->translatedFormat('d F Y') }}</div>
            </td>
        </tr>
    </table>
    <hr class="divider">

    {{-- ── STATISTIK ── --}}
    <div class="section-title">Ringkasan Data</div>
    <table class="stats-table">
        <tr>
            <td>
                <div class="stat-number">{{ $total }}</div>
                <div class="stat-label">Total Siswa</div>
            </td>
            <td>
                <div class="stat-number">{{ $totalMale }}</div>
                <div class="stat-label">Laki-laki</div>
            </td>
            <td>
                <div class="stat-number">{{ $totalFemale }}</div>
                <div class="stat-label">Perempuan</div>
            </td>
            <td>
                <div class="stat-number">{{ $perClass->count() }}</div>
                <div class="stat-label">Jumlah Kelas</div>
            </td>
        </tr>
    </table>

    {{-- ── PER KELAS ── --}}
    <div class="section-title">Jumlah Siswa per Kelas</div>
    <table class="class-table">
        <thead>
            <tr>
                <th>Kelas</th>
                <th>Tahun Pelajaran</th>
                <th>Jumlah Siswa</th>
            </tr>
        </thead>
        <tbody>
            @foreach($perClass as $class => $count)
            <tr>
                <td>{{ $class }}</td>
                {{-- ✅ Tampilkan nama tahun pelajaran dari relasi --}}
                <td>{{ $periode }}</td>
                <td>{{ $count }} siswa</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <hr class="divider-thin">

    {{-- ── TABEL DATA SISWA ── --}}
    <div class="section-title">Data Lengkap Siswa</div>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width:20pt">No</th>
                <th>Nama Lengkap</th>
                <th>NISN</th>
                <th>Kelas</th>
                <th>Tahun Pelajaran</th>
                <th>JK</th>
                <th>TTL</th>
                <th>Nama Ayah</th>
                <th>Nama Ibu</th>
                <th>No. HP</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $i => $student)
            <tr>
                <td style="text-align:center">{{ $i + 1 }}</td>
                <td>{{ $student->full_name }}</td>
                <td style="text-align:center">{{ $student->nisn }}</td>
                {{-- ✅ Nama kelas dari relasi studentClass --}}
                <td style="text-align:center">
                    {{ $student->studentClass?->name ?? '-' }}
                </td>
                {{-- ✅ Nama tahun pelajaran dari relasi studentClass.academicYear --}}
                <td style="text-align:center">
                    {{ $student->studentClass?->academicYear?->name ?? '-' }}
                </td>
                <td style="text-align:center">
                    @if($student->gender === 'male')
                        <span class="badge-male">L</span>
                    @else
                        <span class="badge-female">P</span>
                    @endif
                </td>
                <td>
                    {{ $student->place_of_birth }},
                    {{ \Carbon\Carbon::parse($student->date_of_birth)->format('d-m-Y') }}
                </td>
                <td>{{ $student->father_name ?? '-' }}</td>
                <td>{{ $student->mother_name ?? '-' }}</td>
                <td>{{ $student->phone ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{-- ── FOOTER / TANDA TANGAN ── --}}
    <hr class="divider-thin">
    <table class="footer-table">
        <tr>
            <td></td>
            <td class="sign-box">
                <div>Ciamis, {{ now()->translatedFormat('d F Y') }}</div>
                <div style="margin-top: 2pt;">Kepala Sekolah</div>
                <div class="sign-line"></div>
                <div style="margin-top: 3pt; font-weight: bold;">( _________________________ )</div>
            </td>
        </tr>
    </table>

</body>
</html>