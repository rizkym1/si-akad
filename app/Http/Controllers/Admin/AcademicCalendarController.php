<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicCalendar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicCalendarController extends Controller
{
    /**
     * Tampilkan daftar acara/kalender pendidikan.
     */
    public function index()
    {
        $events = AcademicCalendar::orderBy('start_date', 'asc')->get();

        return Inertia::render('admin/academic-calendars/index', [
            'events' => $events,
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
}
