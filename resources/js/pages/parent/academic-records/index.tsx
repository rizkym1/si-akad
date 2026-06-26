import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    Clock,
    FileBadge,
    Trophy,
} from 'lucide-react';

interface Student {
    id: number;
    full_name: string;
    nisn: string | null;
    student_class?: {
        name: string;
        school_year?: {
            name: string;
        };
    };
}

interface KriteriaRapor {
    kriteria: string;
    deskripsi: string | null;
}

interface PageProps {
    student: Student;
    rapor: KriteriaRapor[];
}

export default function AcademicRecordIndex({ student, rapor }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Beranda', href: '/dashboard' },
        {
            title: `Profil: ${student.full_name}`,
            href: `/parent/students/${student.id}`,
        },
        {
            title: 'Laporan Perkembangan Anak',
            href: `/parent/students/${student.id}/academic-records`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Laporan Perkembangan Anak - ${student.full_name}`} />

            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* ── Top Bar ── */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/dashboard`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* ── Header ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-700 shadow-lg">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col justify-between gap-6 p-6 text-white sm:p-10 md:flex-row md:items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center rounded-lg border border-teal-500/30 bg-teal-800/50 px-3 py-1 text-xs sm:text-sm font-medium text-teal-100 backdrop-blur-sm">
                                <FileBadge className="mr-2 h-4 w-4" />
                                Laporan Perkembangan Anak
                            </div>
                            <h1 className="mb-2 text-xl font-extrabold sm:text-3xl">
                                {student.full_name}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-teal-100">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Trophy className="h-4 w-4 opacity-70" />{' '}
                                    NISN: {student.nisn || '-'}
                                </span>
                                <span className="hidden text-teal-400/50 sm:inline">
                                    |
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 opacity-70" />{' '}
                                    Kelas: {student.student_class?.name || '-'}
                                </span>
                            </div>
                        </div>
                        <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-md md:flex">
                            <BookOpen className="h-10 w-10 text-white" />
                        </div>
                    </div>
                </div>

                {/* ── Nilai List ── */}
                <div className="mt-2">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                            Penilaian Anak
                        </h2>
                    </div>

                    <div className="relative overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        {rapor && rapor.length > 0 ? (
                            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                                {rapor.map((item, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 font-semibold text-gray-800 dark:text-gray-100 text-center border-b border-gray-200 dark:border-gray-700">
                                            {item.kriteria}
                                        </div>
                                        <div className="p-6 text-gray-700 dark:text-gray-300 leading-relaxed min-h-[100px]">
                                            {item.deskripsi ? (
                                                <p>
                                                    Ananda pada akhir semester ini{' '}
                                                    {item.deskripsi}
                                                </p>
                                            ) : (
                                                <p className="text-gray-400 italic text-center">
                                                    Belum ada deskripsi penilaian untuk kriteria ini.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 rounded-full bg-gray-50 p-4 ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                                    <AlertCircle className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Belum Ada Evaluasi
                                </h3>
                                <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
                                    Saat ini belum ada data laporan perkembangan anak (RDM) yang disetorkan oleh guru untuk siswa ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
