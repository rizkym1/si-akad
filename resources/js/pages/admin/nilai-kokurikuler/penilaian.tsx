import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface SiswaNilai {
    siswa_id: number;
    siswa_nisn: string;
    siswa_nama: string;
    nilai_id: number;
    nilai_data: number; // 4=SB, 3=B, 2=C, 1=K
}

interface Detail {
    penilaian_id: number;
    penilaian_deskripsi: string;
    kelas_nama: string;
    dplpc_nama: string;
    dplpc_type: string;
}

interface Props {
    detail: Detail;
    siswaList: SiswaNilai[];
}

// Mapping nilai_data ke kolom
const NILAI_MAP: Record<number, string> = {
    4: 'SB',
    3: 'B',
    2: 'C',
    1: 'K',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Kokurikuler',
        href: '/admin/nilai-kokurikuler',
    },
    {
        title: 'Penilaian',
        href: '#',
    },
];

export default function NilaiKokurikulerPenilaian({
    detail,
    siswaList,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Penilaian - ${detail?.dplpc_nama}`} />

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

                        {/* Info Penilaian */}
                        <div className="mb-4 rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-gray-800">
                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        DPL / Panca Cinta
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {detail?.dplpc_nama ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Tipe
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {detail?.dplpc_type ?? '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Kelas
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {detail?.kelas_nama ?? '-'}{' '}
                                        {/* ← sekarang tampil "Kelas 1" / "Kelas 2" */}
                                    </p>
                                </div>
                                <div className="sm:col-span-3">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Deskripsi
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {detail?.penilaian_deskripsi ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tabel Penilaian Siswa */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {siswaList.length > 0 ? (
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-white text-sm text-gray-700 uppercase dark:bg-gray-800">
                                        {/* Baris 1: header utama */}
                                        <tr className="border-t border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                                            <th
                                                rowSpan={2}
                                                className="border border-gray-200 px-6 py-3 text-center dark:border-gray-700"
                                            >
                                                No
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="border border-gray-200 px-6 py-3 text-center dark:border-gray-700"
                                            >
                                                NISN
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="border border-gray-200 px-6 py-3 text-center dark:border-gray-700"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                colSpan={4}
                                                className="border border-gray-200 px-6 py-3 text-center dark:border-gray-700"
                                            >
                                                Nilai
                                            </th>
                                        </tr>
                                        {/* Baris 2: sub header SB, B, C, K */}
                                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                            {['SB', 'B', 'C', 'K'].map(
                                                (label) => (
                                                    <th
                                                        key={label}
                                                        className="border border-gray-200 px-6 py-3 text-center dark:border-gray-700"
                                                    >
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span>{label}</span>
                                                            <input
                                                                type="checkbox"
                                                                disabled
                                                                className="h-4 w-4 rounded text-blue-600"
                                                            />
                                                        </div>
                                                    </th>
                                                ),
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siswaList.map((siswa, index) => {
                                            const nilaiLabel =
                                                NILAI_MAP[siswa.nilai_data] ??
                                                null;
                                            return (
                                                <tr
                                                    key={siswa.siswa_id}
                                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                                >
                                                    {/* No */}
                                                    <td className="border border-gray-200 px-6 py-4 text-center font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                                                        {index + 1}
                                                    </td>

                                                    {/* NISN */}
                                                    <td className="border border-gray-200 px-6 py-4 text-center dark:border-gray-700">
                                                        {siswa.siswa_nisn}
                                                    </td>

                                                    {/* Nama */}
                                                    <td className="border border-gray-200 px-6 py-4 text-left font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                                                        {siswa.siswa_nama}
                                                    </td>

                                                    {/* Checkbox SB, B, C, K */}
                                                    {[4, 3, 2, 1].map((val) => (
                                                        <td
                                                            key={val}
                                                            className="border border-gray-200 px-6 py-4 text-center dark:border-gray-700"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                readOnly
                                                                checked={
                                                                    siswa.nilai_data ===
                                                                    val
                                                                }
                                                                className="h-5 w-5 rounded text-blue-600 accent-blue-600"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Belum ada data penilaian siswa.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
