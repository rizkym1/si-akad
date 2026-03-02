import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, GraduationCap, School, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    total_students: number;
    total_classes: number;
    total_teachers: number;
    total_subjects: number;
    students_by_gender: {
        male: number;
        female: number;
    };
    students_by_class: Array<{
        class_name: string;
        student_count: number;
    }>;
    recent_students: Array<{
        id: number;
        full_name: string;
        nisn: string;
        class_name: string | null;
        created_at: string;
    }>;
}

export default function Dashboard({
    total_students,
    total_classes,
    total_teachers,
    students_by_gender,
    students_by_class,
    recent_students,
}: DashboardProps) {
    const malePercent =
        total_students > 0
            ? Math.round((students_by_gender.male / total_students) * 100)
            : 0;
    const femalePercent =
        total_students > 0
            ? Math.round((students_by_gender.female / total_students) * 100)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                {/* ── Header ── */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Buku Induk Siswa
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Sistem Informasi Buku Induk — Ringkasan Data
                                Siswa
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Stats Cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Total Siswa Terdaftar */}
                    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900/50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-blue-500 uppercase dark:text-blue-400">
                                    Total Siswa Terdaftar
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_students}
                                </h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    Tercatat dalam buku induk
                                </p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Kelas */}
                    <div className="rounded-xl border border-green-200 bg-white p-6 shadow-sm dark:border-green-900/50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-green-500 uppercase dark:text-green-400">
                                    Total Kelas
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_classes}
                                </h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    Rombongan belajar aktif
                                </p>
                            </div>
                            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
                                <School className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* Wali Kelas / Guru */}
                    <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm dark:border-purple-900/50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-purple-500 uppercase dark:text-purple-400">
                                    Total Guru
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_teachers}
                                </h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    Tenaga pendidik terdaftar
                                </p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900/30">
                                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Jenis Kelamin + Per Kelas ── */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Komposisi Jenis Kelamin */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-100">
                            Komposisi Jenis Kelamin
                        </h3>
                        <p className="mb-5 text-xs text-gray-400">
                            Berdasarkan data buku induk
                        </p>

                        {/* Donut visual sederhana */}
                        <div className="mb-5 flex items-center gap-6">
                            <div className="relative flex h-24 w-24 items-center justify-center">
                                <svg
                                    viewBox="0 0 36 36"
                                    className="h-24 w-24 -rotate-90"
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.9"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="3"
                                    />
                                    {/* Laki-laki */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.9"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        strokeDasharray={`${malePercent} ${100 - malePercent}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-sm font-bold text-gray-700 dark:text-gray-200">
                                    {malePercent}%
                                </span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                                            Laki-laki
                                        </span>
                                        <span className="font-bold text-blue-600 dark:text-blue-400">
                                            {students_by_gender.male} (
                                            {malePercent}%)
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                        <div
                                            className="h-full rounded-full bg-blue-500 transition-all"
                                            style={{ width: `${malePercent}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500"></span>
                                            Perempuan
                                        </span>
                                        <span className="font-bold text-pink-600 dark:text-pink-400">
                                            {students_by_gender.female} (
                                            {femalePercent}%)
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                        <div
                                            className="h-full rounded-full bg-pink-500 transition-all"
                                            style={{
                                                width: `${femalePercent}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="rounded-lg bg-gray-50 px-4 py-2 text-center text-sm text-gray-500 dark:bg-gray-700/50 dark:text-gray-400">
                            Total{' '}
                            <strong className="text-gray-800 dark:text-gray-100">
                                {total_students}
                            </strong>{' '}
                            siswa tercatat dalam buku induk
                        </div>
                    </div>

                    {/* Distribusi Per Kelas */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-100">
                            Distribusi Siswa per Kelas
                        </h3>
                        <p className="mb-4 text-xs text-gray-400">
                            Jumlah siswa di setiap rombongan belajar
                        </p>
                        <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                            {students_by_class.length > 0 ? (
                                students_by_class.map((item, index) => {
                                    const pct =
                                        total_students > 0
                                            ? Math.round(
                                                  (item.student_count /
                                                      total_students) *
                                                      100,
                                              )
                                            : 0;
                                    const colors = [
                                        'bg-blue-500',
                                        'bg-green-500',
                                        'bg-purple-500',
                                        'bg-orange-500',
                                        'bg-teal-500',
                                        'bg-rose-500',
                                    ];
                                    const color = colors[index % colors.length];
                                    return (
                                        <div key={index}>
                                            <div className="mb-1 flex items-center justify-between text-xs">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                                    {item.class_name}
                                                </span>
                                                <span className="font-bold text-gray-600 dark:text-gray-400">
                                                    {item.student_count} siswa
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                                <div
                                                    className={`h-full rounded-full ${color} transition-all`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="py-4 text-center text-sm text-gray-400">
                                    Belum ada data kelas
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Siswa Terbaru ── */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">
                                Entri Terbaru Buku Induk
                            </h3>
                            <p className="text-xs text-gray-400">
                                Siswa yang baru saja didaftarkan
                            </p>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {recent_students.length} entri terbaru
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:border-gray-700 dark:text-gray-400">
                                    <th className="pr-4 pb-3">
                                        No. Induk (NISN)
                                    </th>
                                    <th className="pr-4 pb-3">Nama Lengkap</th>
                                    <th className="pr-4 pb-3">Kelas</th>
                                    <th className="pb-3">Tanggal Masuk</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {recent_students.length > 0 ? (
                                    recent_students.map((student, index) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                        >
                                            <td className="py-3 pr-4">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
                                                        {student.nisn}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="py-3 pr-4 font-medium text-gray-900 dark:text-gray-100">
                                                {student.full_name}
                                            </td>
                                            <td className="py-3 pr-4">
                                                {student.class_name ? (
                                                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                        {student.class_name}
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-400 dark:bg-gray-700">
                                                        Belum ada kelas
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    student.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-8 text-center text-sm text-gray-400"
                                        >
                                            Belum ada data siswa terdaftar
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
