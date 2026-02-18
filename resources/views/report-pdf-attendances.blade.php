<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Absensi</title>
    <style>
        @page { margin: 15mm 12mm; }
        * { box-sizing: border-box; }

        body {
            font-family: Arial, sans-serif;
            font-size: 9pt;
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
            width: 55pt;
            text-align: center;
            vertical-align: middle;
        }
        .header-logo img {
            width: 48pt;
            height: 48pt;
        }
        .header-info {
            vertical-align: middle;
            text-align: center;
        }
        .school-name {
            font-size: 13pt;
            font-weight: bold;
            color: #166534;
            text-transform: uppercase;
            letter-spacing: .5pt;
        }
        .report-title {
            font-size: 10pt;
            font-weight: bold;
            margin-top: 2pt;
        }
        .report-period {
            font-size: 8.5pt;
            color: #555;
            margin-top: 2pt;
        }

        .divider {
            border: none;
            border-top: 2pt solid #16a34a;
            margin: 5pt 0;
        }
        .divider-thin {
            border: none;
            border-top: .5pt solid #ccc;
            margin: 5pt 0;
        }

        /* ── SECTION TITLE ── */
        .section-title {
            font-size: 8.5pt;
            font-weight: bold;
            color: #166534;
            margin-bottom: 3pt;
            text-transform: uppercase;
            letter-spacing: .3pt;
        }

        /* ── STATISTIK ── */
        .stats-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8pt;
        }
        .stats-table td {
            width: 20%;
            text-align: center;
            padding: 5pt 4pt;
            border: 1pt solid #d1fae5;
            background: #f0fdf4;
        }
        .stat-number {
            font-size: 15pt;
            font-weight: bold;
            color: #16a34a;
        }
        .stat-number.hadir  { color: #16a34a; }
        .stat-number.izin   { color: #d97706; }
        .stat-number.sakit  { color: #2563eb; }
        .stat-number.alpha  { color: #dc2626; }
        .stat-label {
            font-size: 7pt;
            color: #555;
            margin-top: 2pt;
        }

        /* ── REKAP PER SISWA ── */
        .recap-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10pt;
        }
        .recap-table th {
            background: #16a34a;
            color: #fff;
            font-size: 7.5pt;
            padding: 4pt 4pt;
            text-align: center;
        }
        .recap-table td {
            font-size: 7.5pt;
            padding: 3pt 4pt;
            border-bottom: .5pt solid #e5e7eb;
            vertical-align: middle;
        }
        .recap-table tr:nth-child(even) td {
            background: #f0fdf4;
        }
        .center { text-align: center; }

        /* ── DETAIL ABSENSI ── */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10pt;
        }
        .data-table th {
            background: #16a34a;
            color: #fff;
            font-size: 7.5pt;
            padding: 4pt;
            text-align: center;
        }
        .data-table td {
            font-size: 7.5pt;
            padding: 3pt 4pt;
            border-bottom: .5pt solid #e5e7eb;
            vertical-align: middle;
        }
        .data-table tr:nth-child(even) td {
            background: #f0fdf4;
        }

        /* ── BADGE STATUS ── */
        .badge {
            border-radius: 3pt;
            padding: 1pt 5pt;
            font-size: 7pt;
            font-weight: bold;
        }
        .badge-present   { background: #dcfce7; color: #166534; }
        .badge-permitted { background: #fef3c7; color: #92400e; }
        .badge-sick      { background: #dbeafe; color: #1d4ed8; }
        .badge-absent    { background: #fee2e2; color: #991b1b; }

        /* ── FOOTER ── */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16pt;
        }
        .footer-table td {
            width: 50%;
            vertical-align: top;
            font-size: 8pt;
        }
        .sign-box { text-align: center; }
        .sign-line {
            margin-top: 38pt;
            border-top: 1pt solid #333;
            width: 110pt;
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
                <div class="report-title">LAPORAN DATA ABSENSI SISWA</div>
                <div class="report-period">
                    Periode: {{ \Carbon\Carbon::parse($startDate)->translatedFormat('d F Y') }}
                    s/d {{ \Carbon\Carbon::parse($endDate)->translatedFormat('d F Y') }}
                    &nbsp;|&nbsp; Dicetak: {{ now()->translatedFormat('d F Y') }}
                </div>
            </td>
        </tr>
    </table>
    <hr class="divider">

    {{-- ── STATISTIK ── --}}
    <div class="section-title">Ringkasan Kehadiran</div>
    <table class="stats-table">
        <tr>
            <td>
                <div class="stat-number">{{ $total }}</div>
                <div class="stat-label">Total Absensi</div>
            </td>
            <td>
                <div class="stat-number hadir">{{ $present }}</div>
                <div class="stat-label">Hadir</div>
            </td>
            <td>
                <div class="stat-number izin">{{ $permitted }}</div>
                <div class="stat-label">Izin</div>
            </td>
            <td>
                <div class="stat-number sakit">{{ $sick }}</div>
                <div class="stat-label">Sakit</div>
            </td>
            <td>
                <div class="stat-number alpha">{{ $absent }}</div>
                <div class="stat-label">Alpha</div>
            </td>
        </tr>
    </table>

    {{-- ── REKAP PER SISWA ── --}}
    <div class="section-title">Rekapitulasi per Siswa</div>
    <table class="recap-table">
        <thead>
            <tr>
                <th style="width:20pt">No</th>
                <th>Nama Lengkap</th>
                <th>NISN</th>
                <th>Kelas</th>
                <th>Hadir</th>
                <th>Izin</th>
                <th>Sakit</th>
                <th>Alpha</th>
                <th>Total Hari</th>
                <th>% Hadir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($recap as $i => $row)
            <tr>
                <td class="center">{{ $i + 1 }}</td>
                <td>{{ $row['name'] }}</td>
                <td class="center">{{ $row['nisn'] }}</td>
                <td class="center">{{ $row['class'] }}</td>
                <td class="center" style="color:#166534; font-weight:bold;">{{ $row['present'] }}</td>
                <td class="center" style="color:#92400e; font-weight:bold;">{{ $row['permitted'] }}</td>
                <td class="center" style="color:#1d4ed8; font-weight:bold;">{{ $row['sick'] }}</td>
                <td class="center" style="color:#991b1b; font-weight:bold;">{{ $row['absent'] }}</td>
                <td class="center">{{ $row['total'] }}</td>
                <td class="center">
                    {{ $row['total'] > 0 ? round(($row['present'] / $row['total']) * 100) : 0 }}%
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <hr class="divider-thin">

    {{-- ── DETAIL ABSENSI ── --}}
    <div class="section-title">Detail Absensi Harian</div>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width:20pt">No</th>
                <th>Tanggal</th>
                <th>Nama Siswa</th>
                <th>NISN</th>
                <th>Kelas</th>
                <th>Status</th>
                <th>Catatan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($attendances as $i => $att)
            <tr>
                <td class="center">{{ $i + 1 }}</td>
                <td class="center">{{ $att->date->translatedFormat('d F Y') }}</td>
                <td>{{ $att->student->full_name }}</td>
                <td class="center">{{ $att->student->nisn }}</td>
                <td class="center">{{ $att->student->studentClass?->name ?? '-' }}</td>
                <td class="center">
                    @switch($att->status)
                        @case('Present')
                            <span class="badge badge-present">Hadir</span>
                            @break
                        @case('Permitted')
                            <span class="badge badge-permitted">Izin</span>
                            @break
                        @case('Sick')
                            <span class="badge badge-sick">Sakit</span>
                            @break
                        @case('Absent')
                            <span class="badge badge-absent">Alpha</span>
                            @break
                    @endswitch
                </td>
                <td>{{ $att->notes ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{-- ── FOOTER ── --}}
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