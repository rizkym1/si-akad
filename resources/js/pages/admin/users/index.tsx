import { DeleteDialog } from '@/components/ui/delete-dialog';
import { Entries } from '@/components/ui/entries';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InertiaPagination } from '@/components/ui/inertia-pagination';
import { SortableHeader } from '@/components/ui/sortable-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, MoreVertical, Trash2, Search, UserX, UserPlus, Users, Link as LinkIcon, Download, Key } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    photo?: string;
    nik?: string;
    homeroom_teacher?: string;
    gender?: string;
    education?: string;
    created_at: string;
    updated_at: string;
}

export default function UserIndex({
    users,
    i,
    entries,
    search,
    role,
}: {
    users: {
        data: User[];
        from: number;
        to: number;
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        links: any[];
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    i: number;
    entries: any;
    search: string;
    role?: string;
}) {
    const { props } = usePage();
    const [selected, setSelected] = useState<string[]>([]);

    const pageTitle =
        role === 'admin'
            ? 'Admin'
            : role === 'teacher'
              ? 'Guru'
              : role === 'parent'
                ? 'Orang Tua'
                : 'Pusat Manajemen Pengguna';

    const dynamicBreadcrumbs: BreadcrumbItem[] = [
        {
            title: pageTitle,
            href:
                role === 'admin'
                    ? route('admin.admins.index')
                    : role === 'teacher'
                      ? route('admin.teachers.index')
                      : role === 'parent'
                        ? route('admin.parents.index')
                        : route('admin.users.index'),
        },
    ];

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected(users.data.map((user) => user.id.toString()));
        } else {
            setSelected([]);
        }
    };

    const toggleSelection = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    return (
        <AppLayout breadcrumbs={dynamicBreadcrumbs}>
            <Head title={pageTitle} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {pageTitle}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1 cursor-default max-w-xl">
                                    Kelola seluruh akun pengguna yang terdaftar pada sistem akademik.
                                    Pastikan informasi identitas (NIK / Email) yang dimasukkan selalu valid.
                                </p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <Link
                                    href={route('admin.users.create')}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 border-0"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Tambah Akun Baru
                                </Link>
                            </div>
                        </div>

                        {/* Top Action Bar */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                <Entries
                                    route={
                                        role === 'admin'
                                            ? route('admin.admins.index')
                                            : role === 'teacher'
                                              ? route('admin.teachers.index')
                                              : role === 'parent'
                                                ? route('admin.parents.index')
                                                : route('admin.users.index')
                                    }
                                    search={search}
                                    entries={entries}
                                />
                                {selected.length > 0 && (
                                    <DeleteDialog
                                        trigger={
                                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground shadow-sm hover:opacity-90 transition-opacity focus:ring-2 focus:ring-destructive/50">
                                                <Trash2 className="h-4 w-4" />
                                                Hapus ({selected.length}) Terpilih
                                            </button>
                                        }
                                        title="Hapus Akun Pengguna"
                                        description={`Anda yakin ingin menghapus ${selected.length} akun pengguna yang dipilih? Data yang dihapus tidak dapat dipulihkan kembali.`}
                                        onConfirm={() => {
                                            router.post(
                                                route('admin.users.bulk-delete'),
                                                { ids: selected },
                                                { preserveScroll: true, onSuccess: () => setSelected([]) },
                                            );
                                        }}
                                        cancelText="Batal"
                                        confirmText="Hapus Permanen"
                                    />
                                )}
                            </div>

                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Cari nama, nik, email..."
                                    className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        const r = role === 'admin'
                                            ? route('admin.admins.index')
                                            : role === 'teacher'
                                              ? route('admin.teachers.index')
                                              : role === 'parent'
                                                ? route('admin.parents.index')
                                                : route('admin.users.index');
                                        router.get(
                                            r,
                                            { search: e.target.value, entries: entries },
                                            { preserveState: true, replace: true },
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="relative overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                            {users.data.length > 0 ? (
                                <>
                                    <table className="w-full text-left text-sm text-foreground">
                                        <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            <tr className="border-b border-border">
                                                <th scope="col" className="px-5 py-4 text-center w-12">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                        onChange={toggleSelectAll}
                                                        checked={users.data.length > 0 && selected.length === users.data.length}
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-4 w-16 text-center">NO</th>
                                                <SortableHeader column="name" label="NAMA LENGKAP" />
                                                <SortableHeader column="email" label="IDENTITAS (NIK / EMAIL)" />
                                                {(!role) && <SortableHeader column="role" label="ROLE" align="center" />}
                                                <th scope="col" className="px-6 py-4 text-right">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border bg-background">
                                            {users.data.map((user, index) => (
                                                <tr key={user.id} className="transition-colors hover:bg-muted/40">
                                                    <td className="px-5 py-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                            value={user.id}
                                                            onChange={() => toggleSelection(user.id.toString())}
                                                            checked={selected.includes(user.id.toString())}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-muted-foreground">
                                                        {(users.from ?? 1) + index}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover border border-border shadow-sm"
                                                                    src={user.photo ? `/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                                                    alt={user.name}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-foreground">
                                                                    {user.name}
                                                                </div>
                                                                {user.gender && (
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {user.gender === 'Laki-Laki' ? 'L' : user.gender === 'Perempuan' ? 'P' : user.gender}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-foreground">{user.nik || '-'}</div>
                                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                                    </td>
                                                    {(!role) && (
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20 border-none capitalize">
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end pr-1">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="rounded-md border border-input bg-background p-1.5 text-muted-foreground hover:bg-muted focus:ring-2 focus:ring-primary focus:outline-none">
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48 bg-card text-foreground">
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={route('admin.users.show', user.id)} className="flex items-center w-full cursor-pointer p-2">
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            Lihat Detail
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={route('admin.users.edit', user.id)} className="flex items-center w-full cursor-pointer p-2 text-primary focus:text-primary focus:bg-primary/10">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit Data
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <button 
                                                                            onClick={() => {
                                                                                if (confirm(`Reset password untuk ${user.name}? Password akan direset ke NIK atau 'password'.`)) {
                                                                                    router.post(route('admin.users.reset-password', user.id), {}, { preserveScroll: true });
                                                                                }
                                                                            }}
                                                                            className="flex items-center w-full cursor-pointer p-2 text-yellow-600 focus:text-yellow-700 focus:bg-yellow-50"
                                                                        >
                                                                            <Key className="mr-2 h-4 w-4" />
                                                                            Reset Password
                                                                        </button>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <div className="px-2 py-1.5">
                                                                        <DeleteDialog
                                                                            trigger={
                                                                                <button className="flex w-full items-center text-sm text-destructive font-medium hover:opacity-80">
                                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                                    Hapus Total
                                                                                </button>
                                                                            }
                                                                            title="Hapus Akun"
                                                                            description={`Anda sangat yakin ingin menghapus "${user.name}" dari sistem secara permanen?`}
                                                                            onConfirm={() => {
                                                                                router.delete(route('admin.users.destroy', user.id));
                                                                            }}
                                                                            cancelText="Batal"
                                                                            confirmText="Hapus Permanen"
                                                                        />
                                                                    </div>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="border-t border-border bg-card px-6 py-4">
                                        <InertiaPagination pagination={users} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <UserX className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-medium text-foreground">Direktori Kosong</h3>
                                    <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                                        Data pengguna belum diinput pada kategori ini, atau kata kunci pencarian Anda tidak memiliki kecocokan.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
