import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
    {
        title: 'Edit Siswa',
        href: '/admin/students/edit',
    },
];

export default function EditStudent({
    student,
    student_classes,
}: {
    student: any;
    student_classes: Array<{ id: number; name: string; academic_year: string }>;
}) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        full_name: string;
        nickname: string;
        nisn: string;
        place_of_birth: string;
        date_of_birth: string;
        gender: string;
        religion: string;
        child_order: string;
        photo: File | null;
        class_id: number | null;
        father_name: string;
        mother_name: string;
        phone: string;
        father_job: string;
        mother_job: string;
        address: string;
        guardian_name: string;
        guardian_job: string;
        guardian_address: string;
        _method: string;
    }>({
        full_name: student.full_name || '',
        nickname: student.nickname || '',
        nisn: student.nisn || '',
        place_of_birth: student.place_of_birth || '',
        date_of_birth: student.date_of_birth || '',
        gender: student.gender || '',
        religion: student.religion || '',
        child_order: student.child_order || '',
        photo: null,
        class_id: student.class_id || null,
        father_name: student.father_name || '',
        mother_name: student.mother_name || '',
        phone: student.phone || '',
        father_job: student.father_job || '',
        mother_job: student.mother_job || '',
        address: student.address || '',
        guardian_name: student.guardian_name || '',
        guardian_job: student.guardian_job || '',
        guardian_address: student.guardian_address || '',
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.students.update', student.id), {
            onSuccess: () => router.get(route('admin.students.index')),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                            {/* Data Siswa */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Data Siswa
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <Label htmlFor="full_name">
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            name="full_name"
                                            value={data.full_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'full_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.full_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nickname">
                                            Nama Panggilan
                                        </Label>
                                        <Input
                                            id="nickname"
                                            type="text"
                                            name="nickname"
                                            value={data.nickname}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'nickname',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nickname}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nisn">NISN</Label>
                                        <Input
                                            id="nisn"
                                            type="text"
                                            name="nisn"
                                            value={data.nisn}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData('nisn', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.nisn}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="place_of_birth">
                                            Tempat Lahir
                                        </Label>
                                        <Input
                                            id="place_of_birth"
                                            type="text"
                                            name="place_of_birth"
                                            value={data.place_of_birth}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'place_of_birth',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.place_of_birth}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="date_of_birth">
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            id="date_of_birth"
                                            type="date"
                                            name="date_of_birth"
                                            value={data.date_of_birth}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'date_of_birth',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.date_of_birth}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="gender">
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            value={data.gender}
                                            onValueChange={(value) =>
                                                setData('gender', value)
                                            }
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="religion">Agama</Label>
                                        <Select
                                            value={data.religion}
                                            onValueChange={(value) =>
                                                setData('religion', value)
                                            }
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Pilih Agama" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Islam">
                                                    Islam
                                                </SelectItem>
                                                <SelectItem value="Kristen">
                                                    Kristen
                                                </SelectItem>
                                                <SelectItem value="Katolik">
                                                    Katolik
                                                </SelectItem>
                                                <SelectItem value="Hindu">
                                                    Hindu
                                                </SelectItem>
                                                <SelectItem value="Buddha">
                                                    Buddha
                                                </SelectItem>
                                                <SelectItem value="Konghucu">
                                                    Konghucu
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.religion}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="child_order">
                                            Anak Ke
                                        </Label>
                                        <Input
                                            id="child_order"
                                            type="number"
                                            name="child_order"
                                            value={data.child_order}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'child_order',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.child_order}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="class_id">Kelas</Label>
                                        <Select
                                            value={
                                                data.class_id?.toString() || '0'
                                            }
                                            onValueChange={(value) => {
                                                const numValue =
                                                    parseInt(value);
                                                setData(
                                                    'class_id',
                                                    numValue === 0
                                                        ? null
                                                        : numValue,
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">
                                                    Tidak ada kelas
                                                </SelectItem>
                                                {student_classes.length > 0 ? (
                                                    student_classes.map(
                                                        (item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id.toString()}
                                                            >
                                                                {item.name} -{' '}
                                                                {
                                                                    item.academic_year
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )
                                                ) : (
                                                    <SelectItem
                                                        value="no-data"
                                                        disabled
                                                    >
                                                        Belum ada data kelas
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.class_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-3">
                                        <Label htmlFor="photo">
                                            Foto Siswa (Kosongkan jika tidak
                                            diubah)
                                        </Label>

                                        <div className="mt-2 mb-4 flex items-center gap-4">
                                            {/* Preview Foto */}
                                            <div className="h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                                                {photoPreview ? (
                                                    <img
                                                        src={photoPreview}
                                                        alt="Preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : student.photo ? (
                                                    <img
                                                        src={`/storage/${student.photo}`}
                                                        alt="Current"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                        No Photo
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input File */}
                                            <div className="flex-1">
                                                <Input
                                                    id="photo"
                                                    type="file"
                                                    name="photo"
                                                    className="block w-full"
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target
                                                                .files?.[0] ||
                                                            null;
                                                        setData('photo', file);

                                                        if (file) {
                                                            const reader =
                                                                new FileReader();
                                                            reader.onloadend =
                                                                () => {
                                                                    setPhotoPreview(
                                                                        reader.result as string,
                                                                    );
                                                                };
                                                            reader.readAsDataURL(
                                                                file,
                                                            );
                                                        } else {
                                                            setPhotoPreview(
                                                                null,
                                                            );
                                                        }
                                                    }}
                                                    accept="image/*"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Format: JPG, PNG. Maksimal
                                                    2MB.
                                                </p>
                                            </div>
                                        </div>

                                        <InputError
                                            message={errors.photo}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Data Orang Tua */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Data Orang Tua
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="father_name">
                                            Nama Ayah
                                        </Label>
                                        <Input
                                            id="father_name"
                                            type="text"
                                            value={data.father_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'father_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.father_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="mother_name">
                                            Nama Ibu
                                        </Label>
                                        <Input
                                            id="mother_name"
                                            type="text"
                                            value={data.mother_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'mother_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.mother_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="father_job">
                                            Pekerjaan Ayah
                                        </Label>
                                        <Input
                                            id="father_job"
                                            type="text"
                                            value={data.father_job}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'father_job',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.father_job}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="mother_job">
                                            Pekerjaan Ibu
                                        </Label>
                                        <Input
                                            id="mother_job"
                                            type="text"
                                            value={data.mother_job}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'mother_job',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.mother_job}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">
                                            No Telp/HP
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="text"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="address">
                                            Alamat Lengkap
                                        </Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Data Wali */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Data Wali
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <Label htmlFor="guardian_name">
                                            Nama Wali
                                        </Label>
                                        <Input
                                            id="guardian_name"
                                            type="text"
                                            value={data.guardian_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.guardian_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="guardian_job">
                                            Pekerjaan Wali
                                        </Label>
                                        <Input
                                            id="guardian_job"
                                            type="text"
                                            value={data.guardian_job}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_job',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.guardian_job}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-1">
                                        <Label htmlFor="guardian_address">
                                            Alamat Lengkap Wali
                                        </Label>
                                        <Input
                                            id="guardian_address"
                                            type="text"
                                            value={data.guardian_address}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_address',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.guardian_address}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tombol */}
                            <div className="mt-6 flex items-center justify-end gap-4">
                                <Link href={route('admin.students.index')}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    Perbarui
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
