import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Student {
    id: number;
    full_name: string;
    nisn: string;
    gender: string;
    daily_attendances: DailyAttendance[];
}

interface DailyAttendance {
    id: number;
    student_id: number;
    school_year_id: number;
    date: string;
    status: 'present' | 'sick' | 'permitted' | 'absent';
    notes: string | null;
}

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Absensi',
        href: '/teacher/attendances',
    },
];

export default function TeacherAttendanceIndex({
    students,
    schoolYears,
    classes,
    activeSchoolYear,
    activeDate,
    activeClass,
    search,
}: {
    students: Student[];
    schoolYears: SchoolYear[];
    classes: { id: number; name: string }[];
    activeSchoolYear: number | null;
    activeDate: string;
    activeClass: number | null;
    search: string;
}) {
    const [filterSchoolYearId, setFilterSchoolYearId] = useState<number | null>(activeSchoolYear);
    const [filterClassId, setFilterClassId] = useState<number | null>(activeClass);
    const [filterDate, setFilterDate] = useState<string>(activeDate);

    // State form: Map student_id ke status
    const [formData, setFormData] = useState<Record<number, { status: string; notes?: string }>>({});

    useEffect(() => {
        const initial: Record<number, { status: string; notes?: string }> = {};
        students.forEach((student) => {
            const att = student.daily_attendances?.[0];
            initial[student.id] = {
                status: att?.status || 'present', // Default Hadir!
                notes: att?.notes || '',
            };
        });
        setFormData(initial);
    }, [students]);

    const handleStatusChange = (studentId: number, status: string) => {
        setFormData((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                status,
            },
        }));
    };

    const handleSave = () => {
        if (!filterSchoolYearId) {
            alert('Pilih Tahun Pelajaran terlebih dahulu!');
            return;
        }

        const attendancesToSave = Object.entries(formData).map(([studentId, data]) => ({
            student_id: parseInt(studentId),
            status: data.status,
            notes: data.notes,
        }));

        router.post(
            route('teacher.attendances.store'),
            {
                school_year_id: filterSchoolYearId,
                date: filterDate,
                attendances: attendancesToSave,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Absensi" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        {/* Judul & Penjelasan Singkat */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground">Absensi Harian Siswa</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Tentukan tanggal absensi. Secara otomatis semua siswa diatur ke status "Hadir" (H) agar lebih cepat. Klik Simpan Data jika sudah selesai.
                            </p>
                        </div>

                        {/* Filter & Pencarian */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <label className="text-sm font-medium whitespace-nowrap text-foreground">
                                        T.P:
                                    </label>
                                    <select
                                        value={filterSchoolYearId ?? ''}
                                        onChange={(e) => {
                                            setFilterSchoolYearId(Number(e.target.value));
                                            router.get(
                                                route('teacher.attendances.index'),
                                                { search, school_year_id: e.target.value, class_id: filterClassId, date: filterDate },
                                                { preserveState: true, replace: true }
                                            );
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-auto"
                                    >
                                        {schoolYears.map((y) => (
                                            <option key={y.id} value={y.id}>
                                                {y.name} {y.is_active ? '(Aktif)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <label className="text-sm font-medium whitespace-nowrap text-foreground">
                                        Tanggal:
                                    </label>
                                    <input
                                        type="date"
                                        value={filterDate}
                                        max={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setFilterDate(newDate);
                                            router.get(
                                                route('teacher.attendances.index'),
                                                { search, school_year_id: filterSchoolYearId, class_id: filterClassId, date: newDate },
                                                { preserveState: true, replace: true }
                                            );
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-auto"
                                    />
                                </div>
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <label className="text-sm font-medium whitespace-nowrap text-foreground">
                                        Kelas:
                                    </label>
                                    <select
                                        value={filterClassId ?? ''}
                                        onChange={(e) => {
                                            const classVal = e.target.value ? Number(e.target.value) : null;
                                            setFilterClassId(classVal);
                                            router.get(
                                                route('teacher.attendances.index'),
                                                { search, school_year_id: filterSchoolYearId, class_id: classVal, date: filterDate },
                                                { preserveState: true, replace: true }
                                            );
                                        }}
                                        className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-auto"
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
                                placeholder="Cari NISN / Nama..."
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm sm:w-56"
                                defaultValue={search || ''}
                                onChange={(e) => {
                                    router.get(
                                        route('teacher.attendances.index'),
                                        { search: e.target.value, school_year_id: filterSchoolYearId, class_id: filterClassId, date: filterDate },
                                        { preserveState: true, replace: true }
                                    );
                                }}
                            />
                        </div>

                        {/* Tombol Simpan */}
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90 active:scale-95 border-0"
                            >
                                Simpan Data Absensi
                            </button>
                        </div>

                        <div className="relative overflow-x-auto border border-border bg-card shadow-sm sm:rounded-xl">
                            {students.length > 0 ? (
                                <table className="w-full text-left text-sm text-muted-foreground whitespace-nowrap">
                                    <thead className="bg-muted text-foreground">
                                        <tr className="border-b border-border">
                                            <th className="w-12 px-4 py-3 text-center">No</th>
                                            <th className="px-4 py-3">NISN</th>
                                            <th className="px-4 py-3 min-w-[200px]">Nama Lengkap</th>
                                            <th className="w-20 px-4 py-3 text-center">L/P</th>
                                            <th className="w-48 px-4 py-3 text-center bg-primary/5">Atur Kehadiran</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-center font-medium text-foreground">{index + 1}</td>
                                                <td className="px-4 py-3 text-foreground">{student.nisn || '-'}</td>
                                                <td className="px-4 py-3 font-semibold text-foreground">{student.full_name}</td>
                                                <td className="px-4 py-3 text-center text-foreground">
                                                    {(student.gender === 'Laki-Laki' || student.gender === 'L' || student.gender === 'male') ? 'L' :
                                                     (student.gender === 'Perempuan' || student.gender === 'P' || student.gender === 'female') ? 'P' : '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center flex-wrap gap-2">
                                                        <label className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all flex items-center justify-center ${formData[student.id]?.status === 'present' ? 'bg-primary text-primary-foreground ring-primary' : 'bg-transparent text-muted-foreground ring-border hover:bg-muted'}`}>
                                                            <input 
                                                                type="radio" 
                                                                name={`status_${student.id}`} 
                                                                value="present" 
                                                                checked={formData[student.id]?.status === 'present'} 
                                                                onChange={() => handleStatusChange(student.id, 'present')} 
                                                                className="hidden" 
                                                            />
                                                            Hadir
                                                        </label>
                                                        <label className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all flex items-center justify-center ${formData[student.id]?.status === 'sick' ? 'bg-yellow-500 text-white ring-yellow-500' : 'bg-transparent text-muted-foreground ring-border hover:bg-muted'}`}>
                                                            <input 
                                                                type="radio" 
                                                                name={`status_${student.id}`} 
                                                                value="sick" 
                                                                checked={formData[student.id]?.status === 'sick'} 
                                                                onChange={() => handleStatusChange(student.id, 'sick')} 
                                                                className="hidden" 
                                                            />
                                                            Sakit
                                                        </label>
                                                        <label className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all flex items-center justify-center ${formData[student.id]?.status === 'permitted' ? 'bg-blue-500 text-white ring-blue-500' : 'bg-transparent text-muted-foreground ring-border hover:bg-muted'}`}>
                                                            <input 
                                                                type="radio" 
                                                                name={`status_${student.id}`} 
                                                                value="permitted" 
                                                                checked={formData[student.id]?.status === 'permitted'} 
                                                                onChange={() => handleStatusChange(student.id, 'permitted')} 
                                                                className="hidden" 
                                                            />
                                                            Izin
                                                        </label>
                                                        <label className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all flex items-center justify-center ${formData[student.id]?.status === 'absent' ? 'bg-red-500 text-white ring-red-500' : 'bg-transparent text-muted-foreground ring-border hover:bg-muted'}`}>
                                                            <input 
                                                                type="radio" 
                                                                name={`status_${student.id}`} 
                                                                value="absent" 
                                                                checked={formData[student.id]?.status === 'absent'} 
                                                                onChange={() => handleStatusChange(student.id, 'absent')} 
                                                                className="hidden" 
                                                            />
                                                            Alpa
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    <p>Pilih kelas yang aktif untuk menampilkan data siswa.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
