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

// ✅ Interface AcademicYear dari DB
interface AcademicYear {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
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

const monthOptions = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

export default function AttendanceIndex({
    attendances,
    students,
    academicYears, // ✅ Terima dari controller
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
    academicYears: AcademicYear[]; // ✅
    entries: any;
    search: string;
}) {
    const [selected, setSelected] = useState<string[]>([]);

    const now = new Date();
    const [showModal, setShowModal] = useState(false);
    const [filterMode, setFilterMode] = useState<'month' | 'academic'>('month');
    const [filterMonth, setFilterMonth] = useState(
        String(now.getMonth() + 1).padStart(2, '0'),
    );
    const [filterYear, setFilterYear] = useState(String(now.getFullYear()));

    // ✅ Default pilih tahun pelajaran yang aktif dari DB
    const defaultAcademicYear =
        academicYears.find((y) => y.is_active)?.id ??
        academicYears[0]?.id ??
        null;

    const [filterAcademicYearId, setFilterAcademicYearId] = useState<
        number | null
    >(defaultAcademicYear);

    // Generate tahun (5 tahun ke belakang)
    const yearOptions = Array.from({ length: 6 }, (_, i) =>
        String(now.getFullYear() - i),
    );

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

    const handleCetak = () => {
        let startDate = '';
        let endDate = '';

        if (filterMode === 'month') {
            startDate = `${filterYear}-${filterMonth}-01`;
            const lastDay = new Date(
                parseInt(filterYear),
                parseInt(filterMonth),
                0,
            ).getDate();
            endDate = `${filterYear}-${filterMonth}-${String(lastDay).padStart(2, '0')}`;
        } else {
            // ✅ Ambil start_date & end_date dari data DB
            const selected = academicYears.find(
                (y) => y.id === filterAcademicYearId,
            );
            startDate = selected?.start_date ?? '';
            endDate = selected?.end_date ?? '';
        }

        const url =
            route('admin.attendances.report.pdf') +
            `?start_date=${startDate}&end_date=${endDate}`;

        window.open(url, '_blank');
        setShowModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Absensi" />

            {/* ── MODAL FILTER ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-bold text-gray-800 dark:text-white">
                                🖨️ Filter Laporan Absensi
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Tab Mode Filter */}
                        <div className="mb-4 flex rounded-lg border border-gray-200 p-1 dark:border-gray-600">
                            <button
                                onClick={() => setFilterMode('month')}
                                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                                    filterMode === 'month'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                }`}
                            >
                                📅 Per Bulan
                            </button>
                            <button
                                onClick={() => setFilterMode('academic')}
                                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                                    filterMode === 'academic'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                }`}
                            >
                                🏫 Tahun Pelajaran
                            </button>
                        </div>

                        {/* Form Per Bulan */}
                        {filterMode === 'month' && (
                            <>
                                <div className="mb-4">
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Bulan
                                    </label>
                                    <select
                                        value={filterMonth}
                                        onChange={(e) =>
                                            setFilterMonth(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        {monthOptions.map((m) => (
                                            <option
                                                key={m.value}
                                                value={m.value}
                                            >
                                                {m.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tahun
                                    </label>
                                    <select
                                        value={filterYear}
                                        onChange={(e) =>
                                            setFilterYear(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        {yearOptions.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                    Periode:{' '}
                                    <strong>
                                        {
                                            monthOptions.find(
                                                (m) => m.value === filterMonth,
                                            )?.label
                                        }{' '}
                                        {filterYear}
                                    </strong>
                                </div>
                            </>
                        )}

                        {/* ✅ Form Per Tahun Pelajaran dari DB */}
                        {filterMode === 'academic' && (
                            <>
                                <div className="mb-4">
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tahun Pelajaran
                                    </label>
                                    <select
                                        value={filterAcademicYearId ?? ''}
                                        onChange={(e) =>
                                            setFilterAcademicYearId(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        {academicYears.map((y) => (
                                            <option key={y.id} value={y.id}>
                                                {y.name}{' '}
                                                {y.is_active ? '(Aktif)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ✅ Preview periode dari start_date & end_date DB */}
                                {filterAcademicYearId &&
                                    (() => {
                                        const selected = academicYears.find(
                                            (y) =>
                                                y.id === filterAcademicYearId,
                                        );
                                        return selected ? (
                                            <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                Periode:{' '}
                                                <strong>{selected.name}</strong>
                                                <br />
                                                <span className="text-blue-500">
                                                    {new Date(
                                                        selected.start_date,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        },
                                                    )}{' '}
                                                    s/d{' '}
                                                    {new Date(
                                                        selected.end_date,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        ) : null;
                                    })()}
                            </>
                        )}

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCetak}
                                style={{
                                    backgroundColor: '#0369a1',
                                    color: 'white',
                                }}
                                className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
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
                                            { search: e.target.value, entries },
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
                            <div className="sm:mt-0 sm:ml-5 sm:flex sm:flex-none sm:gap-3">
                                <button
                                    onClick={() => setShowModal(true)}
                                    style={{
                                        backgroundColor: '#0369a1',
                                        color: 'white',
                                    }}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all active:scale-95"
                                >
                                    🖨️ Cetak Laporan
                                </button>
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
                                                            <div className="flex justify-center gap-1.5">
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
                                                                        <button className="inline-flex items-center rounded bg-red-500 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-red-600">
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
