import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Student {
    id: number;
    nis: string;
    nisn: string;
    full_name: string;
    student_class: {
        id: number;
        name: string;
    } | null;
}

interface KriteriaRapor {
    kriteria: string;
    deskripsi: string | null;
}

interface Props {
    student: Student;
    rapor: KriteriaRapor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penilaian Anak',
        href: '/admin/nilai-kokurikuler',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function PenilaianPerkembanganAnakDetail({ student, rapor }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Rapor - ${student?.full_name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        {/* Header */}
                        <div className="mb-4 flex items-center gap-3">
                            <Link
                                href="/admin/nilai-kokurikuler"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                ← Kembali
                            </Link>
                        </div>

                        {/* Info Siswa */}
                        <div className="mb-6 rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center sm:text-left">
                                LAPORAN PERKEMBANGAN ANAK
                            </h3>
                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Nama Siswa
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {student?.full_name ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        NIS
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {student?.nis ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Rombongan Belajar / Kelas
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {student?.student_class?.name ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rapor Kriteria */}
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
                                <div className="p-6 text-center text-gray-500">
                                    Data laporan perkembangan anak belum tersedia di sistem.
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
