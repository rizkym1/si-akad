import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    IdCard,
    MapPin,
    Phone,
    Printer,
    School,
    User,
    Users,
} from 'lucide-react';
interface Student {
    id: number;
    nis: string | null;
    nisn: string | null;
    full_name: string;
    nickname: string | null;
    gender: 'male' | 'female';
    place_of_birth: string | null;
    date_of_birth: string | null;
    address: string | null;
    class_id: number | null;
    user_id: number | null;
    photo: string | null;
    phone: string | null;
    address_street: string | null;
    address_village: string | null;
    address_district: string | null;
    address_city: string | null;
    address_province: string | null;
    student_address: string | null;
    guardian_name: string | null;
    guardian_address: string | null;
    created_at: string;
    updated_at: string;
    student_class?: {
        id: number;
        name: string;
        school_year?: {
            name: string;
        };
    };
    parent_user?: {
        name: string;
        email: string;
    } | null;
}
export default function ShowParent({ student }: { student: Student }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Beranda', href: '/dashboard' },
        {
            title: `Profil: ${student.nickname || student.full_name}`,
            href: `/parent/students/${student.id}`,
        },
    ];
    const calculateAge = (dob: string | null) => {
        if (!dob) return '-';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} tahun`;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Profil Anak - ${student.full_name}`} />
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* ── Top Navigation & Actions ── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 rounded-lg py-2 pr-4 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Kembali ke Beranda
                    </Link>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href={`/parent/students/${student.id}/card/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-100 px-4 py-2.5 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-600/20 transition-all ring-inset hover:bg-orange-200 active:scale-95 sm:w-auto dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-500/30"
                        >
                            <Printer className="h-4 w-4" />
                            Cetak Kartu Anak (PDF)
                        </a>
                    </div>
                </div>
                {/* ── Main Profile Header ── */}
                <div className="overflow-hidden rounded-2xl border border-sidebar-border bg-white shadow-sm dark:bg-gray-800">
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 sm:h-48"></div>
                    <div className="px-6 pt-0 pb-6 sm:px-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="relative -mt-16 px-2 sm:-mt-20">
                                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg sm:h-40 sm:w-40 dark:border-gray-800 dark:bg-gray-800">
                                    {student.photo ? (
                                        <img
                                            src={`/storage/${student.photo}`}
                                            alt={student.full_name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-3xl sm:text-4xl font-bold text-indigo-500 uppercase dark:bg-gray-700 dark:text-gray-400">
                                            {student.full_name.substring(0, 2)}
                                        </div>
                                    )}
                                </div>
                            </div>
 
                            <div className="flex-1 pb-2">
                                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
                                    {student.full_name}
                                </h1>
                                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 sm:text-base dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <IdCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        NISN: <span className="text-gray-900 dark:text-gray-200">{student.nisn || '-'}</span>
                                    </span>
                                    <span className="hidden text-gray-300 sm:block">|</span>
                                    <span>
                                        NIS: <span className="text-gray-900 dark:text-gray-200">{student.nis || '-'}</span>
                                    </span>
                                </p>
                            </div>
 
                            <div className="pb-2">
                                <div className="inline-flex rounded-xl bg-green-50 px-3 py-1.5 sm:px-4 sm:py-2 ring-1 ring-green-600/20 ring-inset dark:bg-green-900/20 dark:ring-green-500/30">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] sm:text-xs font-semibold text-green-600 dark:text-green-400">
                                            Status
                                        </span>
                                        <span className="text-sm sm:text-base font-bold text-green-700 dark:text-green-300">
                                            Siswa Aktif
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ── Tabs & Details ── */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left Column (Academic & Overview) */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Status Akademis */}
                        <div className="rounded-2xl border border-sidebar-border bg-white shadow-sm dark:bg-gray-800">
                            <div className="border-b border-gray-100 p-5 dark:border-gray-700/50">
                                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                    <School className="h-5 w-5 text-indigo-500" />
                                    Informasi Akademik
                                </h3>
                            </div>
                            <div className="p-5">
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Tahun Ajaran
                                        </dt>
                                        <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-200">
                                            {student.student_class?.school_year
                                                ?.name || 'Belum diatur'}
                                        </dd>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Kelas Saat Ini
                                        </dt>
                                        <dd className="mt-1 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                            {student.student_class?.name ||
                                                'Belum masuk kelas'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        {/* Hubungan Orang Tua */}
                        <div className="rounded-2xl border border-sidebar-border bg-white shadow-sm dark:bg-gray-800">
                            <div className="border-b border-gray-100 p-5 dark:border-gray-700/50">
                                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                    <Users className="h-5 w-5 text-blue-500" />
                                    Data Orang Tua Tersambung
                                </h3>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-200">
                                            {student.parent_user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {student.parent_user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column (Detailed Bio) */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-2xl border border-sidebar-border bg-white shadow-sm dark:bg-gray-800">
                            <div className="border-b border-gray-100 p-5 sm:p-6 dark:border-gray-700/50">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                    <User className="h-5 w-5 text-gray-400" />
                                    Biodata Lengkap Siswa
                                </h3>
                            </div>
                            <div className="p-5 sm:p-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="sm:col-span-2 lg:col-span-3">
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Nama Panggilan
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                                            {student.nickname || '-'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Jenis Kelamin
                                        </dt>
                                        <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-200">
                                            {student.gender === 'male' ? (
                                                <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 ring-1 ring-blue-600/20 ring-inset dark:bg-blue-900/30 dark:text-blue-400">
                                                    Laki-laki
                                                </span>
                                            ) : (
                                                <span className="rounded bg-pink-50 px-2 py-0.5 text-pink-700 ring-1 ring-pink-600/20 ring-inset dark:bg-pink-900/30 dark:text-pink-400">
                                                    Perempuan
                                                </span>
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Lahir di
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                                            {student.place_of_birth || '-'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Tanggal Lahir (Umur)
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                                            {student.date_of_birth
                                                ? new Date(
                                                      student.date_of_birth,
                                                  ).toLocaleDateString(
                                                      'id-ID',
                                                      {
                                                          day: 'numeric',
                                                          month: 'long',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : '-'}
                                            <span className="ml-1 text-gray-500">
                                                (
                                                {calculateAge(
                                                    student.date_of_birth,
                                                )}
                                                )
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2 lg:col-span-3">
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Alamat Tempat Tinggal
                                        </dt>
                                        <dd className="mt-1 flex gap-2 text-sm text-gray-900 dark:text-gray-300">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                                            <span>
                                                {[student.address_street, student.address_village, student.address_district, student.address_city, student.address_province]
                                                    .filter(Boolean)
                                                    .join(', ') || student.student_address || '-'}
                                            </span>
                                        </dd>
                                    </div>

                                    <div className="sm:col-span-2 lg:col-span-3">
                                        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Kontak Orang Tua / Wali yang dapat
                                            dihubungi
                                        </dt>
                                        <dd className="mt-1 flex gap-2 font-mono text-sm text-gray-900 dark:text-gray-300">
                                            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                                            <span>
                                                {student.phone ||
                                                    '-'}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
