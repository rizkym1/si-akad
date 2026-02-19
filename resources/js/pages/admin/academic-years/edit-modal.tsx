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

interface AcademicYear {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

interface EditAcademicYearModalProps {
    academicYear: AcademicYear;
}

export function EditAcademicYearModal({
    academicYear,
}: EditAcademicYearModalProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: academicYear.name,
        start_date: academicYear.start_date,
        end_date: academicYear.end_date,
        is_active: academicYear.is_active,
    });

    // Reset form data ketika modal dibuka dengan data baru
    useEffect(() => {
        if (open) {
            setData({
                name: academicYear.name,
                start_date: academicYear.start_date,
                end_date: academicYear.end_date,
                is_active: academicYear.is_active,
            });
        }
    }, [open, academicYear]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.academic-years.update', academicYear.id), {
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
                            Edit Tahun Pelajaran
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Perbarui informasi tahun pelajaran di bawah ini
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Nama Tahun Pelajaran */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit-name"
                                className="text-foreground"
                            >
                                Nama Tahun Pelajaran{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-name"
                                type="text"
                                placeholder="contoh: 2024/2025"
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

                        {/* Tanggal Mulai */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit-start_date"
                                className="text-foreground"
                            >
                                Tanggal Mulai{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-start_date"
                                type="date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData('start_date', e.target.value)
                                }
                                className="border-border bg-card focus:ring-primary"
                                required
                            />
                            <InputError
                                message={errors.start_date}
                                className="mt-1"
                            />
                        </div>

                        {/* Tanggal Selesai */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit-end_date"
                                className="text-foreground"
                            >
                                Tanggal Selesai{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-end_date"
                                type="date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData('end_date', e.target.value)
                                }
                                className="border-border bg-card focus:ring-primary"
                                required
                            />
                            <InputError
                                message={errors.end_date}
                                className="mt-1"
                            />
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="edit-is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.checked)
                                }
                                className="h-4 w-4 rounded text-blue-600"
                            />
                            <Label
                                htmlFor="edit-is_active"
                                className="cursor-pointer text-foreground"
                            >
                                Jadikan Tahun Pelajaran Aktif
                            </Label>
                        </div>
                        <InputError
                            message={errors.is_active}
                            className="mt-1"
                        />
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
