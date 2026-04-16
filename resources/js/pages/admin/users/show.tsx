import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Mail, Phone, Calendar, MapPin, GraduationCap, Users } from 'lucide-react';

function SectionCard({
    title,
    children,
    icon: Icon
}: {
    title: string;
    children: React.ReactNode;
    icon?: any;
}) {
    return (
        <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    {title}
                </h2>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div className="flex flex-col">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
                {value || '-'}
            </p>
        </div>
    );
}

export default function ShowUser({ user }: { user: any }) {
    const queryParams = new URLSearchParams(window.location.search);
    const initialRole = queryParams.get('role') || user.role;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manajemen Pengguna',
            href: '/admin/users',
        },
        {
            title: 'Profil Pengguna',
            href: `/admin/users/show`,
        },
    ];

    const getReturnRoute = (userRole: string) => {
        if (userRole === 'admin') return route('admin.admins.index');
        if (userRole === 'parent') return route('admin.parents.index');
        if (userRole === 'teacher') return route('admin.teachers.index');
        return route('admin.users.index');
    };

    const genderLabel =
        user.gender === 'Laki-Laki' || user.gender === 'L' || user.gender === 'male'
            ? 'Laki-laki'
            : user.gender === 'Perempuan' || user.gender === 'P' || user.gender === 'female'
              ? 'Perempuan'
              : '-';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Profil: ${user.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                        
                        <div className="mb-6 flex">
                            <Link href={getReturnRoute(initialRole)}>
                                <Button variant="outline" className="gap-2 bg-transparent text-muted-foreground hover:text-foreground">
                                    <ChevronLeft className="h-4 w-4" />
                                    Kembali ke Daftar
                                </Button>
                            </Link>
                        </div>

                        {/* ── Header Profil ── */}
                        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                            <div className="h-32 bg-primary/10"></div>
                            <div className="relative px-6 pb-6 sm:px-8">
                                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
                                    <div className="relative -mt-16 flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border-4 border-card bg-muted shadow-lg">
                                        {user.photo ? (
                                            <img
                                                src={`/storage/${user.photo}`}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-5xl font-bold text-muted-foreground">
                                                {user.name?.charAt(0) || '?'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4 flex-1 sm:mt-0 sm:pt-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-foreground">
                                                    {user.name}
                                                </h1>
                                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize ring-1 ring-primary/20">
                                                        {user.role === 'teacher' ? 'Guru' : user.role === 'parent' ? 'Orang Tua' : user.role === 'admin' ? 'Administrator' : user.role}
                                                    </span>
                                                    {user.nik && (
                                                        <span className="text-sm font-medium text-muted-foreground">
                                                            ID: {user.nik}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-4 sm:mt-0">
                                                <Link href={route('admin.users.edit', user.id)}>
                                                    <Button className="w-full sm:w-auto shadow-sm">
                                                        Edit Profil
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Konten Profil ── */}
                        <div className="grid gap-6 md:grid-cols-2">
                            
                            {/* Informasi Dasar */}
                            <SectionCard title="Informasi Personal Dasar" icon={Users}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <InfoRow label="Nama Lengkap" value={user.name} />
                                    <InfoRow label="NIK / Nomor Unik" value={user.nik} />
                                    <InfoRow label="Jenis Kelamin" value={genderLabel} />
                                    <InfoRow label="Agama" value={user.religion} />
                                    {user.date_of_birth && (
                                        <InfoRow label="Tanggal Lahir" value={user.date_of_birth} />
                                    )}
                                    {user.place_of_birth && (
                                        <InfoRow label="Tempat Lahir" value={user.place_of_birth} />
                                    )}
                                </div>
                            </SectionCard>

                            {/* Kontak & Komunikasi */}
                            <SectionCard title="Kontak & Komunikasi" icon={Phone}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <InfoRow label="Email Surat Masuk" value={user.email} />
                                    </div>
                                    <InfoRow label="Telepon" value={user.phone} />
                                    <div className="sm:col-span-2">
                                        <InfoRow label="Alamat Lengkap" value={user.address} />
                                    </div>
                                </div>
                            </SectionCard>

                            {/* Informasi Jabatan (Guru/Staf) */}
                            {user.role === 'teacher' && (
                                <SectionCard title="Data Profesi (Khusus Guru/Staf)" icon={GraduationCap}>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <InfoRow label="Jabatan/Tugas" value={user.position} />
                                        <InfoRow label="Wali Kelas T.A Aktif" value={user.homeroom_teacher || 'Tidak menjabat'} />
                                        <InfoRow label="Pendidikan Terakhir" value={user.education} />
                                        <InfoRow label="Status Kepegawaian" value={user.employment_status} />
                                        <InfoRow label="NUPTK" value={user.nuptk} />
                                        <InfoRow label="Tahun Bergabung" value={user.join_date} />
                                    </div>
                                </SectionCard>
                            )}

                            {/* Informasi Orang Tua/Wali */}
                            {user.role === 'parent' && (
                                <SectionCard title="Pekerjaan & Data Lain" icon={Calendar}>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <InfoRow label="Pekerjaan" value={user.occupation} />
                                        <div className="sm:col-span-2">
                                            <p className="text-sm italic text-muted-foreground">
                                                (Profil ini akan tertaut langsung secara relasional terhadap data peserta didik yang berkaitan.)
                                            </p>
                                        </div>
                                    </div>
                                </SectionCard>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
