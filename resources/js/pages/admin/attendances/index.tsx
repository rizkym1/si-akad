import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Printer, Filter, X } from 'lucide-react';

interface Student {
    id: number;
    full_name: string;
    nisn: string;
    gender: string;
    attendances: Attendance[];
}

interface Attendance {
    id: number;
    student_id: number;
    school_year_id: number;
    present: number;
    sick: number;
    permitted: number;
    absent: number;
}

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Absensi',
        href: '/admin/attendances',
    },
];

export default function AttendanceIndex({
    students,
    schoolYears,
    classes,
    activeSchoolYear,
    activeMonth,
    activeClass,
    search,
}: {
    students: Student[];
    schoolYears: SchoolYear[];
    classes: { id: number; name: string }[];
    activeSchoolYear: number | null;
    activeMonth: number;
    activeClass: number | null;
    search: string;
}) {
    const months = [
        { id: 1, name: 'Januari' },
        { id: 2, name: 'Februari' },
        { id: 3, name: 'Maret' },
        { id: 4, name: 'April' },
        { id: 5, name: 'Mei' },
        { id: 6, name: 'Juni' },
        { id: 7, name: 'Juli' },
        { id: 8, name: 'Agustus' },
        { id: 9, name: 'September' },
        { id: 10, name: 'Oktober' },
        { id: 11, name: 'November' },
        { id: 12, name: 'Desember' },
    ];
    const [showModal, setShowModal] = useState(false);
    const [filterSchoolYearId, setFilterSchoolYearId] = useState<number | null>(activeSchoolYear);
    const [filterClassId, setFilterClassId] = useState<number | null>(activeClass);
    const [filterMonth, setFilterMonth] = useState<number>(activeMonth);

    const [filterMonthPrint, setFilterMonthPrint] = useState<number>(0);

    const handleCetak = () => {
        let url = '';

        const schoolYear = schoolYears.find((y) => y.id === filterSchoolYearId);
        if (!schoolYear) return;

        url = route('admin.attendances.report.pdf') + `?school_year_id=${schoolYear.id}&month=${filterMonthPrint}`;

        window.open(url, '_blank');
        setShowModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Absensi" />

            {/* ── MODAL CETAK LAPORAN ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="w-full max-w-md scale-100 rounded-2xl bg-card p-6 shadow-2xl transition-all dark:border overflow-hidden">
                        <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                                <Printer className="h-5 w-5 text-secondary" />
                                Cetak Laporan PDF
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Tahun Pelajaran
                                </label>
                                <select
                                    value={filterSchoolYearId ?? ''}
                                    onChange={(e) => setFilterSchoolYearId(Number(e.target.value))}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    {schoolYears.map((y) => (
                                        <option key={y.id} value={y.id}>
                                            {y.name} {y.is_active ? '(Aktif)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Bulan (Periode Rekap)
                                </label>
                                <select
                                    value={filterMonthPrint}
                                    onChange={(e) => setFilterMonthPrint(Number(e.target.value))}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <option value={0}>Keseluruhan (1 Tahun)</option>
                                    {months.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {filterSchoolYearId && (() => {
                                const selected = schoolYears.find((y) => y.id === filterSchoolYearId);
                                let monthLabel = "Semua Bulan";
                                if (filterMonthPrint > 0) {
                                    const m = months.find((x) => x.id === filterMonthPrint);
                                    if (m) monthLabel = m.name;
                                }
                                return selected ? (
                                    <div className="rounded-xl bg-orange-500/10 p-3 pt-2 text-sm text-orange-600 dark:text-orange-400 font-medium">
                                        <span className="block text-xs uppercase tracking-wider mb-1 opacity-80">Pratinjau Export:</span>
                                        T.A {selected.name} — Periode {monthLabel}
                                    </div>
                                ) : null;
                            })()}
                        </div>

                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCetak}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground shadow-sm hover:opacity-90 active:scale-95 transition-all"
                            >
                                <Printer className="h-4 w-4" />
                                Generate PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {/* Judul & Penjelasan Singkat */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    Rekapitulasi Kehadiran Bulanan
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1 cursor-default max-w-xl">
                                    Panel ini menampilkan rekapitulasi absensi bulanan siswa berdasarkan data yang dimasukkan oleh guru secara real-time.
                                </p>
                            </div>
                            
                            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 border border-secondary text-secondary rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all hover:bg-secondary hover:text-white active:scale-95 bg-transparent"
                                >
                                    <Printer className="h-4 w-4" />
                                    Cetak PDF
                                </button>
                            </div>
                        </div>

                        {/* Filter & Pencarian */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <Filter className="h-4 w-4 text-muted-foreground mr-1 hidden sm:block" />
                                    <select
                                        value={filterSchoolYearId ?? ''}
                                        onChange={(e) => {
                                            setFilterSchoolYearId(Number(e.target.value));
                                            router.get(route('admin.attendances.index'), { search, school_year_id: e.target.value, class_id: filterClassId, month: filterMonth }, { preserveState: true, replace: true });
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-36 focus:ring-2 focus:ring-primary outline-none text-foreground"
                                    >
                                        <option value="" disabled>Tahun Ajaran</option>
                                        {schoolYears.map((y) => (
                                            <option key={y.id} value={y.id}>
                                                {y.name} {y.is_active ? '(Aktif)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <select
                                        value={filterMonth}
                                        onChange={(e) => {
                                            const monthVal = Number(e.target.value);
                                            setFilterMonth(monthVal);
                                            router.get(route('admin.attendances.index'), { search, school_year_id: filterSchoolYearId, class_id: filterClassId, month: monthVal }, { preserveState: true, replace: true });
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-32 focus:ring-2 focus:ring-primary outline-none text-foreground"
                                    >
                                        {months.map((m) => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <select
                                        value={filterClassId ?? ''}
                                        onChange={(e) => {
                                            const classVal = e.target.value ? Number(e.target.value) : null;
                                            setFilterClassId(classVal);
                                            router.get(route('admin.attendances.index'), { search, school_year_id: filterSchoolYearId, class_id: classVal, month: filterMonth }, { preserveState: true, replace: true });
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-36 focus:ring-2 focus:ring-primary outline-none text-foreground"
                                    >
                                        <option value="">Semua Kelas</option>
                                        {classes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="Cari NISN atau Nama..."
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm sm:w-60 focus:ring-2 focus:ring-primary outline-none text-foreground"
                                defaultValue={search || ''}
                                onChange={(e) => {
                                    router.get(route('admin.attendances.index'), { search: e.target.value, school_year_id: filterSchoolYearId, class_id: filterClassId, month: filterMonth }, { preserveState: true, replace: true });
                                }}
                            />
                        </div>

                        <div className="relative overflow-x-auto border border-border bg-card shadow-sm sm:rounded-xl">
                            {students.length > 0 ? (
                                <table className="w-full text-left text-sm text-muted-foreground whitespace-nowrap">
                                    <thead className="bg-muted text-foreground">
                                        <tr className="border-b border-border">
                                            <th className="w-12 px-6 py-4 text-center">No</th>
                                            <th className="px-6 py-4">NISN</th>
                                            <th className="px-6 py-4 min-w-[200px]">Nama Lengkap</th>
                                            <th className="w-20 px-4 py-4 text-center">L/P</th>
                                            <th className="w-24 px-4 py-4 text-center">Hadir</th>
                                            <th className="w-24 px-4 py-4 text-center">Sakit</th>
                                            <th className="w-24 px-4 py-4 text-center">Ijin</th>
                                            <th className="w-24 px-4 py-4 text-center">Alpa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-3 text-center font-medium text-foreground">{index + 1}</td>
                                                <td className="px-6 py-3 text-foreground font-mono text-sm">{student.nisn || '-'}</td>
                                                <td className="px-6 py-3 font-semibold text-foreground">{student.full_name}</td>
                                                <td className="px-4 py-3 text-center text-foreground">
                                                    {(student.gender === 'Laki-Laki' || student.gender === 'L' || student.gender === 'male') ? 'L' :
                                                     (student.gender === 'Perempuan' || student.gender === 'P' || student.gender === 'female') ? 'P' : '-'}
                                                </td>
                                                <td className="px-4 py-2 text-center text-foreground font-semibold">
                                                    {student.attendances?.[0]?.present ?? 0}
                                                </td>
                                                <td className="px-4 py-2 text-center text-foreground font-semibold">
                                                    {student.attendances?.[0]?.sick ?? 0}
                                                </td>
                                                <td className="px-4 py-2 text-center text-foreground font-semibold">
                                                    {student.attendances?.[0]?.permitted ?? 0}
                                                </td>
                                                <td className="px-4 py-2 text-center text-foreground font-semibold">
                                                    {student.attendances?.[0]?.absent ?? 0}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="py-16 text-center text-muted-foreground">
                                    <Filter className="mx-auto h-12 w-12 opacity-20 mb-3" />
                                    <p className="text-sm font-medium text-foreground">Tidak Ada Data</p>
                                    <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">Siswa tidak ditemukan, silakan sesuaikan filter Tahun Pelajaran, Kelas, atau Bulan yang dipilih.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
