<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolYear;
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
        $classId = $request->input('class_id');
        $schoolYearId = $request->input('school_year_id');
        $status = $request->input('status');

        $entries = $request->input('entries', 10);

        $sort = $request->input('sort', 'full_name');
        $direction = $request->input('direction', 'asc');

        $students = Student::query()
            ->with(['studentClass', 'schoolYear'])
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('full_name', 'like', '%' . $search . '%')
                      ->orWhere('nisn', 'like', '%' . $search . '%');
                });
            })
            ->when($classId, function ($query, $classId) {
                $query->where('class_id', $classId);
            })
            ->when($schoolYearId, function ($query, $schoolYearId) {
                $query->where('school_year_id', $schoolYearId);
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy($sort, $direction)
            ->paginate($entries)
            ->withQueryString();

        return Inertia::render('admin/students/index', [
            'students'      => $students,
            'schoolYears'   => SchoolYear::orderBy('name', 'desc')->get(['id', 'name', 'is_active']),
            'studentClasses' => StudentClass::with('schoolYear')->orderBy('name')->get(['id', 'name', 'school_year_id']),
            'search'        => $search,
            'class_id'      => $classId,
            'school_year_id' => $schoolYearId,
            'status'        => $status,
            'entries'       => $request->input('entries', 10),
        ]);
    }

    /**
     * Cetak biodata form siswa PDF (Massal per Tahun Pelajaran)
     */
    public function bulkBiodataPdf(Request $request)
    {
        $schoolYearId = $request->query('school_year_id');
        
        $schoolYear = $schoolYearId
            ? SchoolYear::find($schoolYearId)
            : SchoolYear::where('is_active', '=', true)->first();

        $students = Student::with(['studentClass.schoolYear'])
            ->when($schoolYear, function ($q) use ($schoolYear) {
                $q->whereHas('studentClass', function ($q) use ($schoolYear) {
                    $q->where('school_year_id', $schoolYear->id);
                });
            })
            ->orderBy('full_name')
            ->get();

        $pdf = Pdf::loadView('bulk-biodata-pdf', [
            'students'  => $students,
            'schoolYear' => $schoolYear,
        ])
        ->setPaper('A4', 'portrait')
        ->setOption([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled'      => true,
            'dpi'                  => 150,
        ]);

        $filename = 'biodata-siswa-massal-' . str_replace('/', '-', ($schoolYear?->name ?? 'semua')) . '.pdf';
        return $pdf->stream($filename);
    }

    /**
     * Cetak biodata form siswa PDF
     */
    public function biodataPdf(Student $student)
    {
        $student->load(['studentClass.schoolYear']);

        $pdf = Pdf::loadView('biodata-pdf', [
            'student'  => $student,
        ])
        ->setPaper('A4', 'portrait')
        ->setOption([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled'      => true,
            'dpi'                  => 150,
        ]);

        return $pdf->stream('biodata-siswa-' . $student->nisn . '.pdf');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/students/create', [
            'student_classes' => StudentClass::with('schoolYear')
                                    ->get(['id', 'name', 'school_year_id']),
            'parents'         => \App\Models\User::where('role', '=', 'parent')->get(['id', 'name', 'email']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
    'nis'              => ['nullable', 'string', 'max:255', 'unique:students,nis'],
    'full_name'        => ['required', 'string', 'max:255'],
    'nickname'         => ['nullable', 'string', 'max:255'],
    'place_of_birth'   => ['nullable', 'string', 'max:255'],
    'nisn'             => ['nullable', 'string', 'max:255', 'unique:students,nisn'],
    'date_of_birth'    => ['nullable', 'date'],
    'gender'           => ['nullable', 'in:male,female'],
    'religion'         => ['nullable', 'string', 'max:255'],
    'family_status'    => ['nullable', 'string', 'max:255'],
    'child_order'      => ['nullable', 'integer', 'min:1'],
    'father_name'      => ['nullable', 'string', 'max:255'],
    'mother_name'      => ['nullable', 'string', 'max:255'],
    'phone'            => ['nullable', 'string', 'max:255'],
    'student_phone'    => ['nullable', 'string', 'max:255'],
    'father_job'       => ['nullable', 'string', 'max:255'],
    'mother_job'       => ['nullable', 'string', 'max:255'],
    'address_street'   => ['nullable', 'string', 'max:255'],
    'address_village'  => ['nullable', 'string', 'max:255'],
    'address_district' => ['nullable', 'string', 'max:255'],
    'address_city'     => ['nullable', 'string', 'max:255'],
    'address_province' => ['nullable', 'string', 'max:255'],
    'guardian_name'    => ['nullable', 'string', 'max:255'],
    'guardian_job'     => ['nullable', 'string', 'max:255'],
    'guardian_address' => ['nullable', 'string'],
    'student_address'  => ['nullable', 'string'],
    'previous_school'  => ['nullable', 'string', 'max:255'],
    'accepted_date'    => ['nullable', 'date'],
    'accepted_grade'   => ['nullable', 'string', 'max:255'],
    'class_id'         => ['nullable', 'exists:student_classes,id'],
    'user_id'          => ['nullable', 'exists:users,id'],
    'photo'            => ['nullable', 'image', 'max:2048'],
    'status'           => ['nullable', 'in:aktif,lulus,pindah,keluar'],
]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('students/photos', 'public');
        }

        $studentData = $validated;
        
        if (empty($studentData['school_year_id'])) {
            if (!empty($studentData['class_id'])) {
                $class = \App\Models\StudentClass::find($studentData['class_id']);
                if ($class) {
                    $studentData['school_year_id'] = $class->school_year_id;
                }
            } else {
                $activeYear = \App\Models\SchoolYear::where('is_active', true)->first();
                if ($activeYear) {
                    $studentData['school_year_id'] = $activeYear->id;
                }
            }
        }
        
        // Auto-create parent user if not selected
        if (empty($studentData['user_id'])) {
            $parentName = $request->input('father_name') ?: ($request->input('mother_name') ?: 'Orang Tua');
            $accountName = $parentName . ' (Ortu dari ' . $request->input('full_name') . ')';
            $baseEmailStr = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $parentName));
            
            if (empty($baseEmailStr)) {
                $fallbackStr = $request->input('nisn') ?: ($request->input('nis') ?: rand(1000, 9999));
                $baseEmailStr = 'ortu' . preg_replace('/[^a-zA-Z0-9]/', '', $fallbackStr);
            }
            
            $uniqueEmail = $baseEmailStr . '@gmail.com';
            $counter = 1;
            while (\App\Models\User::where('email', $uniqueEmail)->exists()) {
                $uniqueEmail = $baseEmailStr . $counter . '@gmail.com';
                $counter++;
            }

            $newUser = \App\Models\User::create([
                'name' => $accountName,
                'email' => $uniqueEmail,
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'parent',
            ]);

            $studentData['user_id'] = $newUser->id;
        }

        Student::create(array_merge($studentData, [
            'photo' => $photoPath,
        ]));

        return to_route('admin.students.index')->with('success', 'Siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student = Student::with('studentClass.schoolYear')->findOrFail($id);
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
            // ✅ Pakai relasi schoolYear, hapus kolom school_year_id
            'student_classes' => StudentClass::with('schoolYear')
                                    ->get(['id', 'name', 'school_year_id']),
            'parents'         => \App\Models\User::where('role', 'parent')->get(['id', 'name', 'email']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
    'nis'              => ['nullable', 'string', 'max:255', 'unique:students,nis,' . $id],
    'full_name'        => ['required', 'string', 'max:255'],
    'nickname'         => ['nullable', 'string', 'max:255'],
    'place_of_birth'   => ['nullable', 'string', 'max:255'],
    'nisn'             => ['nullable', 'string', 'max:255', 'unique:students,nisn,' . $id],
    'date_of_birth'    => ['nullable', 'date'],
    'gender'           => ['nullable', 'in:male,female'],
    'religion'         => ['nullable', 'string', 'max:255'],
    'family_status'    => ['nullable', 'string', 'max:255'],
    'child_order'      => ['nullable', 'integer', 'min:1'],
    'father_name'      => ['nullable', 'string', 'max:255'],
    'mother_name'      => ['nullable', 'string', 'max:255'],
    'phone'            => ['nullable', 'string', 'max:255'],
    'student_phone'    => ['nullable', 'string', 'max:255'],
    'father_job'       => ['nullable', 'string', 'max:255'],
    'mother_job'       => ['nullable', 'string', 'max:255'],
    'address_street'   => ['nullable', 'string', 'max:255'],
    'address_village'  => ['nullable', 'string', 'max:255'],
    'address_district' => ['nullable', 'string', 'max:255'],
    'address_city'     => ['nullable', 'string', 'max:255'],
    'address_province' => ['nullable', 'string', 'max:255'],
    'guardian_name'    => ['nullable', 'string', 'max:255'],
    'guardian_job'     => ['nullable', 'string', 'max:255'],
    'guardian_address' => ['nullable', 'string'],
    'student_address'  => ['nullable', 'string'],
    'previous_school'  => ['nullable', 'string', 'max:255'],
    'accepted_date'    => ['nullable', 'date'],
    'accepted_grade'   => ['nullable', 'string', 'max:255'],
    'class_id'         => ['nullable', 'exists:student_classes,id'],
    'user_id'          => ['nullable', 'exists:users,id'],
    'photo'            => ['nullable', 'image', 'max:2048'],
    'status'           => ['nullable', 'in:aktif,lulus,pindah,keluar'],
]);

        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $validated['photo'] = $request->file('photo')->store('students/photos', 'public');
        } else {
            unset($validated['photo']);
        }

        $studentData = $validated;
        
        if (empty($studentData['school_year_id'])) {
            if (!empty($studentData['class_id'])) {
                $class = \App\Models\StudentClass::find($studentData['class_id']);
                if ($class) {
                    $studentData['school_year_id'] = $class->school_year_id;
                }
            } else {
                $activeYear = \App\Models\SchoolYear::where('is_active', true)->first();
                if ($activeYear) {
                    $studentData['school_year_id'] = $activeYear->id;
                }
            }
        }
        
        // Auto-create parent user if not selected and not already linked
        if (empty($studentData['user_id'])) {
            $parentName = $request->input('father_name') ?: ($request->input('mother_name') ?: 'Orang Tua');
            $accountName = $parentName . ' (Ortu dari ' . $request->input('full_name') . ')';
            $baseEmailStr = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $parentName));
            
            if (empty($baseEmailStr)) {
                $fallbackStr = $request->input('nisn') ?: ($request->input('nis') ?: rand(1000, 9999));
                $baseEmailStr = 'ortu' . preg_replace('/[^a-zA-Z0-9]/', '', $fallbackStr);
            }
            
            $uniqueEmail = $baseEmailStr . '@gmail.com';
            $counter = 1;
            while (\App\Models\User::where('email', $uniqueEmail)->exists()) {
                $uniqueEmail = $baseEmailStr . $counter . '@gmail.com';
                $counter++;
            }

            $newUser = \App\Models\User::create([
                'name' => $accountName,
                'email' => $uniqueEmail,
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'parent',
            ]);

            $studentData['user_id'] = $newUser->id;
        }

        $student->update($studentData);

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