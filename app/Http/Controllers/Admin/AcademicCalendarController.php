<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicCalendar;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AcademicCalendarController extends Controller
{
    /**
     * Tampilkan daftar acara/kalender pendidikan.
     */
    public function index()
    {
        $events = AcademicCalendar::orderBy('start_date', 'asc')->get();
        $activeSchoolYear = SchoolYear::where('is_active', true)->first();

        return Inertia::render('admin/academic-calendars/index', [
            'events' => $events,
            'activeSchoolYear' => $activeSchoolYear,
        ]);
    }

    /**
     * Simpan acara baru ke kalender.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'type'        => 'required|in:holiday,event',
            'description' => 'nullable|string',
        ]);

        AcademicCalendar::create($validated);

        return redirect()->back()->with('success', 'Acara berhasil ditambahkan ke kalender.');
    }

    /**
     * Perbarui acara di kalender.
     */
    public function update(Request $request, AcademicCalendar $academicCalendar)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'type'        => 'required|in:holiday,event',
            'description' => 'nullable|string',
        ]);

        $academicCalendar->update($validated);

        return redirect()->back()->with('success', 'Acara berhasil diperbarui.');
    }

    /**
     * Hapus acara dari kalender.
     */
    public function destroy(AcademicCalendar $academicCalendar)
    {
        $academicCalendar->delete();

        return redirect()->back()->with('success', 'Acara berhasil dihapus dari kalender.');
    }

    /**
     * Upload dokumen kalender pendidikan untuk tahun ajaran tertentu.
     */
    public function uploadCalendar(Request $request, SchoolYear $schoolYear)
    {
        $request->validate([
            'calendar_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('calendar_file')) {
            // Hapus file lama jika ada
            if ($schoolYear->calendar_file) {
                Storage::disk('public')->delete($schoolYear->calendar_file);
            }

            $path = $request->file('calendar_file')->store('calendars', 'public');
            $schoolYear->update(['calendar_file' => $path]);

            return redirect()->back()->with('success', 'Dokumen kalender berhasil diunggah.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah dokumen.');
    }
}
