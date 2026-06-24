import { DeleteDialog } from '@/components/ui/delete-dialog';
import { Entries } from '@/components/ui/entries';
import { InertiaPagination } from '@/components/ui/inertia-pagination';
import { SortableHeader } from '@/components/ui/sortable-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { AddSchoolYearModal } from './add-modal';
import { EditSchoolYearModal } from './edit-modal';
import { Search, Trash2, CalendarX2 } from 'lucide-react';

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Tahun Pelajaran',
        href: '/admin/school-years',
    },
];

export default function SchoolYearIndex({
    schoolYears,
    entries,
    search,
}: {
    schoolYears: {
        data: SchoolYear[];
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
    entries: any;
    search: string;
}) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected(schoolYears.data.map((item) => item.id.toString()));
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Tahun Ajaran" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Manajemen Tahun Pelajaran
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1 cursor-default">
                                    Kelola daftar tahun akademik sekolah. Tahun yang berstatus aktif akan digunakan sebagai acuan *default* di seluruh komponen aplikasi.
                                </p>
                            </div>
                            <div className="flex shrink-0">
                                <AddSchoolYearModal />
                            </div>
                        </div>

                        {/* Top Action Bar */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                <Entries
                                    route={route('admin.school-years.index')}
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
                                        title="Hapus Tahun Ajaran Terpilih"
                                        description={`Anda akan menghapus ${selected.length} tahun ajaran yang terpilih. Tindakan ini tidak dapat dikembalikan. Lanjutkan?`}
                                        onConfirm={() => {
                                            router.post(
                                                route('admin.school-years.bulk-delete'),
                                                { ids: selected },
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => setSelected([]),
                                                },
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
                                    placeholder="Cari tahun ajaran..."
                                    className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                                    defaultValue={search || ''}
                                    onChange={(e) => {
                                        router.get(
                                            route('admin.school-years.index'),
                                            {
                                                search: e.target.value,
                                                entries: entries,
                                            },
                                            { preserveState: true, replace: true },
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="relative overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                            {schoolYears.data.length > 0 ? (
                                <>
                                    <table className="w-full text-left text-sm text-foreground">
                                        <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            <tr className="border-b border-border">
                                                <th scope="col" className="px-5 py-4 text-center w-12">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                        onChange={toggleSelectAll}
                                                        checked={schoolYears.data.length > 0 && selected.length === schoolYears.data.length}
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-4 w-16 text-center">
                                                    NO
                                                </th>
                                                <SortableHeader column="name" label="TAHUN AJARAN" />
                                                <SortableHeader column="is_active" label="STATUS" align="center" />
                                                <th scope="col" className="px-6 py-4 text-right">
                                                    AKSI
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border bg-background">
                                            {schoolYears.data.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="transition-colors hover:bg-muted/40"
                                                >
                                                    <td className="px-5 py-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                            value={item.id}
                                                            onChange={() => toggleSelection(item.id.toString())}
                                                            checked={selected.includes(item.id.toString())}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-3 text-center text-muted-foreground">
                                                        {schoolYears.from + index}
                                                    </td>
                                                    <td className="px-6 py-3 font-medium">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-3 text-center">
                                                        {item.is_active ? (
                                                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 ring-1 ring-green-600/20 dark:text-green-400 border-none">
                                                                Tahun Aktif
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border border-none">
                                                                Tidak Aktif
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <div className="flex justify-end gap-2 pr-1">
                                                            <EditSchoolYearModal schoolYear={item} />

                                                            <DeleteDialog
                                                                trigger={
                                                                    <button className="inline-flex items-center justify-center rounded-md border border-destructive/20 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus:ring-2 focus:ring-destructive/50 focus:outline-none">
                                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                                        Hapus
                                                                    </button>
                                                                }
                                                                title="Hapus Tahun Ajaran"
                                                                description={`Yakin ingin menghapus tahun ajaran "${item.name}" secara permanen?`}
                                                                onConfirm={() => {
                                                                    router.delete(
                                                                        route('admin.school-years.destroy', item.id),
                                                                        { preserveScroll: true }
                                                                    );
                                                                }}
                                                                cancelText="Batal"
                                                                confirmText="Ya, Hapus"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="border-t border-border bg-card px-6 py-4">
                                        <InertiaPagination pagination={schoolYears} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <CalendarX2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-medium text-foreground">Kosong</h3>
                                    <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                                        Data sistem tahun pelajaran belum tersedia atau tidak ada hasil pencarian yang cocok.
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
