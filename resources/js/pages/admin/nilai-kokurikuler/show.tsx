import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface NilaiItem {
    deskripsi: string;
    nilai_data: number;
    predikat: string;
}

interface Props {
    data: {
        siswa: {
            nisn: string;
            nama: string;
            kelas: string;
        };
        nilai: NilaiItem[];
    };
}

const predikatColor: Record<string, string> = {
    BSB: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    BSH: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    MB: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    BB: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

const predikatLabel: Record<string, string> = {
    BSB: 'Berkembang Sangat Baik',
    BSH: 'Berkembang Sesuai Harapan',
    MB: 'Mulai Berkembang',
    BB: 'Belum Berkembang',
};

export default function NilaiKokurikulerShow({ data }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Nilai Kokurikuler',
            href: '/admin/nilai-kokurikuler',
        },
        {
            title: data.siswa?.nama ?? 'Detail',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Nilai - ${data.siswa?.nama}`} />

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
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                Detail Nilai Kokurikuler
                            </h1>
                        </div>

                        {/* Info Siswa */}
                        <div className="mb-4 rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Nama Siswa
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {data.siswa?.nama ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        NISN
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {data.siswa?.nisn ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Kelas
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {data.siswa?.kelas ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tabel Nilai */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {data.nilai?.length > 0 ? (
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-white text-sm text-gray-700 uppercase dark:bg-gray-800">
                                        <tr className="border-t border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                            <th className="px-6 py-3 text-center">
                                                NO
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                Deskripsi Penilaian
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                Nilai
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                Predikat
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.nilai.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                            >
                                                <td className="px-6 py-4 text-center font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-2 text-left text-gray-900 dark:text-white">
                                                    {item.deskripsi}
                                                </td>
                                                <td className="px-6 py-2 text-center font-bold text-gray-900 dark:text-white">
                                                    {item.nilai_data}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${predikatColor[item.predikat] ?? ''}`}
                                                    >
                                                        {item.predikat} -{' '}
                                                        {
                                                            predikatLabel[
                                                                item.predikat
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Belum ada data nilai kokurikuler.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
