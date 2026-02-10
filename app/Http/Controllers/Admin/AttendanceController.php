<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request)
    {
        $search = $request->input('search');
        $entries = $request->input('entries', 10);

        $attendances = Attendance::query()
            ->with('student')
            ->when($search, function ($query, $search) {
                $query->where('status', 'like', '%' . $search . '%')
                      ->orWhere('date', 'like', '%' . $search . '%')
                      ->orWhereHas('student', function ($query) use ($search) {
                          $query->where('full_name', 'like', '%' . $search . '%');
                      });
            })
            ->latest('date')
            ->paginate($entries)
            ->withQueryString();

            // Kirim data siswa langsung dari sini
        $students = Student::select('id', 'full_name')->orderBy('full_name')->get();

        return Inertia::render('admin/attendances/index', [
            'attendances' => $attendances,
            'students'    => $students,
            'entries'     => $entries,
            'search'      => $search,
        ]);
    }

    /**
     * Menyimpan data absensi baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'date'       => 'required|date',
            'status'     => 'required|in:Present,Permitted,Sick,Absent',
            'notes'      => 'nullable|string|max:500',
        ], [
            'student_id.required' => 'Siswa wajib dipilih.',
            'student_id.exists'   => 'Siswa tidak ditemukan.',
            'date.required'       => 'Tanggal wajib diisi.',
            'date.date'           => 'Format tanggal tidak valid.',
            'status.required'     => 'Status wajib dipilih.',
            'status.in'           => 'Status tidak valid.',
            'notes.max'           => 'Catatan maksimal 500 karakter.',
        ]);

        Attendance::create($validated);

        return redirect()->route('admin.attendances.index')
            ->with('success', 'Data absensi berhasil ditambahkan.');
    }

    /**
     * Memperbarui data absensi.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'date'       => [
                'required',
                'date',
                Rule::unique('attendances')
                    ->ignore($attendance->id) // abaikan record yang sedang diedit
                    ->where(fn ($q) => $q->where('student_id', $request->student_id)),
            ],
            'status'     => ['required', Rule::in(['Present', 'Permitted', 'Sick', 'Absent'])],
            'notes'      => ['nullable', 'string', 'max:500'],
        ], [
            'date.unique' => 'Absensi untuk siswa ini pada tanggal tersebut sudah ada.',
        ]);

        $attendance->update($validated);

        return redirect()->route('admin.attendances.index')
            ->with('success', 'Data absensi berhasil diperbarui.');
    }

    /**
     * Menghapus data absensi (soft delete).
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->route('admin.attendances.index')
            ->with('success', 'Data absensi berhasil dihapus.');
    }

    /**
     * Menghapus banyak data absensi sekaligus (bulk delete).
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'exists:attendances,id',
        ]);

        Attendance::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.attendances.index')
            ->with('success', 'Data absensi terpilih berhasil dihapus.');
    }
}
