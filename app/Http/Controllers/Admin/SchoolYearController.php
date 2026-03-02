<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SchoolYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $schoolYears = SchoolYear::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/school-years/index', [
            'schoolYears' => $schoolYears,
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
            'is_active'  => ['boolean'],
        ]);

        // Jika is_active true, nonaktifkan semua tahun pelajaran lain
        if (!empty($validated['is_active']) && $validated['is_active']) {
            SchoolYear::where('is_active', true)->update(['is_active' => false]);
        }

        SchoolYear::create($validated);

        return Redirect::route('admin.school-years.index')->with('success', 'Tahun pelajaran berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $schoolYear = SchoolYear::findOrFail($id);

        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'is_active'  => ['boolean'],
        ]);

        // Jika is_active true, nonaktifkan semua tahun pelajaran lain
        if (!empty($validated['is_active']) && $validated['is_active']) {
            SchoolYear::where('is_active', true)
                ->where('id', '!=', $id)
                ->update(['is_active' => false]);
        }

        $schoolYear->update($validated);

        return Redirect::route('admin.school-years.index')->with('success', 'Tahun pelajaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schoolYear = SchoolYear::findOrFail($id);
        $schoolYear->delete();

        return Redirect::route('admin.school-years.index')->with('success', 'Tahun pelajaran berhasil dihapus.');
    }

    /**
     * Bulk delete selected resources.
     */
    public function bulkDelete(Request $request)
    {
        $ids = $request->ids;
        SchoolYear::whereIn('id', $ids)->delete();

        return Redirect::route('admin.school-years.index')->with('success', 'Tahun pelajaran terpilih berhasil dihapus.');
    }
}