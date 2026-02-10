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

interface Student {
    id: number;
    full_name: string;
}

export function AddAttendanceModal({ students }: { students: Student[] }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: '',
        date: '',
        status: 'Absent',
        notes: '',
    });

    // Tidak perlu useEffect & fetch lagi ✅

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.attendances.store'), {
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
                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                    + Tambah Absensi
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Tambah Absensi Baru
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Isi form berikut untuk menambahkan data absensi baru
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Siswa */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="student_id"
                                className="text-foreground"
                            >
                                Siswa <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="student_id"
                                value={data.student_id}
                                onChange={(e) =>
                                    setData('student_id', e.target.value)
                                }
                                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:ring-primary"
                                required
                            >
                                <option value="">Pilih Siswa</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.full_name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.student_id}
                                className="mt-1"
                            />
                        </div>

                        {/* Tanggal */}
                        <div className="grid gap-2">
                            <Label htmlFor="date" className="text-foreground">
                                Tanggal <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData('date', e.target.value)
                                }
                                className="border-border bg-card focus:ring-primary"
                                required
                            />
                            <InputError
                                message={errors.date}
                                className="mt-1"
                            />
                        </div>

                        {/* Status */}
                        <div className="grid gap-2">
                            <Label htmlFor="status" className="text-foreground">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:ring-primary"
                                required
                            >
                                <option value="Present">Hadir</option>
                                <option value="Permitted">Izin</option>
                                <option value="Sick">Sakit</option>
                                <option value="Absent">Alpa</option>
                            </select>
                            <InputError
                                message={errors.status}
                                className="mt-1"
                            />
                        </div>

                        {/* Catatan */}
                        <div className="grid gap-2">
                            <Label htmlFor="notes" className="text-foreground">
                                Catatan
                            </Label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                rows={3}
                                placeholder="Catatan tambahan (opsional)"
                                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:ring-primary"
                            />
                            <InputError
                                message={errors.notes}
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
