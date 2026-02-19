import { DeleteDialog } from '@/components/ui/delete-dialog';
import { Entries } from '@/components/ui/entries';
import { InertiaPagination } from '@/components/ui/inertia-pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Student {
    id: number;
    full_name: string;
    nickname: string | null;
    nisn: string;
    date_of_birth: string;
    gender: 'male' | 'female' | null;
    religion: string | null;
    child_order: number | null;
    father_name: string | null;
    mother_name: string | null;
    phone: string | null;
    father_job: string | null;
    mother_job: string | null;
    address: string | null;
    guardian_name: string | null;
    guardian_job: string | null;
    guardian_address: string | null;
    photo: string | null;
    class_id: number | null;
    academic_year_id: number | null;
    created_at: string;
    updated_at: string;
}

interface AcademicYear {
    id: number;
    name: string;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
];

export default function StudentIndex({
    students,
    academicYears,
    i,
    entries,
    search,
}: {
    students: {
        data: Student[];
        from: number;
        to: number;
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        links: any[];
        first_page_url: string | null;
        last_page_url: string | null;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    academicYears: AcademicYear[];
    i: number;
    entries: any;
    search: string;
}) {
    const { props } = usePage();
    const [selected, setSelected] = useState<string[]>([]);

    // ── MODAL FILTER STATE ──
    const [showModal, setShowModal] = useState(false);
    const [filterAcademicYearId, setFilterAcademicYearId] = useState<number>(
        academicYears.find((y) => y.is_active)?.id ?? academicYears[0]?.id,
    );

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected(students.data.map((student) => student.id.toString()));
        } else {
            setSelected([]);
        }
    };

    const toggleSelection = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const handleCetak = () => {
        const url =
            route('admin.students.report.pdf') +
            `?academic_year_id=${filterAcademicYearId}`;
        window.open(url, '_blank');
        setShowModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Siswa" />

            {/* ── MODAL FILTER TAHUN PELAJARAN ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                        {/* Header Modal */}
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-bold text-gray-800 dark:text-white">
                                🖨️ Cetak Laporan Siswa
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Pilih Tahun Pelajaran */}
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tahun Pelajaran
                            </label>
                            <select
                                value={filterAcademicYearId}
                                onChange={(e) =>
                                    setFilterAcademicYearId(
                                        Number(e.target.value),
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                {academicYears.map((y) => (
                                    <option key={y.id} value={y.id}>
                                        {y.name} {y.is_active ? '(Aktif)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Info Periode */}
                        <div className="mb-6 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Tahun Pelajaran:{' '}
                            <strong>
                                {
                                    academicYears.find(
                                        (y) => y.id === filterAcademicYearId,
                                    )?.name
                                }
                            </strong>
                            <br />
                            <span className="text-blue-500">
                                1 Juli s/d 30 Juni tahun berikutnya
                            </span>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCetak}
                                style={{
                                    backgroundColor: '#0369a1',
                                    color: 'white',
                                }}
                                className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
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
                        <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                            <div className="w-full sm:flex sm:space-x-4 md:mt-0">
                                <Entries
                                    route={route('admin.students.index')}
                                    search={search}
                                    entries={entries}
                                />
                            </div>
                            <div className="sm:mt-0 sm:ml-16 sm:flex sm:flex-none sm:space-x-4">
                                <input
                                    type="text"
                                    placeholder="Cari siswa..."
                                    className="w-full rounded-lg border px-3 py-2 text-sm sm:w-auto"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        router.get(
                                            route('admin.students.index'),
                                            {
                                                search: e.target.value,
                                                entries: entries,
                                            },
                                            {
                                                preserveState: true,
                                                replace: true,
                                            },
                                        );
                                    }}
                                />
                                {selected.length > 0 && (
                                    <DeleteDialog
                                        trigger={
                                            <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                                                Hapus ({selected.length})
                                            </button>
                                        }
                                        title="Hapus Pengguna Terpilih"
                                        description={`Anda akan menghapus ${selected.length} pengguna. Lanjutkan?`}
                                        onConfirm={() => {
                                            router.post(
                                                route(
                                                    'admin.students.bulk-delete',
                                                ),
                                                { ids: selected },
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () =>
                                                        setSelected([]),
                                                },
                                            );
                                        }}
                                        cancelText="Batal"
                                        confirmText="Hapus Semua"
                                    />
                                )}
                            </div>
                            <div className="sm:mt-0 sm:ml-5 sm:flex sm:flex-none sm:gap-3">
                                {/* Tombol Cetak Laporan → buka modal */}
                                <button
                                    onClick={() => setShowModal(true)}
                                    style={{
                                        backgroundColor: '#0369a1',
                                        color: 'white',
                                    }}
                                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all active:scale-95"
                                >
                                    🖨️ Cetak Laporan
                                </button>

                                {/* Tombol Tambah Siswa */}
                                <Link
                                    onClick={() =>
                                        router.visit(
                                            route('admin.students.create'),
                                        )
                                    }
                                    style={{
                                        backgroundColor: '#4b986c',
                                        color: 'white',
                                    }}
                                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all active:scale-95"
                                >
                                    + Tambah Siswa
                                </Link>
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {students.data.length > 0 ? (
                                <>
                                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                        <thead className="bg-white text-sm text-gray-700 uppercase dark:bg-gray-800">
                                            <tr className="border-t border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded text-blue-600"
                                                        onChange={
                                                            toggleSelectAll
                                                        }
                                                        checked={
                                                            students.data
                                                                .length > 0 &&
                                                            selected.length ===
                                                                students.data
                                                                    .length
                                                        }
                                                    />
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>NO</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>Nama Lengkap</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>NISN</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>Jenis Kelamin</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>Aksi</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.data.map(
                                                (student, index) => (
                                                    <tr
                                                        key={student.id}
                                                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                                    >
                                                        <td className="px-6 py-2 text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 rounded text-blue-600"
                                                                value={
                                                                    student.id
                                                                }
                                                                onChange={() =>
                                                                    toggleSelection(
                                                                        student.id.toString(),
                                                                    )
                                                                }
                                                                checked={selected.includes(
                                                                    student.id.toString(),
                                                                )}
                                                            />
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 text-center font-medium whitespace-nowrap text-gray-900 dark:text-white"
                                                        >
                                                            {students.from +
                                                                index}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            {student.full_name}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            {student.nisn}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                    student.gender ===
                                                                    'male'
                                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                                        : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                                                }`}
                                                            >
                                                                {student.gender ===
                                                                'male'
                                                                    ? 'Laki-laki'
                                                                    : 'Perempuan'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            <div className="flex justify-center space-x-2">
                                                                {/* Tombol Detail */}
                                                                <Link
                                                                    href={route(
                                                                        'admin.students.show',
                                                                        student.id,
                                                                    )}
                                                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                                                >
                                                                    Detail
                                                                </Link>

                                                                {/* Tombol Edit */}
                                                                <Link
                                                                    href={route(
                                                                        'admin.students.edit',
                                                                        student.id,
                                                                    )}
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#f59e0b',
                                                                        color: 'white',
                                                                    }}
                                                                    className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition hover:opacity-90 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                {/* Tombol Hapus */}
                                                                <DeleteDialog
                                                                    trigger={
                                                                        <button className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none">
                                                                            Hapus
                                                                        </button>
                                                                    }
                                                                    title="Hapus Siswa"
                                                                    description={`Anda yakin ingin menghapus "${student.full_name}"? Tindakan ini tidak dapat dibatalkan.`}
                                                                    onConfirm={() => {
                                                                        router.delete(
                                                                            route(
                                                                                'admin.students.destroy',
                                                                                student.id,
                                                                            ),
                                                                        );
                                                                    }}
                                                                    cancelText="Batal"
                                                                    confirmText="Hapus"
                                                                />

                                                                {/* Tombol Cetak Kartu */}
                                                                <a
                                                                    href={route(
                                                                        'admin.students.card.pdf',
                                                                        student.id,
                                                                    )}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#0F766E',
                                                                        color: 'white',
                                                                    }}
                                                                    className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition hover:opacity-90 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                                                >
                                                                    Cetak Kartu
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="mb-2 px-6 py-3">
                                        <InertiaPagination
                                            pagination={students}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Tidak ada data siswa.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
