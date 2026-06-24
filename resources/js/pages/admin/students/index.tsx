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
import { Edit, Eye, MoreVertical, Printer, Trash2, Search, UserPlus, FileSearch, X } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    full_name: string;
    nickname: string | null;
    nis: string | null;
    nisn: string;
    date_of_birth: string;
    gender: 'male' | 'female' | null | string;
    religion: string | null;
    child_order: number | null;
    father_name: string | null;
    mother_name: string | null;
    phone: string | null;
    father_job: string | null;
    mother_job: string | null;
    address: string | null;
    guardian_name: string | null;
    guardian_job: string | null;
    guardian_address: string | null;
    photo: string | null;
    class_id: number | null;
    school_year_id: number | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
];

export default function StudentIndex({
    students,
    schoolYears,
    studentClasses,
    i,
    entries,
    search,
    class_id,
    school_year_id,
}: {
    students: {
        data: Student[];
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
    schoolYears: SchoolYear[];
    studentClasses: { id: number; name: string; school_year_id?: number }[];
    i: number;
    entries: any;
    search: string;
    class_id: string | null;
    school_year_id: string | null;
    status: string | null;
}) {
    const { props } = usePage();
    const [selected, setSelected] = useState<string[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [filterSchoolYearId, setFilterSchoolYearId] = useState<number>(
        schoolYears.find((y) => y.is_active)?.id ?? (schoolYears[0]?.id || 0),
    );

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected(students.data.map((student) => student.id.toString()));
        } else {
            setSelected([]);
        }
    };

    const toggleSelection = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const handleCetak = () => {
        const url = route('admin.students.report.pdf') + `?school_year_id=${filterSchoolYearId}`;
        window.open(url, '_blank');
        setShowModal(false);
    };

    const combinedFilterValue = class_id ? `class_${class_id}` : (school_year_id ? `sy_${school_year_id}` : '');

    const handleCombinedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        let newClassId = '';
        let newSyId = '';
        if (val.startsWith('class_')) {
            newClassId = val.replace('class_', '');
        } else if (val.startsWith('sy_')) {
            newSyId = val.replace('sy_', '');
        }

        router.get(
            route('admin.students.index'),
            { search: search, entries: entries, class_id: newClassId, school_year_id: newSyId, status: status },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Siswa" />

            {/* ── MODAL CETAK LAPORAN ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="w-full max-w-md scale-100 rounded-2xl bg-card p-6 shadow-2xl transition-all dark:border border-border overflow-hidden">
                        <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                                <Printer className="h-5 w-5 text-secondary" />
                                Cetak PDF Buku Induk
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Pilih Tahun Pelajaran Induk
                                </label>
                                <select
                                    value={filterSchoolYearId}
                                    onChange={(e) => setFilterSchoolYearId(Number(e.target.value))}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    {schoolYears.map((y) => (
                                        <option key={y.id} value={y.id}>
                                            {y.name} {y.is_active ? '(Aktif)' : ''}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Dokumen ini akan mencetak rekapitulasi data induk seluruh siswa yang tergabung di tahun ajaran yang dipilih secara lengkap.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCetak}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground shadow-sm hover:opacity-90 active:scale-95 transition-all"
                            >
                                <Printer className="h-4 w-4" />
                                Generate PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Manajemen Database Siswa
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1 cursor-default max-w-xl">
                                    Basis data terpusat peserta didik. Kelola identitas absensi, latar belakang anak, dan cetak rapor induk secara *real-time*.
                                </p>
                            </div>
                            
                            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 border border-secondary text-secondary rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all hover:bg-secondary hover:text-white active:scale-95 bg-transparent"
                                >
                                    <Printer className="h-4 w-4" />
                                    Cetak Buku Induk
                                </button>

                                <Link
                                    href={route('admin.students.create')}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 border-0"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Tambah Siswa
                                </Link>
                            </div>
                        </div>

                        {/* Top Action Bar */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                <Entries
                                    route={route('admin.students.index')}
                                    search={search}
                                    entries={entries}
                                />
                                {selected.length > 0 && (
                                    <DeleteDialog
                                        trigger={
                                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground shadow-sm hover:opacity-90 transition-opacity focus:ring-2 focus:ring-destructive/50">
                                                <Trash2 className="h-4 w-4" />
                                                Hapus ({selected.length}) Profil
                                            </button>
                                        }
                                        title="Hapus Data Siswa"
                                        description={`Hati-hati! Penghapusan ${selected.length} data siswa dapat memutuskan relasi riwayat nilai dan presensinya. Yakin hapus permanen?`}
                                        onConfirm={() => {
                                            router.post(
                                                route('admin.students.bulk-delete'),
                                                { ids: selected },
                                                { preserveScroll: true, onSuccess: () => setSelected([]) },
                                            );
                                        }}
                                        cancelText="Batal"
                                        confirmText="Hapus Permanen"
                                    />
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <select
                                        className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-foreground"
                                        value={combinedFilterValue}
                                        onChange={handleCombinedFilterChange}
                                    >
                                        <option value="">Semua Tahun Ajaran & Kelas</option>
                                        {schoolYears.map((sy) => (
                                            <optgroup key={`sy_${sy.id}`} label={`T.A. ${sy.name} ${sy.is_active ? '(Aktif)' : ''}`}>
                                                <option value={`sy_${sy.id}`}>Semua Kelas di T.A. {sy.name}</option>
                                                {studentClasses
                                                    .filter((c) => c.school_year_id === sy.id)
                                                    .map((c) => (
                                                        <option key={`class_${c.id}`} value={`class_${c.id}`}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-48">
                                    <select
                                        className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-foreground"
                                        value={status || ''}
                                        onChange={(e) => {
                                            router.get(
                                                route('admin.students.index'),
                                                { search: search, entries: entries, school_year_id: school_year_id, class_id: class_id, status: e.target.value },
                                                { preserveState: true, replace: true },
                                            );
                                        }}
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="aktif">Aktif</option>
                                        <option value="lulus">Lulus</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Cari NISN, nama lengkap..."
                                        className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                                        defaultValue={search || ''}
                                        onChange={(e) => {
                                            router.get(
                                                route('admin.students.index'),
                                                { search: e.target.value, entries: entries, class_id: class_id, school_year_id: school_year_id, status: status },
                                                { preserveState: true, replace: true },
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="relative overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                            {students.data.length > 0 ? (
                                <>
                                    <table className="w-full text-left text-sm text-foreground">
                                        <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            <tr className="border-b border-border">
                                                <th scope="col" className="px-5 py-4 text-center w-12">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                        onChange={toggleSelectAll}
                                                        checked={students.data.length > 0 && selected.length === students.data.length}
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-4 w-16 text-center">NO</th>
                                                <SortableHeader column="full_name" label="NAMA & KELAMIN" className="min-w-[200px]" />
                                                <SortableHeader column="nis" label="NIS" />
                                                <th scope="col" className="px-6 py-4">KONTAK / ORTU</th>
                                                <th scope="col" className="px-6 py-4 text-right">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border bg-background">
                                            {students.data.map((student, index) => (
                                                <tr key={student.id} className="transition-colors hover:bg-muted/40">
                                                    <td className="px-5 py-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                            value={student.id}
                                                            onChange={() => toggleSelection(student.id.toString())}
                                                            checked={selected.includes(student.id.toString())}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-muted-foreground">
                                                        {(students.from ?? 1) + index}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover border border-border shadow-sm bg-muted text-[10px] break-all leading-3 flex items-center text-center justify-center text-muted-foreground"
                                                                    src={student.photo ? `/storage/${student.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name)}&background=random`}
                                                                    alt={student.full_name}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-foreground">
                                                                    {student.full_name}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground uppercase flex items-center gap-1 mt-0.5">
                                                                    {(student.gender === 'Laki-Laki' || student.gender === 'L' || student.gender === 'male') ? (
                                                                        <span className="text-blue-500 font-semibold">Laki-laki</span>
                                                                    ) : (student.gender === 'Perempuan' || student.gender === 'P' || student.gender === 'female') ? (
                                                                        <span className="text-pink-500 font-semibold">Perempuan</span>
                                                                    ) : '-'}
                                                                    {student.status === 'lulus' && (
                                                                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Lulus</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-sm">{student.nis || '-'}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-foreground">{student.father_name || student.mother_name || student.guardian_name || '-'}</div>
                                                        <div className="text-xs text-muted-foreground">{student.phone || '-'}</div>
                                                    </td>
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
                                                                        <Link href={route('admin.students.show', student.id)} className="flex items-center w-full cursor-pointer p-2">
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            Beranda Siswa
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={route('admin.students.edit', student.id)} className="flex items-center w-full cursor-pointer p-2 text-primary focus:text-primary focus:bg-primary/10">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit Identitas
                                                                        </Link>
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
                                                                            title="Hapus Data Siswa"
                                                                            description={`Anda sangat yakin ingin menghapus "${student.full_name}" secara permanen berserta seluruh arsip siswanya?`}
                                                                            onConfirm={() => {
                                                                                router.delete(route('admin.students.destroy', student.id));
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
                                        <InertiaPagination pagination={students} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <FileSearch className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-medium text-foreground">Database Kosong</h3>
                                    <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                                        Data siswa belum diunggah atau kata kunci pencarian Anda tidak tepat.
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
