import { SortableHeader } from '@/components/ui/sortable-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    nis: string;
    nisn: string;
    full_name: string;
    gender: string;
    student_class: { name: string } | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Siswa',
        href: '/teacher/students',
    },
];

export default function TeacherStudentsIndex({
    students,
    student_classes,
    school_years,
    filters,
}: {
    students: { data: Student[], links: any[] };
    school_years?: { id: number; name: string; is_active: boolean }[];
    student_classes: { id: number; name: string; school_year_id: number }[];
    filters: { search?: string; class_id?: string; school_year_id?: string };
}) {
    const combinedFilterValue = filters.class_id ? `class_${filters.class_id}` : (filters.school_year_id ? `sy_${filters.school_year_id}` : '');

    const handleCombinedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        let class_id = '';
        let school_year_id = '';

        if (val.startsWith('class_')) {
            class_id = val.replace('class_', '');
        } else if (val.startsWith('sy_')) {
            school_year_id = val.replace('sy_', '');
        }

        router.get(
            route('teacher.students.index'),
            { ...filters, class_id, school_year_id },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchChange = (value: string) => {
        router.get(
            route('teacher.students.index'),
            { ...filters, search: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground">Daftar Siswa Sekolah</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Anda dapat melihat informasi profil siswa dan kontak orang tua wali melalui halaman detail.
                            </p>
                        </div>

                        <div className="mb-6 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium whitespace-nowrap text-foreground">
                                    Pilih T.A / Kelas:
                                </label>
                                <select
                                    value={combinedFilterValue}
                                    onChange={handleCombinedFilterChange}
                                    className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full sm:w-auto"
                                >
                                    <option value="">Semua Tahun Ajaran & Kelas</option>
                                    {school_years?.map((sy) => (
                                        <optgroup key={`sy_${sy.id}`} label={`T.A. ${sy.name} ${sy.is_active ? '(Aktif)' : ''}`}>
                                            <option value={`sy_${sy.id}`}>Semua Kelas di T.A. {sy.name}</option>
                                            {student_classes
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
                            
                            <div className="relative w-full sm:w-64 ml-auto">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Cari NIS atau Nama..."
                                    className="pl-10 text-sm"
                                    defaultValue={filters.search}
                                    onBlur={(e) => handleSearchChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSearchChange(e.currentTarget.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="relative overflow-x-auto border border-border shadow-md sm:rounded-lg">
                            {students.data.length > 0 ? (
                                <table className="w-full text-left text-sm text-muted-foreground">
                                    <thead className="bg-muted text-foreground">
                                        <tr className="border-b border-border">
                                            <th className="w-16 px-6 py-4 text-center">No</th>
                                            <SortableHeader column="nis" label="NIS" />
                                            <SortableHeader column="full_name" label="Nama Lengkap" />
                                            <th className="px-6 py-4 text-center">L/P</th>
                                            <th className="px-6 py-4 text-center">Kelas</th>
                                            <th className="w-24 px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.data.map((student, i) => (
                                            <tr key={student.id} className="border-b border-border bg-card hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4 text-center text-foreground font-medium">{i + 1}</td>
                                                <td className="px-6 py-4 text-foreground">{student.nis || '-'}</td>
                                                <td className="px-6 py-4 text-foreground font-semibold">{student.full_name}</td>
                                                <td className="px-6 py-4 text-center text-foreground">
                                                    {(student.gender === 'Laki-Laki' || student.gender === 'L' || student.gender === 'male') ? 'L' :
                                                     (student.gender === 'Perempuan' || student.gender === 'P' || student.gender === 'female') ? 'P' : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center text-foreground">
                                                    {student.student_class?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link href={route('teacher.students.show', student.id)}>
                                                        <Button variant="secondary" size="sm" className="h-8">
                                                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    Tidak ada data siswa ditemukan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
