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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { LibraryBig, Loader2 } from 'lucide-react';

interface SchoolYear {
    id: number;
    name: string;
    is_active: boolean;
}

export function AddStudentClassModal({
    schoolYears,
    teachers,
}: {
    schoolYears: SchoolYear[];
    teachers: any[];
}) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        school_year_id:
            schoolYears.find((y) => y.is_active)?.id ?? schoolYears[0]?.id ?? 0,
        teacher_id: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const submitData = { ...data };
        if (submitData.teacher_id === 'none') {
            submitData.teacher_id = '';
        }

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
                <Button className="gap-2">
                    <LibraryBig className="h-4 w-4" />
                    Tambah Kelas
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <LibraryBig className="h-5 w-5" />
                            </span>
                            Tambah Kelas Baru
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">
                            Lengkapi informasi di bawah untuk mendaftarkan kelas baru ke dalam sistem akademik.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-2">
                        {/* Nama Kelas */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                                Nama Kelas <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Cth: 10-A, Kelas 1A"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full focus-visible:ring-primary bg-background border-input"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Tahun Pelajaran */}
                        <div className="grid gap-2">
                            <Label htmlFor="school_year_id" className="text-sm font-semibold text-foreground">
                                Tahun Pelajaran <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.school_year_id ? data.school_year_id.toString() : ''}
                                onValueChange={(val) => setData('school_year_id', Number(val))}
                            >
                                <SelectTrigger className="w-full bg-background border-input focus:ring-primary">
                                    <SelectValue placeholder="Pilih Tahun Pelajaran" />
                                </SelectTrigger>
                                <SelectContent className="max-h-56">
                                    {schoolYears.map((y) => (
                                        <SelectItem key={y.id} value={y.id.toString()}>
                                            {y.name} {y.is_active ? '(Aktif)' : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.school_year_id} />
                        </div>

                        {/* Wali Kelas */}
                        <div className="grid gap-2">
                            <Label htmlFor="teacher_id" className="text-sm font-semibold text-foreground">
                                Wali Kelas (Opsional)
                            </Label>
                            <Select
                                value={data.teacher_id ? data.teacher_id.toString() : 'none'}
                                onValueChange={(val) => setData('teacher_id', val)}
                            >
                                <SelectTrigger className="w-full bg-background border-input focus:ring-primary">
                                    <SelectValue placeholder="Pilih Wali Kelas" />
                                </SelectTrigger>
                                <SelectContent className="max-h-56">
                                    <SelectItem value="none">-- Belum Ditentukan --</SelectItem>
                                    {teachers.map((t) => (
                                        <SelectItem key={t.id} value={t.id.toString()}>
                                            {t.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.teacher_id} />
                        </div>
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
                                'Simpan Kelas'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
