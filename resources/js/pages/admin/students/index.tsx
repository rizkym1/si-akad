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
    date_of_birth: string; // format: "YYYY-MM-DD"
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
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
];

export default function StudentIndex({
    students,
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
    i: number;
    entries: any;
    search: string;
}) {
    const { props } = usePage();
    const [selected, setSelected] = useState<string[]>([]);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Siswa" />

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
                            <div className="sm:mt-0 sm:ml-5 sm:flex-none">
                                <Link
                                    href={route('admin.students.create')}
                                    style={{
                                        backgroundColor: '#4b986c',
                                        color: 'white',
                                    }} // Warna Hijau Primary Anda
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
                                                                {/* Tombol Detail - Menggunakan style yang sama dengan tombol "Tambah Siswa" tapi lebih compact */}
                                                                <Link
                                                                    href={route(
                                                                        'admin.students.show',
                                                                        student.id,
                                                                    )}
                                                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                                                                    }} // Warna orange/amber manual
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
