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

// ✅ Update interface: school_year sekarang object dari relasi
interface StudentClass {
    id: number;
    name: string;
    school_year_id: number | null;
    school_year: {
        id: number;
        name: string;
    } | null;
}

function FormSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-8 pt-6 first:pt-0">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h2>
            {children}
        </div>
    );
}

export default function CreateStudent({
    student_classes,
    parents,
}: {
    student_classes: StudentClass[];
    parents: { id: number; name: string; email: string }[];
}) {
    const { data, setData, post, processing, errors } = useForm<{
        nis: string;
        full_name: string;
        nickname: string;
        nisn: string;
        place_of_birth: string;
        date_of_birth: string;
        gender: string;
        religion: string;
        family_status: string;
        child_order: string;
        photo: File | null;
        class_id: string;
        student_phone: string;
        student_address: string;
        previous_school: string;
        accepted_date: string;
        father_name: string;
        mother_name: string;
        phone: string;
        father_job: string;
        mother_job: string;
        address_street: string;
        address_village: string;
        address_district: string;
        address_city: string;
        address_province: string;
        address: string;
        guardian_name: string;
        guardian_job: string;
        guardian_address: string;
        user_id: string;
    }>({
        nis: '',
        full_name: '',
        nickname: '',
        nisn: '',
        place_of_birth: '',
        date_of_birth: '',
        gender: '',
        religion: '',
        family_status: '',
        child_order: '',
        photo: null,
        class_id: '',
        student_phone: '',
        student_address: '',
        previous_school: '',
        accepted_date: '',
        father_name: '',
        mother_name: '',
        phone: '',
        father_job: '',
        mother_job: '',
        address_street: '',
        address_village: '',
        address_district: '',
        address_city: '',
        address_province: '',
        address: '',
        guardian_name: '',
        guardian_job: '',
        guardian_address: '',
        user_id: '',
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
            forceFormData: true,
            onSuccess: () => router.visit(route('admin.students.index')),
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
                            {/* Data Siswa */}
                            <FormSection title="Data Siswa">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <Label htmlFor="nis">NIS</Label>
                                        <Input
                                            id="nis"
                                            type="text"
                                            value={data.nis}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData('nis', e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.nis}
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
                                        <Label htmlFor="family_status">
                                            Status Keluarga
                                        </Label>
                                        <Select
                                            value={data.family_status}
                                            onValueChange={(value) =>
                                                setData('family_status', value)
                                            }
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Pilih Status Keluarga" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Anak Kandung">
                                                    Anak Kandung
                                                </SelectItem>
                                                <SelectItem value="Anak Tiri">
                                                    Anak Tiri
                                                </SelectItem>
                                                <SelectItem value="Anak Angkat">
                                                    Anak Angkat
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.family_status}
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
                                        <Label htmlFor="student_phone">
                                            No. Telp / HP Siswa
                                        </Label>
                                        <Input
                                            id="student_phone"
                                            type="text"
                                            value={data.student_phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'student_phone',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.student_phone}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-3">
                                        <Label htmlFor="student_address">
                                            Alamat Lengkap Siswa
                                        </Label>
                                        <textarea
                                            id="student_address"
                                            name="student_address"
                                            value={data.student_address}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                            rows={3}
                                            onChange={(e) =>
                                                setData(
                                                    'student_address',
                                                    e.target.value,
                                                )
                                            }
                                        ></textarea>
                                        <InputError
                                            message={errors.student_address}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="previous_school">
                                            Asal Sekolah
                                        </Label>
                                        <Input
                                            id="previous_school"
                                            type="text"
                                            value={data.previous_school}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'previous_school',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.previous_school}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="accepted_date">
                                            Tanggal Diterima
                                        </Label>
                                        <Input
                                            id="accepted_date"
                                            type="date"
                                            value={data.accepted_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'accepted_date',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.accepted_date}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="class_id">
                                            Kelas Saat Ini
                                        </Label>
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
                                                                {/* ✅ Akses .name dari relasi school_year */}
                                                                {item.name} -{' '}
                                                                {item
                                                                    .school_year
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

                                    <div className="mt-2 border-t border-gray-100 pt-4 md:col-span-2 lg:col-span-3 dark:border-gray-800">
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
                            </FormSection>

                            {/* Data Orang Tua */}
                            <FormSection title="Data Orang Tua">
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

                                    {/* ── Pilih Akun Orang Tua ── */}
                                    <div className="md:col-span-2 rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
                                        <Label htmlFor="user_id" className="text-blue-700 dark:text-blue-400 font-semibold mb-2 block">
                                            Hubungkan dengan Akun Orang Tua (Opsional)
                                        </Label>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Pilih akun pengguna agar orang tua dapat melihat data dan nilai siswa ini melalui dashboard mereka.
                                        </p>
                                        <Select
                                            value={data.user_id || 'none'}
                                            onValueChange={(value) =>
                                                setData('user_id', value === 'none' ? '' : value)
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white dark:bg-gray-900">
                                                <SelectValue placeholder="Pilih Akun Orang Tua (Pencarian nama/email)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">-- Tidak dihubungkan --</SelectItem>
                                                {parents.map((parent) => (
                                                    <SelectItem key={parent.id} value={parent.id.toString()}>
                                                        {parent.name} ({parent.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.user_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* ── Akhir Pilih Akun Orang Tua ── */}

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

                                    {/* ── Alamat Orang Tua ── */}
                                    <div className="md:col-span-2">
                                        <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400">
                                            Alamat Orang Tua
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {/* a. Dusun/Jalan */}
                                            <div className="md:col-span-2 lg:col-span-3">
                                                <Label htmlFor="address_street">
                                                    Dusun / Jalan
                                                </Label>
                                                <Input
                                                    id="address_street"
                                                    type="text"
                                                    placeholder="Contoh: Dusun Sirnagalih RT 38 RW 18"
                                                    value={data.address_street}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'address_street',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.address_street
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* b. Kelurahan/Desa */}
                                            <div>
                                                <Label htmlFor="address_village">
                                                    Kelurahan / Desa
                                                </Label>
                                                <Input
                                                    id="address_village"
                                                    type="text"
                                                    placeholder="Contoh: Gunungcupu"
                                                    value={data.address_village}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'address_village',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.address_village
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* c. Kecamatan */}
                                            <div>
                                                <Label htmlFor="address_district">
                                                    Kecamatan
                                                </Label>
                                                <Input
                                                    id="address_district"
                                                    type="text"
                                                    placeholder="Contoh: Sindangkasih"
                                                    value={
                                                        data.address_district
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'address_district',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.address_district
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* d. Kabupaten/Kota */}
                                            <div>
                                                <Label htmlFor="address_city">
                                                    Kabupaten / Kota
                                                </Label>
                                                <Input
                                                    id="address_city"
                                                    type="text"
                                                    placeholder="Contoh: Ciamis"
                                                    value={data.address_city}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'address_city',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.address_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* e. Provinsi */}
                                            <div>
                                                <Label htmlFor="address_province">
                                                    Provinsi
                                                </Label>
                                                <Input
                                                    id="address_province"
                                                    type="text"
                                                    placeholder="Contoh: Jawa Barat"
                                                    value={
                                                        data.address_province
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'address_province',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.address_province
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FormSection>

                            {/* Data Wali */}
                            <FormSection title="Data Wali">
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
                            </FormSection>

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
