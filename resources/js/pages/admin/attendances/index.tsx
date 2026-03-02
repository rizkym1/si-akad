import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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

// ✅ Interface School dari DB
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
    activeClass,
    search,
}: {
    students: Student[];
    schoolYears: SchoolYear[];
    classes: { id: number; name: string }[];
    activeSchoolYear: number | null;
    activeClass: number | null;
    search: string;
}) {
    const [showModal, setShowModal] = useState(false);
    const [filterSchoolYearId, setFilterSchoolYearId] = useState<number | null>(
        activeSchoolYear,
    );
    const [filterClassId, setFilterClassId] = useState<number | null>(
        activeClass,
    );

    // State untuk menyimpan nilai inputan
    // Bentuk: { student_id: { present, sick, permitted, absent } }
    const [formData, setFormData] = useState<
        Record<
            number,
            { present: number; sick: number; permitted: number; absent: number }
        >
    >(() => {
        const initial: Record<any, any> = {};
        students.forEach((student) => {
            const att = student.attendances?.[0]; // Ambil data absensi jika ada
            initial[student.id] = {
                present: att?.present || 0,
                sick: att?.sick || 0,
                permitted: att?.permitted || 0,
                absent: att?.absent || 0,
            };
        });
        return initial;
    });

    const handleInputChange = (
        studentId: number,
        field: keyof (typeof formData)[number],
        value: string,
    ) => {
        const numValue = parseInt(value) || 0;
        setFormData((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: numValue >= 0 ? numValue : 0, // Hindari negatif
            },
        }));
    };

    const handleSave = () => {
        if (!filterSchoolYearId) {
            alert('Pilih Tahun Pelajaran terlebih dahulu!');
            return;
        }

        const attendancesToSave = Object.entries(formData).map(
            ([studentId, data]) => ({
                student_id: parseInt(studentId),
                ...data,
            }),
        );

        router.post(
            route('admin.attendances.store'),
            {
                school_year_id: filterSchoolYearId,
                attendances: attendancesToSave,
            },
            {
                preserveScroll: true,
            },
        );
    };
    const handleCetak = () => {
        let url = '';

        const schoolYear = schoolYears.find((y) => y.id === filterSchoolYearId);
        if (!schoolYear) return;

        url =
            route('admin.attendances.report.pdf') +
            `?school_year_id=${schoolYear.id}`;

        window.open(url, '_blank');
        setShowModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Absensi" />

            {/* ── MODAL FILTER ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-bold text-gray-800 dark:text-white">
                                🖨️ Filter Laporan Absensi
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form Per Tahun Pelajaran dari DB */}
                        <>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tahun Pelajaran
                                </label>
                                <select
                                    value={filterSchoolYearId ?? ''}
                                    onChange={(e) =>
                                        setFilterSchoolYearId(
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    {schoolYears.map((y) => (
                                        <option key={y.id} value={y.id}>
                                            {y.name}{' '}
                                            {y.is_active ? '(Aktif)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* ✅ Preview periode dari start_date & end_date DB */}
                            {filterSchoolYearId &&
                                (() => {
                                    const selected = schoolYears.find(
                                        (y) => y.id === filterSchoolYearId,
                                    );
                                    return selected ? (
                                        <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            Periode:{' '}
                                            <strong>{selected.name}</strong>
                                            <br />
                                        </div>
                                    ) : null;
                                })()}
                        </>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCetak}
                                style={{
                                    backgroundColor: '#0369a1',
                                    color: 'white',
                                }}
                                className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                            >
                                🖨️ Cetak PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                            {/* Kiri: Filter Tahun & Kelas */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <label className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                                        Tahun Pelajaran:
                                    </label>
                                    <select
                                        value={filterSchoolYearId ?? ''}
                                        onChange={(e) => {
                                            setFilterSchoolYearId(
                                                Number(e.target.value),
                                            );
                                            router.get(
                                                route(
                                                    'admin.attendances.index',
                                                ),
                                                {
                                                    search,
                                                    school_year_id:
                                                        e.target.value,
                                                    class_id: filterClassId,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        {schoolYears.map((y) => (
                                            <option key={y.id} value={y.id}>
                                                {y.name}{' '}
                                                {y.is_active ? '(Aktif)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <label className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                                        Kelas:
                                    </label>
                                    <select
                                        value={filterClassId ?? ''}
                                        onChange={(e) => {
                                            const classVal = e.target.value
                                                ? Number(e.target.value)
                                                : null;
                                            setFilterClassId(classVal);
                                            router.get(
                                                route(
                                                    'admin.attendances.index',
                                                ),
                                                {
                                                    search,
                                                    school_year_id:
                                                        filterSchoolYearId,
                                                    class_id: classVal,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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

                            {/* Kanan: Pencarian & Tombol */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    type="text"
                                    placeholder="Cari siswa..."
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-64 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        router.get(
                                            route('admin.attendances.index'),
                                            {
                                                search: e.target.value,
                                                school_year_id:
                                                    filterSchoolYearId,
                                                class_id: filterClassId,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            },
                                        );
                                    }}
                                />
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            backgroundColor: '#0369a1',
                                            color: 'white',
                                        }}
                                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90 active:scale-95 sm:w-auto"
                                    >
                                        🖨️ Cetak
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        style={{
                                            backgroundColor: '#0369a1',
                                            color: 'white',
                                        }}
                                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition-all hover:opacity-90 active:scale-95 sm:w-auto"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg dark:border-gray-700">
                            {students.length > 0 ? (
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-50 text-sm font-semibold text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-300">
                                        <tr className="border-b dark:border-gray-700">
                                            <th
                                                scope="col"
                                                className="w-16 px-6 py-4 text-center"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-40 px-6 py-4"
                                            >
                                                NISN
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4"
                                            >
                                                Nama Lengkap
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-28 px-4 py-4 text-center whitespace-nowrap"
                                            >
                                                L/P
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-28 px-4 py-4 text-center"
                                            >
                                                Hadir
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-28 px-4 py-4 text-center"
                                            >
                                                Sakit
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-28 px-4 py-4 text-center"
                                            >
                                                Ijin
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-28 px-4 py-4 text-center"
                                            >
                                                Alpa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr
                                                key={student.id}
                                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-6 py-3 text-center text-gray-900 dark:text-gray-200">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-200">
                                                    {student.nisn || '-'}
                                                </td>
                                                <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-200">
                                                    {student.full_name}
                                                </td>
                                                <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-200">
                                                    {
                                                        // A. Cek jika datanya adalah Laki-laki (termasuk huruf L atau male)
                                                        student.gender ===
                                                            'Laki-Laki' ||
                                                        student.gender ===
                                                            'L' ||
                                                        student.gender ===
                                                            'male'
                                                            ? 'Laki-laki'
                                                            : // B. Jika bukan, cek jika datanya adalah Perempuan (termasuk huruf P atau female)
                                                              student.gender ===
                                                                    'Perempuan' ||
                                                                student.gender ===
                                                                    'P' ||
                                                                student.gender ===
                                                                    'female'
                                                              ? 'Perempuan'
                                                              : // C. Jika bukan keduanya, tampilkan nilai aslinya atau tanda strip (-)
                                                                student.gender ||
                                                                '-'
                                                    }
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="w-full rounded border-gray-300 px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        value={
                                                            formData[student.id]
                                                                ?.present ?? 0
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                student.id,
                                                                'present',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="w-full rounded border-gray-300 px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        value={
                                                            formData[student.id]
                                                                ?.sick ?? 0
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                student.id,
                                                                'sick',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="w-full rounded border-gray-300 px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        value={
                                                            formData[student.id]
                                                                ?.permitted ?? 0
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                student.id,
                                                                'permitted',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="w-full rounded border-gray-300 px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        value={
                                                            formData[student.id]
                                                                ?.absent ?? 0
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                student.id,
                                                                'absent',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    Tidak ada data siswa untuk tahun pelajaran
                                    ini.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
