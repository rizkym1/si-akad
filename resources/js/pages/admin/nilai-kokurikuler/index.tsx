import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SortableHeader } from '@/components/ui/sortable-header';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Leaf, Search, Filter, ClipboardList, PenTool } from 'lucide-react';

interface Siswa {
    id: number;
    nisn: string;
    full_name: string;
}

interface Kelas {
    id: string | number;
    name: string;
    school_year_id: number;
}

interface Props {
    siswaList: Siswa[];
    kelasList: Kelas[];
    school_years?: { id: number; name: string; is_active: boolean }[];
    selectedKelas: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penilaian Perkembangan Anak',
        href: '/admin/nilai-kokurikuler',
    },
];

export default function NilaiKokurikulerIndex({
    siswaList = [],
    kelasList = [],
    school_years = [],
    selectedKelas = '',
}: Props) {
    const [search, setSearch] = useState('');
    
    const safeSiswaList = Array.isArray(siswaList) ? siswaList : [];
    const safeKelasList = Array.isArray(kelasList) ? kelasList : [];

    const filtered = safeSiswaList.filter(
        (s) =>
            (s.full_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
            (s.nisn?.toLowerCase() || '').includes(search.toLowerCase()),
    );

    const handleKelasChange = (kelasId: string) => {
        router.get(
            route('admin.nilai-kokurikuler.index'),
            { class_id: kelasId },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penilaian Perkembangan Anak" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Penilaian Perkembangan Anak
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1 cursor-default max-w-xl">
                                    Pantau dan kelola laporan perkembangan anak yang diintegrasikan secara sinkron dari sistem RDM.
                                </p>
                            </div>
                        </div>

                        {/* Top Action Bar */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex w-full items-center gap-2 sm:w-auto">
                                <Filter className="h-4 w-4 text-muted-foreground mr-1 hidden sm:block" />
                                <label className="text-sm font-medium whitespace-nowrap text-foreground">Pilih T.A / Kelas:</label>
                                <select
                                    value={selectedKelas}
                                    onChange={(e) => handleKelasChange(e.target.value)}
                                    className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-auto focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="" disabled>Pilih Rombongan Belajar</option>
                                    {school_years?.map((sy) => (
                                        <optgroup key={`sy_${sy.id}`} label={`T.A. ${sy.name} ${sy.is_active ? '(Aktif)' : ''}`}>
                                            {safeKelasList
                                                .filter((c) => c.school_year_id === sy.id)
                                                .map((k) => (
                                                    <option key={`class_${k.id}`} value={k.id}>
                                                        {k.name}
                                                    </option>
                                                ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Cari nama atau NISN..."
                                    className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Info Kelas Aktif */}
                        {filtered.length > 0 && (
                            <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/20 p-2 text-primary">
                                        <Leaf className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary/90 text-sm">Daftar Siswa Kelas Terpilih</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Menampilkan <strong className="text-foreground">{filtered.length}</strong> siswa untuk rombongan belajar ini.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Data Table */}
                        <div className="relative overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                            {filtered.length > 0 ? (
                                <table className="w-full text-left text-sm text-foreground">
                                    <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        <tr className="border-b border-border">
                                            <th scope="col" className="w-16 px-6 py-4 text-center">NO</th>
                                            <SortableHeader column="nisn" label="NISN" />
                                            <SortableHeader column="full_name" label="NAMA SISWA" />
                                            <th scope="col" className="px-6 py-4 text-center">STATUS</th>
                                            <th scope="col" className="px-6 py-4 text-right">TINDAKAN</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-background">
                                        {filtered.map((item, index) => (
                                            <tr key={item.id} className="transition-colors hover:bg-muted/40 group">
                                                <td className="px-6 py-4 text-center text-muted-foreground font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-foreground">
                                                    {item.nisn ?? '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-foreground">
                                                        {item.full_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                                                        Aktif
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2 pr-1">
                                                        <Link href={route('admin.nilai-kokurikuler.penilaian', item.id)}>
                                                            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted focus:ring-2 focus:ring-primary/50 shadow-sm opacity-90 group-hover:opacity-100">
                                                                <PenTool className="h-3.5 w-3.5 mr-1.5" />
                                                                Lihat Penilaian
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <ClipboardList className="h-14 w-14 text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-bold text-foreground">Belum Ada Siswa</h3>
                                    <p className="mt-1 text-sm text-muted-foreground max-w-md">
                                        Tidak ada siswa di kelas ini atau tidak ada yang sesuai dengan pencarian Anda.
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
