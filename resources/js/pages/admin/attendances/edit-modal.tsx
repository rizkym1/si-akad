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

interface Attendance {
    id: number;
    student_id: number;
    date: string;
    status: string;
    notes: string | null;
    student: Student;
}

function normalizeDateString(s: string | null | undefined): string {
    if (!s) return '';
    // Ambil 10 char pertama (YYYY-MM-DD) jika ada waktu/ISO
    // '2026-02-09 00:00:00' -> '2026-02-09'
    // '2026-02-09T00:00:00.000Z' -> '2026-02-09'
    return s.slice(0, 10);
}

export function EditAttendanceModal({
    attendance,
    students,
}: {
    attendance: Attendance;
    students: Student[];
}) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        student_id: attendance.student_id.toString(),
        date: normalizeDateString(attendance.date),
        status: attendance.status,
        notes: attendance.notes ?? '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.attendances.update', attendance.id), {
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
                            Edit Absensi
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Ubah data absensi pada form berikut
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Siswa */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="edit_student_id"
                                className="text-foreground"
                            >
                                Siswa <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="edit_student_id"
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
                            <Label
                                htmlFor="edit_date"
                                className="text-foreground"
                            >
                                Tanggal <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit_date"
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
                            <Label
                                htmlFor="edit_status"
                                className="text-foreground"
                            >
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="edit_status"
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
                            <Label
                                htmlFor="edit_notes"
                                className="text-foreground"
                            >
                                Catatan
                            </Label>
                            <textarea
                                id="edit_notes"
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
                            {processing ? 'Menyimpan...' : 'Perbarui'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
