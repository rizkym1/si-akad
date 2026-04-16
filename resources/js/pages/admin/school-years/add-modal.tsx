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
import { CalendarPlus, Loader2 } from 'lucide-react';

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
                <Button className="gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    Tambah Tahun Ajaran
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <CalendarPlus className="h-5 w-5" />
                            </span>
                            Tambah Tahun Pelajaran
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">
                            Sistem akan mencatat tahun pelajaran baru yang akan digunakan untuk mengelompokkan kelas dan siswa.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-2">
                        {/* Nama Tahun Pelajaran */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-semibold">
                                Tahun Ajaran <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Cth: 2024/2025"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full focus-visible:ring-primary"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-start space-x-3 rounded-lg border border-border bg-muted/40 p-3 shadow-sm transition-colors hover:bg-muted/60">
                            <div className="flex h-6 items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary shadow-sm focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                                />
                            </div>
                            <div className="text-sm">
                                <Label htmlFor="is_active" className="cursor-pointer font-medium text-foreground">
                                    Jadikan Tahun Aktif
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Jika dicentang, ini akan mematikan status aktif di tahun ajaran lainnya.
                                </p>
                            </div>
                        </div>
                        <InputError message={errors.is_active} />
                    </div>

                    <DialogFooter className="mt-4 gap-2 pt-4 border-t border-border sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                            className="bg-transparent border-input hover:bg-muted"
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[100px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Data'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
