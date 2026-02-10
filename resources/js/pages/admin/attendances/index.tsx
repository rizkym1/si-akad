import { DeleteDialog } from '@/components/ui/delete-dialog';
import { Entries } from '@/components/ui/entries';
import { InertiaPagination } from '@/components/ui/inertia-pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { AddAttendanceModal } from './add-modal';
import { EditAttendanceModal } from './edit-modal';

interface Student {
    id: number;
    full_name: string;
}

interface Attendance {
    id: number;
    student_id: number;
    date: string;
    status: 'Present' | 'Permitted' | 'Sick' | 'Absent';
    notes: string | null;
    student: Student;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Absensi',
        href: '/admin/attendances',
    },
];

const statusLabel: Record<string, string> = {
    Present: 'Hadir',
    Permitted: 'Izin',
    Sick: 'Sakit',
    Absent: 'Alpa',
};

const statusColor: Record<string, string> = {
    Present:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Permitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Sick: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Absent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function AttendanceIndex({
    attendances,
    students,
    entries,
    search,
}: {
    attendances: {
        data: Attendance[];
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
    students: Student[];
    entries: any;
    search: string;
}) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected(attendances.data.map((item) => item.id.toString()));
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Absensi" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                            <div className="w-full sm:flex sm:space-x-4 md:mt-0">
                                <Entries
                                    route={route('admin.attendances.index')}
                                    search={search}
                                    entries={entries}
                                />
                            </div>
                            <div className="sm:mt-0 sm:ml-16 sm:flex sm:flex-none sm:space-x-4">
                                <input
                                    type="text"
                                    placeholder="Cari absensi..."
                                    className="w-full rounded-lg border px-3 py-2 text-sm sm:w-auto dark:bg-gray-800"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        router.get(
                                            route('admin.attendances.index'),
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
                                        title="Hapus Absensi Terpilih"
                                        description={`Anda akan menghapus ${selected.length} data absensi. Lanjutkan?`}
                                        onConfirm={() => {
                                            router.post(
                                                route(
                                                    'admin.attendances.bulk-delete',
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
                                <AddAttendanceModal students={students} />
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {attendances.data.length > 0 ? (
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
                                                            attendances.data
                                                                .length > 0 &&
                                                            selected.length ===
                                                                attendances.data
                                                                    .length
                                                        }
                                                    />
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    NO
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    NAMA SISWA
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    TANGGAL
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    STATUS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    CATATAN
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    AKSI
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendances.data.map(
                                                (item, index) => (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                                    >
                                                        <td className="px-6 py-2 text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 rounded text-blue-600"
                                                                value={item.id}
                                                                onChange={() =>
                                                                    toggleSelection(
                                                                        item.id.toString(),
                                                                    )
                                                                }
                                                                checked={selected.includes(
                                                                    item.id.toString(),
                                                                )}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 text-center font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                            {attendances.from +
                                                                index}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            {item.student
                                                                ?.full_name ??
                                                                '-'}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            {formatDate(
                                                                item.date,
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[item.status]}`}
                                                            >
                                                                {
                                                                    statusLabel[
                                                                        item
                                                                            .status
                                                                    ]
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            {item.notes ?? '-'}
                                                        </td>
                                                        <td className="px-6 py-2 text-center">
                                                            <div className="flex justify-center space-x-2">
                                                                <EditAttendanceModal
                                                                    attendance={
                                                                        item
                                                                    }
                                                                    students={
                                                                        students
                                                                    }
                                                                />

                                                                <DeleteDialog
                                                                    trigger={
                                                                        <button className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none">
                                                                            Hapus
                                                                        </button>
                                                                    }
                                                                    title="Hapus Absensi"
                                                                    description={`Yakin ingin menghapus absensi "${item.student?.full_name}" pada tanggal "${formatDate(item.date)}"?`}
                                                                    onConfirm={() => {
                                                                        router.delete(
                                                                            route(
                                                                                'admin.attendances.destroy',
                                                                                item.id,
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
                                            pagination={attendances}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Tidak ada data absensi.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
