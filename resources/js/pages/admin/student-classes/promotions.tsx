import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Student {
    id: number;
    full_name: string;
    nis: string;
    nisn: string;
}

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

interface StudentClass {
    id: number;
    name: string;
    school_year_id: number;
    school_year?: SchoolYear;
}

interface Props {
    sourceClass: StudentClass;
    students: Student[];
    schoolYears: SchoolYear[];
    studentClasses: StudentClass[];
}

export default function StudentPromotions({ sourceClass, students, schoolYears, studentClasses }: Props) {
    const [selectedStudents, setSelectedStudents] = useState<number[]>(students.map(s => s.id));
    const [action, setAction] = useState<'promote' | 'graduate'>('promote');
    const [destinationSchoolYearId, setDestinationSchoolYearId] = useState<number | ''>('');
    const [destinationClassId, setDestinationClassId] = useState<number | ''>('');
    const [processing, setProcessing] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Daftar Kelas',
            href: route('admin.student-classes.index'),
        },
        {
            title: 'Kenaikan Kelas & Kelulusan',
            href: route('admin.student-classes.promotions.create', sourceClass.id),
        },
    ];

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudents(students.map((item) => item.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const toggleSelection = (id: number) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedStudents.length === 0) {
            setAlertMessage('Pilih setidaknya satu siswa.');
            setIsAlertOpen(true);
            return;
        }

        if (action === 'promote' && (!destinationSchoolYearId || !destinationClassId)) {
            setAlertMessage('Pilih Tahun Ajaran dan Kelas tujuan.');
            setIsAlertOpen(true);
            return;
        }

        setIsConfirmOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmOpen(false);
        setProcessing(true);
        router.post(
            route('admin.student-classes.promotions.store', sourceClass.id),
            {
                student_ids: selectedStudents,
                action: action,
                destination_school_year_id: destinationSchoolYearId,
                destination_class_id: destinationClassId,
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    // Filter available classes based on selected destination school year
    const availableDestinationClasses = destinationSchoolYearId 
        ? studentClasses.filter(c => c.school_year_id === Number(destinationSchoolYearId))
        : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Kenaikan Kelas - ${sourceClass.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.student-classes.index')}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                        title="Kembali"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            Kenaikan Kelas & Kelulusan
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Atur kenaikan kelas atau kelulusan siswa dari kelas <span className="font-semibold text-primary">{sourceClass.name}</span>.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Panel Kiri: Daftar Siswa */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="rounded-xl border border-border bg-card shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Daftar Siswa</h3>
                                    <p className="text-sm text-muted-foreground">Kelas Asal: <strong>{sourceClass.name}</strong> ({sourceClass.school_year?.name})</p>
                                </div>
                                <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                                    {selectedStudents.length} Terpilih
                                </div>
                            </div>
                            
                            <div className="relative overflow-x-auto rounded-lg border border-border bg-background">
                                <table className="w-full text-left text-sm text-foreground">
                                    <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        <tr className="border-b border-border">
                                            <th scope="col" className="px-5 py-3 text-center w-12">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                    onChange={toggleSelectAll}
                                                    checked={students.length > 0 && selectedStudents.length === students.length}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-16 text-center">NO</th>
                                            <th scope="col" className="px-6 py-3">NAMA SISWA</th>
                                            <th scope="col" className="px-6 py-3">NIS/NISN</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-background">
                                        {students.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                                    Tidak ada siswa aktif di kelas ini.
                                                </td>
                                            </tr>
                                        ) : (
                                            students.map((student, index) => (
                                                <tr key={student.id} className="transition-colors hover:bg-muted/40">
                                                    <td className="px-5 py-2 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                                                            value={student.id}
                                                            onChange={() => toggleSelection(student.id)}
                                                            checked={selectedStudents.includes(student.id)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-2 text-center text-muted-foreground">{index + 1}</td>
                                                    <td className="px-6 py-2 font-medium">{student.full_name}</td>
                                                    <td className="px-6 py-2 text-muted-foreground text-xs">{student.nis} / {student.nisn || '-'}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Panel Kanan: Aksi & Tujuan */}
                    <div className="flex flex-col gap-4">
                        <form onSubmit={submit} className="rounded-xl border border-border bg-card shadow-sm p-5 sticky top-6">
                            <h3 className="font-semibold text-lg border-b border-border pb-3 mb-4">Pengaturan Tujuan</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Aksi</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setAction('promote')}
                                            className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-sm font-medium transition-colors ${
                                                action === 'promote' 
                                                ? 'border-primary bg-primary/10 text-primary' 
                                                : 'border-input bg-background text-foreground hover:bg-muted'
                                            }`}
                                        >
                                            <ArrowRight className="h-4 w-4" /> Naik Kelas
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAction('graduate')}
                                            className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-sm font-medium transition-colors ${
                                                action === 'graduate' 
                                                ? 'border-green-600 bg-green-600/10 text-green-600' 
                                                : 'border-input bg-background text-foreground hover:bg-muted'
                                            }`}
                                        >
                                            <GraduationCap className="h-4 w-4" /> Lulus
                                        </button>
                                    </div>
                                </div>

                                {action === 'promote' && (
                                    <>
                                        <div>
                                            <label htmlFor="school_year_id" className="mb-1.5 block text-sm font-medium text-foreground">Tahun Pelajaran Tujuan</label>
                                            <select
                                                id="school_year_id"
                                                className="block w-full rounded-lg border border-input bg-background py-2 px-3 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                                value={destinationSchoolYearId}
                                                onChange={(e) => {
                                                    setDestinationSchoolYearId(e.target.value ? Number(e.target.value) : '');
                                                    setDestinationClassId(''); // Reset class when school year changes
                                                }}
                                                required={action === 'promote'}
                                            >
                                                <option value="">-- Pilih Tahun Pelajaran --</option>
                                                {schoolYears.map((sy) => (
                                                    <option key={sy.id} value={sy.id}>
                                                        {sy.name} {sy.is_active ? '(Aktif)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="class_id" className="mb-1.5 block text-sm font-medium text-foreground">Kelas Tujuan</label>
                                            <select
                                                id="class_id"
                                                className="block w-full rounded-lg border border-input bg-background py-2 px-3 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:opacity-50"
                                                value={destinationClassId}
                                                onChange={(e) => setDestinationClassId(e.target.value ? Number(e.target.value) : '')}
                                                required={action === 'promote'}
                                                disabled={!destinationSchoolYearId}
                                            >
                                                <option value="">-- Pilih Kelas --</option>
                                                {availableDestinationClasses.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {action === 'graduate' && (
                                    <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
                                        Siswa yang dipilih akan diubah statusnya menjadi <strong>Lulus</strong> dan tidak lagi terikat pada kelas manapun.
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || selectedStudents.length === 0}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                            >
                                <UserCheck className="h-4 w-4" />
                                {processing ? 'Memproses...' : 'Proses Eksekusi'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Proses</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda yakin ingin memproses <strong>{selectedStudents.length}</strong> siswa? 
                            Tindakan ini akan {action === 'graduate' ? 'meluluskan siswa' : 'memindahkan siswa ke kelas tujuan'}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Ya, Lanjutkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Perhatian</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsAlertOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Mengerti
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
