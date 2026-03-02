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

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

interface EditSchoolYearModalProps {
    schoolYear: SchoolYear;
}

// ✅ Fungsi normalize tanggal (sama seperti edit-modal absensi)
function normalizeDateString(s: string | null | undefined): string {
    if (!s) return '';
    // '2026-07-01 00:00:00' -> '2026-07-01'
    // '2026-07-01T00:00:00.000Z' -> '2026-07-01'
    return s.slice(0, 10);
}

export function EditSchoolYearModal({ schoolYear }: EditSchoolYearModalProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: schoolYear.name,
        is_active: schoolYear.is_active,
    });

    // ✅ Normalize tanggal juga saat modal dibuka ulang
    useEffect(() => {
        if (open) {
            setData({
                name: schoolYear.name,
                is_active: schoolYear.is_active,
            });
        }
    }, [open, schoolYear]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.school-years.update', schoolYear.id), {
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
                    className="inline-flex items-center rounded px-2.5 py-1 text-xs font-medium transition hover:opacity-90"
                >
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Edit Tahun Ajaran
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
