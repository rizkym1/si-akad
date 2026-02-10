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
import { FormEvent, useEffect, useState } from 'react';

interface StudentClass {
    id: number;
    name: string;
    academic_year: string;
}

interface EditStudentClassModalProps {
    studentClass: StudentClass;
}

export function EditStudentClassModal({
    studentClass,
}: EditStudentClassModalProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: studentClass.name,
        academic_year: studentClass.academic_year,
    });

    // Reset form data ketika modal dibuka dengan data baru
    useEffect(() => {
        if (open) {
            setData({
                name: studentClass.name,
                academic_year: studentClass.academic_year,
            });
        }
    }, [open, studentClass]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.student-classes.update', studentClass.id), {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    style={{ backgroundColor: '#f59e0b', color: 'white' }}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition hover:opacity-90 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Edit Kelas
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Perbarui informasi kelas di bawah ini
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Nama Kelas */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit-name"
                                className="text-foreground"
                            >
                                Nama Kelas{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-name"
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

                        {/* Tahun Ajaran */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit-academic_year"
                                className="text-foreground"
                            >
                                Tahun Ajaran{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-academic_year"
                                type="text"
                                placeholder="Contoh: 2024/2025"
                                value={data.academic_year}
                                onChange={(e) =>
                                    setData('academic_year', e.target.value)
                                }
                                className="border-border bg-card focus:ring-primary"
                                required
                            />
                            <InputError
                                message={errors.academic_year}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-border hover:bg-secondary/20"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            style={{
                                backgroundColor: '#f59e0b',
                                color: 'white',
                            }}
                            className="hover:opacity-90"
                        >
                            {processing ? 'Menyimpan...' : 'Perbarui'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
