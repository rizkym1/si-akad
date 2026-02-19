<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $students = Student::query()
            ->when($search, function ($query, $search) {
                $query->where('full_name', 'like', '%' . $search . '%')
                      ->orWhere('nisn', 'like', '%' . $search . '%');
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/students/index', [
            'students'      => $students,
            'academicYears' => AcademicYear::orderBy('start_date', 'desc')->get(['id', 'name', 'is_active']),
            'search'        => $search,
            'entries'       => $request->input('entries', 10),
        ]);
    }

    /**
     * Cetak kartu siswa PDF
     */
    public function cardPdf(Student $student)
    {
        $student->load('studentClass');

        $qrUrl = 'https://quickchart.io/qr?size=120&text='
            . urlencode(route('admin.students.show', $student->id));

        $qrBase64 = base64_encode(file_get_contents($qrUrl));

        $pdf = Pdf::loadView('card-pdf', [
            'student'  => $student,
            'qrBase64' => $qrBase64,
        ])
        ->setPaper('A4', 'portrait')
        ->setOption([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled'      => true,
            'dpi'                  => 150,
        ]);

        return $pdf->stream('kartu-siswa-' . $student->id . '.pdf');
    }

    /**
     * Cetak laporan siswa PDF
     */
    public function reportPdf(Request $request)
{
    $academicYearId = $request->query('academic_year_id');

    $academicYear = $academicYearId
        ? AcademicYear::find($academicYearId)
        : AcademicYear::where('is_active', true)->first();

    $students = Student::with(['studentClass.academicYear'])
        ->when($academicYear, function ($q) use ($academicYear) {
            $q->whereHas('studentClass', function ($q) use ($academicYear) {
                $q->where('academic_year_id', $academicYear->id);
            });
        })
        ->orderBy('full_name')
        ->get();

    $total       = $students->count();
    $totalMale   = $students->where('gender', 'male')->count();
    $totalFemale = $students->where('gender', 'female')->count();
    $perClass    = $students->groupBy(fn($s) => $s->studentClass?->name ?? 'Tanpa Kelas')
                            ->map->count();

    $logoBase64 = base64_encode(file_get_contents(public_path('images/logo_alislam.png')));

    $periode = $academicYear?->name ?? 'Semua Periode';

    $pdf = Pdf::loadView('report-pdf', [
        'students'    => $students,
        'total'       => $total,
        'totalMale'   => $totalMale,
        'totalFemale' => $totalFemale,
        'perClass'    => $perClass,
        'logoBase64'  => $logoBase64,
        'periode'     => $periode,
    ])->setPaper('a4', 'portrait');

    return $pdf->stream('laporan-siswa-' . now()->format('Ymd') . '.pdf');
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/students/create', [
            'student_classes' => StudentClass::with('academicYear')
                                    ->get(['id', 'name', 'academic_year_id']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'        => ['required', 'string', 'max:255'],
            'nickname'         => ['nullable', 'string', 'max:255'],
            'place_of_birth'   => ['nullable', 'string', 'max:255'],
            'nisn'             => ['required', 'string', 'max:255', 'unique:students,nisn'],
            'date_of_birth'    => ['required', 'date'],
            'gender'           => ['nullable', 'in:male,female'],
            'religion'         => ['nullable', 'string', 'max:255'],
            'child_order'      => ['nullable', 'integer', 'min:1'],
            'father_name'      => ['nullable', 'string', 'max:255'],
            'mother_name'      => ['nullable', 'string', 'max:255'],
            'phone'            => ['nullable', 'string', 'max:255'],
            'father_job'       => ['nullable', 'string', 'max:255'],
            'mother_job'       => ['nullable', 'string', 'max:255'],
            'address'          => ['nullable', 'string'],
            'guardian_name'    => ['nullable', 'string', 'max:255'],
            'guardian_job'     => ['nullable', 'string', 'max:255'],
            'guardian_address' => ['nullable', 'string'],
            'class_id'         => ['nullable', 'exists:student_classes,id'],
            'photo'            => ['nullable', 'image', 'max:2048'],
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('students/photos', 'public');
        }

        Student::create(array_merge($validated, [
            'photo' => $photoPath,
        ]));

        return to_route('admin.students.index')->with('success', 'Siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student = Student::with('studentClass.academicYear')->findOrFail($id);
        return Inertia::render('admin/students/detail', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        
        return Inertia::render('admin/students/edit', [
            'student'         => $student,
            // ✅ Pakai relasi academicYear, hapus kolom academic_year
            'student_classes' => StudentClass::with('academicYear')
                                    ->get(['id', 'name', 'academic_year_id']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'full_name'        => ['required', 'string', 'max:255'],
            'nickname'         => ['nullable', 'string', 'max:255'],
            'place_of_birth'   => ['nullable', 'string', 'max:255'],
            'nisn'             => ['required', 'string', 'max:255', 'unique:students,nisn,' . $student->id],
            'date_of_birth'    => ['required', 'date'],
            'gender'           => ['nullable', 'in:male,female'],
            'religion'         => ['nullable', 'string', 'max:255'],
            'child_order'      => ['nullable', 'integer', 'min:1'],
            'father_name'      => ['nullable', 'string', 'max:255'],
            'mother_name'      => ['nullable', 'string', 'max:255'],
            'phone'            => ['nullable', 'string', 'max:255'],
            'father_job'       => ['nullable', 'string', 'max:255'],
            'mother_job'       => ['nullable', 'string', 'max:255'],
            'address'          => ['nullable', 'string'],
            'guardian_name'    => ['nullable', 'string', 'max:255'],
            'guardian_job'     => ['nullable', 'string', 'max:255'],
            'guardian_address' => ['nullable', 'string'],
            'class_id'         => ['nullable', 'exists:student_classes,id'],
            'photo'            => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $validated['photo'] = $request->file('photo')->store('students/photos', 'public');
        } else {
            unset($validated['photo']);
        }

        $student->update($validated);

        return redirect()->route('admin.students.index')->with('success', 'Siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::findOrFail($id);

        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        $student->delete();

        return Redirect::route('admin.students.index')->with('success', 'Data siswa berhasil dihapus.');
    }

    /**
     * Bulk delete selected resources.
     */
    public function bulkDelete(Request $request)
    {
        $ids      = $request->ids;
        $students = Student::whereIn('id', $ids)->get();

        foreach ($students as $student) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $student->delete();
        }

        return Redirect::route('admin.students.index')->with('success', 'Data siswa terpilih berhasil dihapus.');
    }
}