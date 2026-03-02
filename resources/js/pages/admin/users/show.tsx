import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

function SectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 border-b border-gray-100 pb-2 text-base font-bold text-primary dark:border-gray-700">
                {title}
            </h2>
            {children}
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
        <div>
            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
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
            title: 'Detail Pengguna',
            href: `/admin/users/show`,
        },
    ];

    // Helper to get back route based on role
    const getReturnRoute = (userRole: string) => {
        if (userRole === 'admin') return route('admin.admins.index');
        if (userRole === 'kepala_sekolah')
            return route('admin.principals.index');
        if (userRole === 'guru') return route('admin.teachers.index');
        return route('admin.users.index');
    };

    const genderLabel =
        user.gender === 'L'
            ? 'Laki-laki'
            : user.gender === 'P'
              ? 'Perempuan'
              : '-';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                        {/* ── Header Profil ── */}
                        <div className="mb-6 flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            {user.photo ? (
                                <img
                                    src={`/storage/${user.photo}`}
                                    alt={user.name}
                                    className="h-48 w-36 rounded-md border-4 border-primary object-cover shadow"
                                />
                            ) : (
                                <div className="flex h-48 w-36 items-center justify-center rounded-md border-4 border-primary bg-gray-100 shadow dark:bg-gray-700">
                                    <span className="text-5xl font-bold text-gray-400">
                                        {user.name?.charAt(0) || '?'}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-xl font-bold text-primary">
                                    {user.name}
                                </h1>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700 capitalize dark:bg-blue-900/30 dark:text-blue-300">
                                        {user.role.replace(/_/g, ' ')}
                                    </span>
                                    {(user.role === 'guru' ||
                                        user.role === 'kepala_sekolah') && (
                                        <span
                                            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                                                user.gender === 'L'
                                                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                                                    : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                            }`}
                                        >
                                            {genderLabel}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── Data Pengguna ── */}
                        <SectionCard title="Data Pengguna">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                                <InfoRow
                                    label="Nama Lengkap"
                                    value={user.name}
                                />
                                <InfoRow label="Email" value={user.email} />
                                {(user.role === 'guru' ||
                                    user.role === 'kepala_sekolah') && (
                                    <>
                                        <InfoRow label="NIK" value={user.nik} />
                                        <InfoRow
                                            label="Jenis Kelamin"
                                            value={genderLabel}
                                        />
                                        <InfoRow
                                            label="Pendidikan"
                                            value={user.education}
                                        />
                                        {user.role === 'guru' && (
                                            <InfoRow
                                                label="Wali Kelas"
                                                value={user.homeroom_teacher}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </SectionCard>

                        {/* ── Tombol Aksi ── */}
                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <Link href={getReturnRoute(initialRole)}>
                                <Button variant="outline">← Kembali</Button>
                            </Link>
                            <Link
                                href={route('admin.users.edit', {
                                    user: user.id,
                                    role: initialRole,
                                })}
                            >
                                <Button>Edit Data</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
