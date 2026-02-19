import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface AcademicYear {
    id: number;
    name: string;
    is_active: boolean;
}

export function AddStudentClassModal({
    academicYears,
}: {
    academicYears: AcademicYear[];
}) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        academic_year_id:
            academicYears.find((y) => y.is_active)?.id ??
            academicYears[0]?.id ??
            0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.student-classes.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    style={{ backgroundColor: '#4b986c', color: 'white' }}
                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all active:scale-95"
                >
                    + Tambah Kelas
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Tambah Kelas Baru
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Isi form berikut untuk menambahkan kelas baru
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Nama Kelas */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-foreground">
                                Nama Kelas{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Contoh: 10-A, Kelas 1A"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="border-border bg-card focus:ring-primary"
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>

                        {/* Tahun Pelajaran */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="academic_year_id"
                                className="text-foreground"
                            >
                                Tahun Pelajaran{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="academic_year_id"
                                value={data.academic_year_id}
                                onChange={(e) =>
                                    setData(
                                        'academic_year_id',
                                        Number(e.target.value),
                                    )
                                }
                                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                {academicYears.map((y) => (
                                    <option key={y.id} value={y.id}>
                                        {y.name} {y.is_active ? '(Aktif)' : ''}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.academic_year_id}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                            className="border-border hover:bg-secondary/20"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            style={{
                                backgroundColor: '#4b986c',
                                color: 'white',
                            }}
                            className="hover:opacity-90"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
