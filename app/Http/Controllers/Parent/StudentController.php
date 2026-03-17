<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Menampilkan detail profil siswa khusus untuk orang tua.
     */
    public function show(Student $student)
    {
        // Pastikan orang tua hanya bisa melihat data anaknya sendiri
        if ($student->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki akses untuk melihat data siswa ini.');
        }

        $student->load(['studentClass.schoolYear', 'parentUser']);

        return Inertia::render('parent/students/show', [
            'student' => $student,
        ]);
    }

    /**
     * Cetak kartu identitas siswa.
     */
    public function cardPdf(Student $student)
    {
        // Pastikan orang tua hanya bisa mendownload kartu anaknya sendiri
        if ($student->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki akses.');
        }

        $student->load(['studentClass', 'parentUser']);
        $logoBase64 = base64_encode(file_get_contents(public_path('images/logo_alislam.png')));

        $pdf = Pdf::loadView('student-card-pdf', [
            'student' => $student,
            'logoBase64' => $logoBase64,
        ])->setPaper([0, 0, 240.94, 153.07], 'landscape');

        $pdf->setOption([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled'      => true,
            'defaultFont'          => 'sans-serif',
            'dpi'                  => 150,
        ]);

        return $pdf->stream('kartu-siswa-' . $student->id . '.pdf');
    }
}
