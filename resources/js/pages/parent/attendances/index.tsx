import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar as CalendarIcon,
    CheckCircle2,
    Clock,
    Users,
    XCircle,
} from 'lucide-react';

interface Child {
    id: number;
    full_name: string;
    nisn: string;
}

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

interface Summary {
    present: number;
    sick: number;
    permission: number;
    absent: number;
}

interface PageProps {
    children: Child[];
    schoolYears: SchoolYear[];
    filters: {
        student_id: number | null;
        school_year_id: number | null;
        month: number;
    };
    summary: Summary;
    monthlyRecords: Record<string, Summary>;
    hasData: boolean;
}

const months = [
    { id: 1, name: 'Januari' },
    { id: 2, name: 'Februari' },
    { id: 3, name: 'Maret' },
    { id: 4, name: 'April' },
    { id: 5, name: 'Mei' },
    { id: 6, name: 'Juni' },
    { id: 7, name: 'Juli' },
    { id: 8, name: 'Agustus' },
    { id: 9, name: 'September' },
    { id: 10, name: 'Oktober' },
    { id: 11, name: 'November' },
    { id: 12, name: 'Desember' },
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Beranda', href: '/dashboard' },
    { title: 'Laporan Kehadiran', href: '/parent/attendances' },
];

export default function AttendanceIndex({
    children,
    schoolYears,
    filters,
    summary,
    monthlyRecords,
    hasData,
}: PageProps) {
    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/parent/attendances',
            { ...filters, [key]: value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const totalDays = summary.present + summary.sick + summary.permission + summary.absent;

    if (children.length === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Kehadiran Anak" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <div className="max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                            Belum Ada Data Anak
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Akun Anda belum ditautkan dengan data siswa. Silakan hubungi admin sekolah untuk perbaikan data.
                        </p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Kehadiran" />
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 sm:p-6">
                
                {/* Header & Filters */}
                <div className="flex flex-col justify-between gap-6 rounded-xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm lg:flex-row lg:items-center dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-1">
                        <h1 className="text-xl sm:text-2xl font-bold dark:text-white">Laporan Kehadiran</h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Pantau riwayat absensi anak asuh Anda di sekolah secara real-time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:gap-4">
                        {/* Filter Anak */}
                        <div className="flex flex-col gap-1.5 lg:min-w-[200px]">
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Pilih Anak
                            </label>
                            <select
                                value={filters.student_id || ''}
                                onChange={(e) => handleFilterChange('student_id', e.target.value)}
                                className="w-full rounded-lg border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                {children.map((child) => (
                                    <option key={child.id} value={child.id}>
                                        {child.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        {/* Filter Tahun Ajaran */}
                        <div className="flex flex-col gap-1.5 lg:min-w-[150px]">
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Tahun Ajaran
                            </label>
                            <select
                                value={filters.school_year_id || ''}
                                onChange={(e) => handleFilterChange('school_year_id', e.target.value)}
                                className="w-full rounded-lg border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                {schoolYears.map((year) => (
                                    <option key={year.id} value={year.id}>
                                        {year.name}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        {/* Filter Bulan */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1 lg:min-w-[150px]">
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Bulan
                            </label>
                            <select
                                value={filters.month || 0}
                                onChange={(e) => handleFilterChange('month', e.target.value)}
                                className="w-full rounded-lg border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value={0}>Semua Bulan</option>
                                {months.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {hasData ? (
                    <div className="space-y-6">
                        {/* Summary Grid */}
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {/* Hadir */}
                            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center justify-between space-y-0">
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-600 tracking-tight dark:text-gray-300">Total Hadir</h3>
                                    <div className="rounded-full bg-emerald-100 p-1.5 sm:p-2 dark:bg-emerald-900/30">
                                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                                    <div className="text-2xl sm:text-3xl font-bold dark:text-white">{summary.present}</div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500">Hari</span>
                                </div>
                                {totalDays > 0 && (
                                    <div className="mt-2.5 flex items-center text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        <span className="bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                                            {Math.round((summary.present / totalDays) * 100)}% Kehadiran
                                        </span>
                                    </div>
                                )}
                            </div>
 
                            {/* Sakit */}
                            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center justify-between space-y-0">
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-600 tracking-tight dark:text-gray-300">Sakit</h3>
                                    <div className="rounded-full bg-amber-100 p-1.5 sm:p-2 dark:bg-amber-900/30">
                                        <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                                    <div className="text-2xl sm:text-3xl font-bold dark:text-white">{summary.sick}</div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500">Hari</span>
                                </div>
                            </div>
 
                            {/* Izin */}
                            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center justify-between space-y-0">
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-600 tracking-tight dark:text-gray-300">Izin</h3>
                                    <div className="rounded-full bg-blue-100 p-1.5 sm:p-2 dark:bg-blue-900/30">
                                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                                    <div className="text-2xl sm:text-3xl font-bold dark:text-white">{summary.permission}</div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500">Hari</span>
                                </div>
                            </div>
 
                            {/* Alpa */}
                            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center justify-between space-y-0 text-red-600 dark:text-red-400">
                                    <h3 className="text-xs sm:text-sm font-medium tracking-tight">Alpa</h3>
                                    <div className="rounded-full bg-red-100 p-1.5 sm:p-2 dark:bg-red-900/30">
                                        <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                                    <div className="text-2xl sm:text-3xl font-bold dark:text-white">{summary.absent}</div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500">Hari</span>
                                </div>
                            </div>
                        </div>

                        {/* Rincian Bulanan Tabel */}
                        <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Rincian Kehadiran Per Bulan</h3>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-50 text-xs font-semibold text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-300">
                                        <tr>
                                            <th className="px-6 py-4">Bulan</th>
                                            <th className="px-6 py-4 text-center">Hadir</th>
                                            <th className="px-6 py-4 text-center">Sakit</th>
                                            <th className="px-6 py-4 text-center">Izin</th>
                                            <th className="px-6 py-4 text-center text-red-500">Alpa</th>
                                            <th className="px-6 py-4 text-center">Total Hari</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {months.map((m) => {
                                            const rec = monthlyRecords[m.id];
                                            const mTotal = rec ? (rec.present + rec.sick + rec.permission + rec.absent) : 0;
                                            
                                            // Optional: highlight the currently selected month in the table
                                            const isSelected = filters.month === m.id;

                                            return (
                                                <tr key={m.id} className={`${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800'}`}>
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{m.name}</td>
                                                    <td className="px-6 py-4 text-center">{rec ? rec.present : '-'}</td>
                                                    <td className="px-6 py-4 text-center">{rec ? rec.sick : '-'}</td>
                                                    <td className="px-6 py-4 text-center">{rec ? rec.permission : '-'}</td>
                                                    <td className="px-6 py-4 text-center text-red-500">{rec ? rec.absent : '-'}</td>
                                                    <td className="px-6 py-4 text-center font-medium">{mTotal > 0 ? mTotal : '-'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16 text-center dark:border-gray-700 dark:bg-gray-800/50">
                        <CalendarIcon className="mb-3 h-10 w-10 text-gray-400" />
                        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                            Data Belum Tersedia
                        </h3>
                        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                            Tidak ada data absensi yang tercatat untuk anak ini pada tahun ajaran yang dipilih.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
