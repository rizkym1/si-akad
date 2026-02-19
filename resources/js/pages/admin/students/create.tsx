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
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
    {
        title: 'Tambah Baru',
        href: '/admin/students/create',
    },
];

// ✅ Update interface: academic_year sekarang object dari relasi
interface StudentClass {
    id: number;
    name: string;
    academic_year_id: number | null;
    academic_year: {
        id: number;
        name: string;
    } | null;
}

export default function CreateStudent({
    student_classes,
}: {
    student_classes: StudentClass[];
}) {
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
        class_id: string;
        father_name: string;
        mother_name: string;
        phone: string;
        father_job: string;
        mother_job: string;
        address: string;
        guardian_name: string;
        guardian_job: string;
        guardian_address: string;
    }>({
        full_name: '',
        nickname: '',
        nisn: '',
        place_of_birth: '',
        date_of_birth: '',
        gender: '',
        religion: '',
        child_order: '',
        photo: null,
        class_id: '',
        father_name: '',
        mother_name: '',
        phone: '',
        father_job: '',
        mother_job: '',
        address: '',
        guardian_name: '',
        guardian_job: '',
        guardian_address: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                formData.append(key, value as any);
            }
        });

        post(route('admin.students.store'), {
            onSuccess: () => router.get(route('admin.students.index')),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Siswa" />
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
                                            required
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
                                            required
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
                                            required
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
                                                data.class_id?.toString() || ''
                                            }
                                            onValueChange={(value) =>
                                                setData('class_id', value)
                                            }
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {student_classes.length > 0 ? (
                                                    student_classes.map(
                                                        (item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id.toString()}
                                                            >
                                                                {/* ✅ Akses .name dari relasi academicYear */}
                                                                {item.name} -{' '}
                                                                {item
                                                                    .academic_year
                                                                    ?.name ??
                                                                    '-'}
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
                                        <Label htmlFor="photo">Foto</Label>
                                        <Input
                                            id="photo"
                                            type="file"
                                            name="photo"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'photo',
                                                    e.target.files?.[0] || null,
                                                )
                                            }
                                            accept="image/*"
                                        />
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
                                            name="father_name"
                                            value={data.father_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'father_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
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
                                            name="mother_name"
                                            value={data.mother_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'mother_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
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
                                            name="father_job"
                                            value={data.father_job}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'father_job',
                                                    e.target.value,
                                                )
                                            }
                                            required
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
                                            name="mother_job"
                                            value={data.mother_job}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'mother_job',
                                                    e.target.value,
                                                )
                                            }
                                            required
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
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            required
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
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            required
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
                                            name="guardian_name"
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
                                            name="guardian_job"
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
                                            name="guardian_address"
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
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
