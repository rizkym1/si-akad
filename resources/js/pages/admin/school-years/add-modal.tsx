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

export function AddSchoolYearModal() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        is_active: false as boolean,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.school-years.store'), {
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
                    + Tambah Tahun Ajaran
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Tambah Tahun Ajaran Baru
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Isi form berikut untuk menambahkan tahun Ajaran baru
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Nama Tahun Pelajaran */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-foreground">
                                Tahun Ajaran{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
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
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.checked)
                                }
                                className="h-4 w-4 rounded text-blue-600"
                            />
                            <Label
                                htmlFor="is_active"
                                className="cursor-pointer text-foreground"
                            >
                                Jadikan Tahun Ajaran Aktif
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
