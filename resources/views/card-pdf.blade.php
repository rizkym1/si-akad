<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kartu Siswa</title>
    <style>
        @page {
            margin: 0;
            size: A4 portrait;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            font-family: Arial, sans-serif;
            background: #f1f5f9;
            width: 100%;
        }

        /* Tengah vertikal di A4 */
        .wrapper {
            width: 100%;
            padding-top: 280pt;
            text-align: center;
        }

        /* ══ KARTU ══ */
        .card {
            display: inline-block;
            width: 272pt;
            text-align: left;
            border-radius: 10pt;
            overflow: hidden;
            background: #fff;
            border: 1pt solid #d1fae5;
        }

        /* ══ HEADER ══ */
        .header {
            background: #16a34a;
            padding: 0;
        }

        /* Garis emas tipis di atas */
        .header-topbar {
            background: #fbbf24;
            height: 3pt;
            width: 100%;
        }

        .header-content {
            padding: 6pt 8pt 7pt 10pt;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: middle;
        }

        .logo {
            width: 28pt;
            height: 28pt;
            border-radius: 50%;
            border: 1.5pt solid rgba(255,255,255,0.5);
        }

        .header-school {
            padding-left: 7pt;
        }

        .school-name {
            font-size: 8.5pt;
            font-weight: bold;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: .4pt;
        }

        .school-address {
            font-size: 6pt;
            color: rgba(255,255,255,0.8);
            margin-top: 1pt;
        }

        .kartu-badge {
            background: #fff;
            color: #16a34a;
            font-size: 6.5pt;
            font-weight: bold;
            letter-spacing: .8pt;
            padding: 3pt 7pt;
            border-radius: 20pt;
            white-space: nowrap;
        }

        /* Garis emas bawah header */
        .header-bottombar {
            background: linear-gradient(to right, #f59e0b, #fcd34d, #f59e0b);
            height: 3pt;
            width: 100%;
        }

        /* ══ BODY ══ */
        .body {
            padding: 8pt 10pt 6pt 10pt;
            background: #fff;
        }

        .body-table {
            width: 100%;
            border-collapse: collapse;
        }

        .body-table td {
            vertical-align: top;
        }

        /* Kolom foto */
        .col-foto {
            width: 56pt;
        }

        .photo-frame {
            width: 50pt;
            height: 62pt;
            border-radius: 5pt;
            border: 2pt solid #16a34a;
            overflow: hidden;
            background: #f0fdf4;
        }

        .photo {
            width: 100%;
            height: 100%;
            display: block;
        }

        /* Kolom info */
        .col-info {
            padding-left: 8pt;
        }

        .siswa-name {
            font-size: 9.5pt;
            font-weight: bold;
            color: #14532d;
            padding-bottom: 3pt;
            margin-bottom: 4pt;
            border-bottom: 1.5pt solid #16a34a;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table td {
            font-size: 7pt;
            color: #1f2937;
            padding: 1.2pt 0;
            vertical-align: top;
        }

        .lbl {
            font-weight: bold;
            color: #16a34a;
            width: 28pt;
        }

        .sep {
            width: 6pt;
            color: #6b7280;
        }

        /* Kolom kanan QR + TTD */
        .col-right {
            width: 62pt;
            text-align: center;
            vertical-align: top;
        }

        .qr-wrap {
            border: 1.5pt solid #16a34a;
            border-radius: 5pt;
            padding: 2.5pt;
            background: #fff;
            display: inline-block;
        }

        .qr-img {
            width: 38pt;
            height: 38pt;
            display: block;
        }

        .qr-text {
            font-size: 5.5pt;
            color: #16a34a;
            font-weight: bold;
            letter-spacing: .5pt;
            text-align: center;
            margin-top: 2pt;
        }

        /* ══ FOOTER ══ */
        .footer {
            background: #f0fdf4;
            border-top: 1pt solid #bbf7d0;
            padding: 5pt 10pt 5pt 10pt;
        }

        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        .footer-table td {
            vertical-align: middle;
        }

        .status-pill {
            display: inline-block;
            background: #16a34a;
            color: #fff;
            font-size: 6.5pt;
            font-weight: bold;
            letter-spacing: .6pt;
            padding: 2.5pt 9pt;
            border-radius: 20pt;
        }

        .issued {
            font-size: 5.5pt;
            color: #6b7280;
            margin-top: 2pt;
        }

        .ttd-cell {
            text-align: center;
            width: 90pt;
        }

        .ttd-kota {
            font-size: 6pt;
            color: #374151;
            margin-bottom: 12pt;
        }

        .ttd-garis {
            border-top: 1pt solid #374151;
            margin: 0 5pt;
            padding-top: 2pt;
        }

        .ttd-nama {
            font-size: 6pt;
            font-weight: bold;
            color: #14532d;
        }

        .ttd-jabatan {
            font-size: 5.5pt;
            color: #6b7280;
        }

        /* Garis emas paling bawah */
        .card-footer-bar {
            background: #fbbf24;
            height: 3pt;
            width: 100%;
        }
    </style>
</head>
<body>

<div class="wrapper">
    <div class="card">

        {{-- ══ HEADER ══ --}}
        <div class="header">
            <div class="header-topbar"></div>
            <div class="header-content">
                <table class="header-table">
                    <tr>
                        <td style="width: 30pt;">
                            <img class="logo"
                                 src="{{ public_path('images/logo_alislam.png') }}"
                                 alt="Logo">
                        </td>
                        <td class="header-school">
                            <div class="school-name">Raudhatul Atfhal Al-Islam</div>
                            <div class="school-address">Jl. Contoh No. 1, Kota Anda &bull; Telp. (021) 000-0000</div>
                        </td>
                        <td style="width: 55pt; text-align: right;">
                            <span class="kartu-badge">KARTU SISWA</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="header-bottombar"></div>
        </div>

        {{-- ══ BODY ══ --}}
        <div class="body">
            <table class="body-table">
                <tr>
                    {{-- Foto --}}
                    <td class="col-foto">
                        <div class="photo-frame">
                            <img class="photo"
                                 src="{{ $student->photo
                                        ? public_path('storage/' . $student->photo)
                                        : public_path('images/avatar-default.png') }}"
                                 alt="Foto Siswa">
                        </div>
                    </td>

                    {{-- Info --}}
                    <td class="col-info">
                        <div class="siswa-name">{{ $student->full_name }}</div>
                        <table class="info-table">
                            <tr>
                                <td class="lbl">NISN</td>
                                <td class="sep">:</td>
                                <td>{{ $student->nisn }}</td>
                            </tr>
                            <tr>
                                <td class="lbl">Kelas</td>
                                <td class="sep">:</td>
                                <td>{{ $student->studentClass?->name ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="lbl">TTL</td>
                                <td class="sep">:</td>
                                <td>{{ $student->place_of_birth }}, {{ $student->date_of_birth?->format('d/m/Y') }}</td>
                            </tr>
                            <tr>
                                <td class="lbl">T.A.</td>
                                <td class="sep">:</td>
                                <td>{{ now()->format('Y') }}/{{ now()->addYear()->format('Y') }}</td>
                            </tr>
                        </table>
                    </td>

                    {{-- QR Code --}}
                    <td class="col-right">
                        <div class="qr-wrap">
                            <img class="qr-img"
                                 src="data:image/png;base64,{{ $qrBase64 }}"
                                 alt="QR Code">
                        </div>
                        <div class="qr-text">SCAN</div>
                    </td>
                </tr>
            </table>
        </div>

        {{-- ══ FOOTER ══ --}}
        <div class="footer">
            <table class="footer-table">
                <tr>
                    <td>
                        <div class="status-pill">AKTIF</div>
                        {{-- <div class="issued">Berlaku: {{ now()->format('Y') }}/{{ now()->addYear()->format('Y') }}</div> --}}
                    </td>
                    {{-- <td style="text-align: right;">
                        <div class="ttd-cell">
                            <div class="ttd-kota">Bogor, {{ now()->translatedFormat('d F Y') }}</div>
                            <div class="ttd-garis">
                                <div class="ttd-nama">Kepala RA Al-Islam</div>
                                <div class="ttd-jabatan">NIP. _______________</div>
                            </div>
                        </div>
                    </td> --}}
                </tr>
            </table>
        </div>

        <div class="card-footer-bar"></div>

    </div>
</div>

</body>
</html>