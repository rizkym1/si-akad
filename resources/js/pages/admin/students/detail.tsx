import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    IdCard,
    MapPin,
    Phone,
    School,
    User,
    Users,
    Users2,
    Calendar,
    Contact,
} from 'lucide-react';

interface StudentClass {
    id: number;
    name: string;
    school_year: {
        id: number;
        name: string;
    } | null;
}

interface Student {
    id: number;
    nis: string | null;
    full_name: string;
    nickname: string | null;
    nisn: string;
    family_status: string | null;
    student_phone: string | null;
    student_address: string | null;
    previous_school: string | null;
    accepted_date: string | null;
    accepted_grade: string | null;
    place_of_birth: string | null;
    date_of_birth: string | null;
    gender: string | null;
    religion: string | null;
    child_order: number | null;
    photo: string | null;
    class_id: number | null;
    student_class: StudentClass | null;
    father_name: string | null;
    mother_name: string | null;
    phone: string | null;
    father_job: string | null;
    mother_job: string | null;
    address_street: string | null;
    address_village: string | null;
    address_district: string | null;
    address_city: string | null;
    address_province: string | null;
    guardian_name: string | null;
    guardian_job: string | null;
    guardian_address: string | null;
}

export default function ShowStudent({ student }: { student: Student }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manajemen Siswa',
            href: '/admin/students',
        },
        {
            title: `Buku Induk: ${student.nickname || student.full_name}`,
            href: `/admin/students/${student.id}`,
        },
    ];

    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

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

    const isMale = student.gender === 'male' || student.gender === 'Laki-Laki' || student.gender === 'L';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Buku Induk Siswa - ${student.full_name}`} />
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* ── Top Navigation ── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/admin/students"
                        className="inline-flex items-center gap-2 rounded-lg py-2 pr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Kembali ke Database Siswa
                    </Link>
                </div>

                {/* ── Main Profile Header ── */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="h-32 bg-primary/10 sm:h-48 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div className="px-6 pt-0 pb-6 sm:px-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="relative -mt-16 px-2 sm:-mt-20">
                                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-muted shadow-lg sm:h-40 sm:w-40">
                                    {student.photo ? (
                                        <img
                                            src={`/storage/${student.photo}`}
                                            alt={student.full_name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-secondary/10">
                                            <User className="h-1/2 w-1/2 text-secondary/40" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 px-2 pt-2 sm:px-4 sm:pb-2">
                                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                                    {student.full_name}
                                    {student.nickname && (
                                        <span className="ml-2 inline-block text-lg font-normal text-muted-foreground">
                                            ({student.nickname})
                                        </span>
                                    )}
                                </h1>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {student.student_class ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/20 border-none">
                                            <School className="h-4 w-4" />
                                            {student.student_class.name} / {student.student_class.school_year?.name}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive ring-1 ring-destructive/20 border-none">
                                            Belum memiliki kelas
                                        </span>
                                    )}

                                    {student.nisn && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                                            <IdCard className="h-4 w-4 text-muted-foreground/70" />
                                            NISN: {student.nisn}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Content Grid ── */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        {/* Identitas Diri */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                                <User className="h-5 w-5 text-primary" />
                                Data Pribadi Siswa
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">NIS Lokal</p>
                                    <p className="font-medium text-foreground">{student.nis || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">NISN (Nasional)</p>
                                    <p className="font-medium text-foreground">{student.nisn || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Jenis Kelamin</p>
                                    <p className="font-medium text-foreground">
                                        {student.gender ? (isMale ? 'Laki-laki' : 'Perempuan') : '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Agama</p>
                                    <p className="font-medium text-foreground">{student.religion || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Tempat Lahir</p>
                                    <p className="font-medium text-foreground">{student.place_of_birth || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Tanggal Lahir</p>
                                    <p className="font-medium text-foreground">
                                        {formatDate(student.date_of_birth)}
                                        {student.date_of_birth && (
                                            <span className="text-muted-foreground text-xs ml-1">({calculateAge(student.date_of_birth)})</span>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Anak Ke-</p>
                                    <p className="font-medium text-foreground">{student.child_order ? `${student.child_order}` : '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Status Keluarga</p>
                                    <p className="font-medium text-foreground">{student.family_status || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Asal Sekolah & Penerimaan */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                                <Calendar className="h-5 w-5 text-primary" />
                                Riwayat Akademik & Penerimaan
                            </h2>
                            <div className="grid gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Asal Sekolah Sebelumnya</p>
                                    <p className="font-medium text-foreground">{student.previous_school || '-'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Tanggal Diterima</p>
                                        <p className="font-medium text-foreground">{formatDate(student.accepted_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Diterima di Kelas</p>
                                        <p className="font-medium text-foreground">{student.accepted_grade || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        {/* Informasi Orang Tua */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                                <Users2 className="h-5 w-5 text-primary" />
                                Informasi Orang Tua
                            </h2>
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Nama Ayah</p>
                                        <p className="font-medium text-foreground">{student.father_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Pekerjaan Ayah</p>
                                        <p className="font-medium text-foreground">{student.father_job || '-'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Nama Ibu</p>
                                        <p className="font-medium text-foreground">{student.mother_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Pekerjaan Ibu</p>
                                        <p className="font-medium text-foreground">{student.mother_job || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kontak & Alamat Lengkap */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                                <Contact className="h-5 w-5 text-primary" />
                                Kontak & Domisili
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
                                    <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Nomor Telepon (Aktif)</p>
                                        <p className="font-medium text-foreground">{student.phone || student.student_phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Alamat Domisili Siswa</p>
                                        <p className="font-medium text-foreground leading-relaxed mt-1">
                                            {student.student_address || '-'}
                                        </p>
                                        {(student.address_street || student.address_village || student.address_district || student.address_city || student.address_province) && (
                                            <p className="text-sm text-muted-foreground italic mt-2 border-l-2 border-border pl-2">
                                                {student.address_street && `${student.address_street}, `}
                                                {student.address_village && `Kel. ${student.address_village}, `}
                                                {student.address_district && `Kec. ${student.address_district}, `}
                                                {student.address_city && `${student.address_city}, `}
                                                {student.address_province && `${student.address_province}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Wali (Opsional) */}
                        {(student.guardian_name || student.guardian_job || student.guardian_address) && (
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                                    <Users className="h-5 w-5 text-primary" />
                                    Informasi Wali (Opsional)
                                </h2>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Nama Wali</p>
                                            <p className="font-medium text-foreground">{student.guardian_name || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Pekerjaan Wali</p>
                                            <p className="font-medium text-foreground">{student.guardian_job || '-'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Alamat Wali</p>
                                        <p className="font-medium text-foreground">{student.guardian_address || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
