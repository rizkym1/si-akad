import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GraduationCap, School, UserCheck } from 'lucide-react';

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
    total_subjects,
    students_by_gender,
    students_by_class,
    recent_students,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Welcome Section */}
                <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 p-6 shadow-md dark:border-sidebar-border dark:from-blue-900/20 dark:via-green-900/20 dark:to-purple-900/20">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Selamat Datang di Sistem Informasi Akademik
                    </h1>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                        Dashboard ringkasan data akademik sekolah Anda
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Total Siswa */}
                    <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-blue-900 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Total Siswa
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_students}
                                </h3>
                            </div>
                            <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                                <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Kelas */}
                    <div className="relative overflow-hidden rounded-xl border border-green-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-green-900 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                    Total Kelas
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_classes}
                                </h3>
                            </div>
                            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
                                <School className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Guru */}
                    <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-purple-900 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    Total Guru
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_teachers}
                                </h3>
                            </div>
                            <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900/30">
                                <UserCheck className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Mata Pelajaran */}
                    {/* <div className="relative overflow-hidden rounded-xl border border-orange-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow dark:border-orange-900 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                    Mata Pelajaran
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {total_subjects}
                                </h3>
                            </div>
                            <div className="rounded-full bg-orange-100 p-4 dark:bg-orange-900/30">
                                <BookOpen className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Siswa Berdasarkan Jenis Kelamin */}
                    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md dark:border-blue-900 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                            Siswa Berdasarkan Jenis Kelamin
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Laki-laki
                                    </span>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                        {students_by_gender.male}
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all"
                                        style={{
                                            width: `${(students_by_gender.male / total_students) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Perempuan
                                    </span>
                                    <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                                        {students_by_gender.female}
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-pink-600 transition-all"
                                        style={{
                                            width: `${(students_by_gender.female / total_students) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Siswa Berdasarkan Kelas */}
                    <div className="rounded-xl border border-green-200 bg-white p-6 shadow-md dark:border-green-900 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
                            Siswa Berdasarkan Kelas
                        </h3>
                        <div className="max-h-48 space-y-3 overflow-y-auto">
                            {students_by_class.length > 0 ? (
                                students_by_class.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20"
                                    >
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {item.class_name}
                                        </span>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            {item.student_count} siswa
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                    Belum ada data kelas
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Students */}
                <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-md dark:border-purple-900 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-purple-600 dark:text-purple-400">
                        Siswa Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-200 text-xs text-gray-700 uppercase dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">NISN</th>
                                    <th className="px-4 py-3">Nama Lengkap</th>
                                    <th className="px-4 py-3">Kelas</th>
                                    <th className="px-4 py-3">
                                        Tanggal Daftar
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {recent_students.length > 0 ? (
                                    recent_students.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                        >
                                            <td className="px-4 py-3 font-mono text-xs">
                                                {student.nisn}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                                                {student.full_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {student.class_name || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                {new Date(
                                                    student.created_at,
                                                ).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Belum ada data siswa
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
