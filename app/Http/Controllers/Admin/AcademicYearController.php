<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $academicYears = AcademicYear::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy('start_date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/academic-years/index', [
            'academicYears' => $academicYears,
            'search'        => $search,
            'entries'       => $request->input('entries', 10),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date'   => ['required', 'date', 'after:start_date'],
            'is_active'  => ['boolean'],
        ]);

        // Jika is_active true, nonaktifkan semua tahun pelajaran lain
        if (!empty($validated['is_active']) && $validated['is_active']) {
            AcademicYear::where('is_active', true)->update(['is_active' => false]);
        }

        AcademicYear::create($validated);

        return Redirect::route('admin.academic-years.index')->with('success', 'Tahun pelajaran berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $academicYear = AcademicYear::findOrFail($id);

        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date'   => ['required', 'date', 'after:start_date'],
            'is_active'  => ['boolean'],
        ]);

        // Jika is_active true, nonaktifkan semua tahun pelajaran lain
        if (!empty($validated['is_active']) && $validated['is_active']) {
            AcademicYear::where('is_active', true)
                ->where('id', '!=', $id)
                ->update(['is_active' => false]);
        }

        $academicYear->update($validated);

        return Redirect::route('admin.academic-years.index')->with('success', 'Tahun pelajaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $academicYear = AcademicYear::findOrFail($id);
        $academicYear->delete();

        return Redirect::route('admin.academic-years.index')->with('success', 'Tahun pelajaran berhasil dihapus.');
    }

    /**
     * Bulk delete selected resources.
     */
    public function bulkDelete(Request $request)
    {
        $ids = $request->ids;
        AcademicYear::whereIn('id', $ids)->delete();

        return Redirect::route('admin.academic-years.index')->with('success', 'Tahun pelajaran terpilih berhasil dihapus.');
    }
}