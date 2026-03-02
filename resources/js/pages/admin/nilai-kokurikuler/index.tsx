import { DeleteDialog } from '@/components/ui/delete-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Penilaian {
    penilaian_id: number;
    penilaian_deskripsi: string;
    dplpc_id: number;
    dplpc_nama: string;
    dplpc_type: string;
    koordinator_id: number | null;
    koor_kelas_id: string | null;
    kelas_nama: string | null;
}

interface Kelas {
    kelas_id: string;
    kelas_nama: string;
}

interface Props {
    penilaian: Penilaian[];
    kelasList: Kelas[];
    selectedKelas: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Kokurikuler',
        href: '/admin/nilai-kokurikuler',
    },
];

export default function NilaiKokurikulerIndex({
    penilaian,
    kelasList,
    selectedKelas,
}: Props) {
    const [search, setSearch] = useState('');

    const filtered = penilaian.filter(
        (p) =>
            p.dplpc_nama?.toLowerCase().includes(search.toLowerCase()) ||
            p.penilaian_deskripsi?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleKelasChange = (kelasId: string) => {
        router.get(
            route('admin.nilai-kokurikuler.index'),
            { kelas_id: kelasId },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai Kokurikuler" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        {/* Header */}
                        <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <div className="w-full sm:flex sm:space-x-4 md:mt-0"></div>
                            <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                                {/* Dropdown Filter Kelas */}
                                <select
                                    value={selectedKelas}
                                    onChange={(e) =>
                                        handleKelasChange(e.target.value)
                                    }
                                    className="rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                >
                                    {kelasList.map((k) => (
                                        <option
                                            key={k.kelas_id}
                                            value={k.kelas_id}
                                        >
                                            {k.kelas_nama ??
                                                `Kelas ${k.kelas_id}`}
                                        </option>
                                    ))}
                                </select>

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Cari penilaian..."
                                    className="rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Info Kelas Aktif */}
                        {filtered.length > 0 && (
                            <div className="mb-3 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                Kelas:{' '}
                                <strong>
                                    {filtered[0]?.kelas_nama ?? '-'}
                                </strong>
                                &nbsp;·&nbsp;{filtered.length} penilaian
                            </div>
                        )}

                        {/* Tabel */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {filtered.length > 0 ? (
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-white text-sm text-gray-700 uppercase dark:bg-gray-800">
                                        <tr className="border-t border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                                            <th className="w-12 px-6 py-3 text-center">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                DPL/Panca Cinta
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                Deskripsi
                                            </th>
                                            <th className="w-20 px-6 py-3 text-center">
                                                Nilai
                                            </th>
                                            <th className="w-48 px-6 py-3 text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((item, index) => (
                                            <tr
                                                key={item.penilaian_id}
                                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                            >
                                                <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-left text-gray-900 dark:text-white">
                                                    <div className="font-medium">
                                                        {item.dplpc_nama}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {item.dplpc_type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">
                                                    {item.penilaian_deskripsi}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center rounded-md bg-green-500 px-3 py-1 text-white">
                                                        ✓
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            href={route(
                                                                'admin.nilai-kokurikuler.penilaian',
                                                                item.penilaian_id,
                                                            )}
                                                            className="inline-flex flex-col items-center rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600"
                                                        >
                                                            <span>☰</span>
                                                            <span>
                                                                Penilaian
                                                            </span>
                                                        </Link>
                                                        <button className="inline-flex flex-col items-center rounded-md bg-purple-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-purple-600">
                                                            <span>✎</span>
                                                            <span>Edit</span>
                                                        </button>
                                                        <DeleteDialog
                                                            trigger={
                                                                <button className="inline-flex flex-col items-center rounded-md bg-red-400 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500">
                                                                    <span>
                                                                        🗑
                                                                    </span>
                                                                    <span>
                                                                        Hapus
                                                                    </span>
                                                                </button>
                                                            }
                                                            title="Hapus Penilaian"
                                                            description={`Anda yakin ingin menghapus penilaian "${item.dplpc_nama}"? Semua nilai siswa terkait juga akan dihapus.`}
                                                            onConfirm={() => {
                                                                router.delete(
                                                                    route(
                                                                        'admin.nilai-kokurikuler.destroy',
                                                                        item.penilaian_id,
                                                                    ),
                                                                );
                                                            }}
                                                            cancelText="Batal"
                                                            confirmText="Hapus"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Tidak ada data penilaian.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
