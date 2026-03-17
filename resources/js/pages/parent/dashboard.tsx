import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, GraduationCap, School, Users } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda Orang Tua',
        href: '/dashboard',
    },
];
interface ChildData {
    id: number;
    full_name: string;
    nis: string | null;
    nisn: string | null;
    photo: string | null;
    class_name: string | null;
    school_year: string | null;
}
interface UpcomingEvent {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    type: 'holiday' | 'event';
    description: string | null;
}
export default function ParentDashboard({
    children,
    upcoming_events,
}: {
    children: ChildData[];
    upcoming_events: UpcomingEvent[];
}) {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Beranda" />
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4">
                {/* ── Welcome Header ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-lg">
                    <div className="relative z-10">
                        <h1 className="mb-2 text-xl font-extrabold sm:text-3xl">
                            Selamat Datang, {auth.user.name}
                        </h1>
                        <p className="max-w-2xl text-sm text-blue-100 sm:text-lg">
                            Pantau perkembangan akademik, kehadiran, dan seluruh
                            informasi terkait sekolah anak Anda melalui portal
                            Sistem Informasi Akademik ini.
                        </p>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute right-32 -bottom-16 h-48 w-48 rounded-full bg-blue-300 opacity-20 blur-2xl"></div>
                </div>
                {/* ── Data Anak Asuh ── */}
                <div className="mt-4">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100">
                        <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        Informasi Anak Asuh
                    </h2>
                    {children.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700/50">
                                <Users className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Belum Ada Data Anak Terhubung
                            </h3>
                            <p className="max-w-md text-gray-500">
                                Akun Anda saat ini belum dihubungkan dengan data
                                siswa mana pun. Silakan hubungi Wali Kelas atau
                                Admin Tata Usaha untuk mengintegrasikan akun
                                Anda dengan data anak Anda.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {children.map((child) => (
                                <div
                                    key={child.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="relative border-b border-gray-50 p-6 dark:border-gray-700/50">
                                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-sm ring-4 ring-white dark:ring-gray-800">
                                                {child.photo ? (
                                                    <img
                                                        src={`/storage/${child.photo}`}
                                                        alt={child.full_name}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 uppercase dark:bg-indigo-900/30 dark:text-indigo-400">
                                                        {child.full_name.substring(0, 2)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h3 className="truncate text-lg leading-tight font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
                                                    {child.full_name}
                                                </h3>
                                                <div className="mt-1 inline-block truncate rounded-md bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-500 dark:bg-gray-700/50">
                                                    NIS: {child.nis || '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-gray-50/50 p-6 dark:bg-gray-800/50">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                    <School className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Kelas Saat Ini
                                                    </p>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {child.class_name ||
                                                            'Belum Masuk Kelas'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                                    <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Tahun Ajaran
                                                    </p>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {child.school_year ||
                                                            '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Action Links */}
                                    <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
                                        <Link
                                            href={`/parent/students/${child.id}`}
                                            className="py-4 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-indigo-400"
                                        >
                                            Profil Lengkap
                                        </Link>
                                        <Link
                                            href={`/parent/students/${child.id}/academic-records`}
                                            className="flex flex-col justify-center py-4 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-indigo-400"
                                        >
                                            Riwayat Akademik
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* ── Upcoming Events ── */}
                <div className="mt-4">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100">
                        <Calendar className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        Agenda & Pengumuman Terdekat
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {upcoming_events.length === 0 ? (
                            <div className="col-span-full rounded-xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                Tidak ada agenda terdekat dalam waktu ini.
                            </div>
                        ) : (
                            upcoming_events.map((evt) => {
                                const isHoliday = evt.type === 'holiday';
                                const startDate = new Date(evt.start_date);
                                const endDate = new Date(evt.end_date);
                                const isMultiDay =
                                    evt.start_date !== evt.end_date;
                                return (
                                    <div
                                        key={evt.id}
                                        className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isHoliday ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20 ring-inset dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 ring-inset dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/30'}`}
                                            >
                                                {isHoliday ? 'Libur' : 'Acara'}
                                            </span>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                {startDate.toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                    },
                                                )}
                                                {isMultiDay &&
                                                    ` - ${endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}`}
                                            </span>
                                        </div>
                                        <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-gray-100">
                                            {evt.title}
                                        </h3>
                                        <p className="mt-auto line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                            {evt.description ||
                                                `Agenda ${isHoliday ? 'libur' : 'acara'} sekolah yang akan datang.`}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
