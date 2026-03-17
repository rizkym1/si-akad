import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    CheckCircle,
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
interface KokurikulerPenilaian {
    id: number;
    tanggal_kegiatan: string;
    nama_kegiatan: string;
    lokasi_kegiatan: string;
}
interface AcademicRecord {
    id: number;
    penilaian_id: number;
    nisn: string;
    nama_siswa: string;
    nama_rombel: string;
    predikat: string;
    deskripsi: string;
    penilaian?: KokurikulerPenilaian;
}
interface PageProps {
    student: Student;
    records: AcademicRecord[];
}
export default function AcademicRecordIndex({ student, records }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Beranda', href: '/dashboard' },
        {
            title: `Profil: ${student.full_name}`,
            href: `/parent/students/${student.id}`,
        },
        {
            title: 'Riwayat Akademik (Evaluasi)',
            href: `/parent/students/${student.id}/academic-records`,
        },
    ];
    const getPredikatStyle = (predikat: string) => {
        const lower = predikat.toLowerCase();
        if (lower.includes('sangat baik') || lower === 'a')
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
        if (lower.includes('baik') || lower === 'b')
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
        if (lower.includes('cukup') || lower === 'c')
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Riwayat Akademik - ${student.full_name}`} />

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
                                Transkrip / Rapor Sementara
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
                            Catatan Evaluasi Pembelajaran (RDM)
                        </h2>
                        <span className="w-fit rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs sm:text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800">
                            {records.length} Catatan Ditemukan
                        </span>
                    </div>
                    {records.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 rounded-full bg-gray-50 p-4 ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                                <AlertCircle className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                                Belum Ada Evaluasi
                            </h3>
                            <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
                                Saat ini belum ada data nilai kokurikuler atau
                                evaluasi (RDM) yang disetorkan oleh guru untuk
                                siswa ini.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {records.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="flex flex-col gap-1 border-b border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-100">
                                                {record.penilaian
                                                    ?.nama_kegiatan ||
                                                    'Kegiatan Umum'}
                                            </h3>
                                            <div className="rounded border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/40 dark:text-indigo-400">
                                                {record.nama_rombel}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>
                                                Masa Penilaian:{' '}
                                                {record.penilaian
                                                    ?.tanggal_kegiatan
                                                    ? format(
                                                          parseISO(
                                                              record.penilaian
                                                                  .tanggal_kegiatan,
                                                          ),
                                                          'MMMM yyyy',
                                                          { locale: id },
                                                      )
                                                    : '-'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div
                                                className={`rounded-lg border px-4 py-2 text-lg font-black ${getPredikatStyle(record.predikat)} min-w-[3rem] text-center`}
                                            >
                                                {record.predikat}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                    Predikat Kelulusan
                                                </span>
                                                <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />{' '}
                                                    Ternilai
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-auto rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/30">
                                            <span className="mb-1 block text-xs font-bold text-gray-500 uppercase dark:text-gray-400">
                                                Deskripsi Capaian Kompetensi
                                            </span>
                                            <p className="text-sm leading-relaxed text-gray-700 italic dark:text-gray-300">
                                                "{record.deskripsi}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
