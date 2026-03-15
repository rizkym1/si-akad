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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, MoreVertical, Trash2 } from 'lucide-react';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '/admin/users',
    },
];

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
        first_page_url: string | null;
        last_page_url: string | null;
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

    // Set title based on role
    const pageTitle =
        role === 'admin'
            ? 'Data Admin'
            : role === 'teacher'
              ? 'Data Guru'
              : role === 'parent'
                ? 'Orang Tua'
                : 'Manajemen Pengguna';

    // Dynamic breadcrumbs based on role
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
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    // Helper function for sending search and entries updates while preserving role
    const getRouteOptions = () => {
        const routeName =
            role === 'admin'
                ? 'admin.admins.index'
                : role === 'teacher'
                  ? 'admin.teachers.index'
                  : role === 'parent'
                    ? 'admin.parents.index'
                    : 'admin.users.index';
        return route(routeName);
    };

    return (
        <AppLayout breadcrumbs={dynamicBreadcrumbs}>
            <Head title={pageTitle} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                            <div className="w-full sm:flex sm:space-x-4 md:mt-0">
                                <Entries
                                    route={getRouteOptions()}
                                    search={search}
                                    entries={entries}
                                />
                            </div>
                            <div className="sm:mt-0 sm:ml-16 sm:flex sm:flex-none sm:space-x-4">
                                <input
                                    type="text"
                                    placeholder="Cari pengguna..."
                                    className="w-full rounded-lg border px-3 py-2 text-sm sm:w-auto"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        const queryParams: any = {
                                            search: e.target.value,
                                            entries: entries,
                                        };
                                        if (role) {
                                            queryParams.role = role;
                                        }

                                        router.get(
                                            getRouteOptions(),
                                            queryParams,
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
                                                    'admin.users.bulk-delete',
                                                ),
                                                { ids: selected, role: role },
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
                                    href={route(
                                        'admin.users.create',
                                        role ? { role: role } : {},
                                    )}
                                    style={{
                                        backgroundColor: '#4b986c',
                                        color: 'white',
                                    }} // Warna Hijau Primary Anda
                                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all active:scale-95"
                                >
                                    + Tambah Pengguna
                                </Link>
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {users.data.length > 0 ? (
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
                                                            users.data.length >
                                                                0 &&
                                                            selected.length ===
                                                                users.data
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
                                                    <span>Email</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    <span>Role</span>
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
                                            {users.data.map((user, index) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                                >
                                                    <td className="px-6 py-2 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-5 w-5 rounded text-blue-600"
                                                            value={user.id}
                                                            onChange={() =>
                                                                toggleSelection(
                                                                    user.id.toString(),
                                                                )
                                                            }
                                                            checked={selected.includes(
                                                                user.id.toString(),
                                                            )}
                                                        />
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 text-center font-medium whitespace-nowrap text-gray-900 dark:text-white"
                                                    >
                                                        {users.from + index}
                                                    </td>
                                                    <td className="px-6 py-2 text-center">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-6 py-2 text-center">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-2 text-center capitalize">
                                                        {user.role === 'teacher'
                                                            ? 'Guru'
                                                            : user.role ===
                                                                'parent'
                                                              ? 'Orang Tua'
                                                              : user.role.replace(
                                                                    /_/g,
                                                                    ' ',
                                                                )}
                                                    </td>
                                                    <td className="px-6 py-2 text-center">
                                                        <div className="flex justify-center">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none dark:hover:bg-gray-700">
                                                                        <MoreVertical className="h-5 w-5 text-gray-500" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48 p-1">
                                                                    <DropdownMenuItem asChild>
                                                                        <Link
                                                                            href={route(
                                                                                'admin.users.show',
                                                                                role
                                                                                    ? {
                                                                                          user: user.id,
                                                                                          role: role,
                                                                                      }
                                                                                    : {
                                                                                          user: user.id,
                                                                                      },
                                                                            )}
                                                                            className="flex w-full cursor-pointer items-center p-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                                                        >
                                                                            <Eye className="mr-2 h-4 w-4 text-blue-500" />
                                                                            Detail Pengguna
                                                                        </Link>
                                                                    </DropdownMenuItem>

                                                                    <DropdownMenuItem asChild>
                                                                        <Link
                                                                            href={route(
                                                                                'admin.users.edit',
                                                                                role
                                                                                    ? {
                                                                                          user: user.id,
                                                                                          role: role,
                                                                                      }
                                                                                    : {
                                                                                          user: user.id,
                                                                                      },
                                                                            )}
                                                                            className="flex w-full cursor-pointer items-center p-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                                                        >
                                                                            <Edit className="mr-2 h-4 w-4 text-amber-500" />
                                                                             Edit Data
                                                                        </Link>
                                                                    </DropdownMenuItem>

                                                                    <DropdownMenuSeparator />

                                                                    <DeleteDialog
                                                                        trigger={
                                                                            <button className="flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/40 dark:focus:bg-red-950/40 transition-colors">
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                Hapus Pengguna
                                                                            </button>
                                                                        }
                                                                        title="Hapus Pengguna"
                                                                        description={`Anda yakin ingin menghapus "${user.name}"? Tindakan ini tidak dapat dibatalkan.`}
                                                                        onConfirm={() => {
                                                                            router.delete(
                                                                                route(
                                                                                    'admin.users.destroy',
                                                                                    role
                                                                                        ? {
                                                                                              user: user.id,
                                                                                              role: role,
                                                                                          }
                                                                                        : {
                                                                                              user: user.id,
                                                                                          },
                                                                                ),
                                                                            );
                                                                        }}
                                                                        cancelText="Batal"
                                                                        confirmText="Hapus"
                                                                    />
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="mb-2 px-6 py-3">
                                        <InertiaPagination pagination={users} />
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 rounded bg-gray-500 p-3 text-white shadow-sm">
                                    Tidak ada data pengguna.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
