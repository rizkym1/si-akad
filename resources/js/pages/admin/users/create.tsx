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
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '/admin/users',
    },
    {
        title: 'Tambah Baru',
        href: '/admin/users/create',
    },
];

export default function CreateUser() {
    const { translations, locale }: any = usePage().props;
    const queryParams = new URLSearchParams(window.location.search);
    const initialRole = queryParams.get('role') || 'guru';

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        role: string;
        nik: string;
        homeroom_teacher: string;
        gender: string;
        education: string;
        photo: File | null;
    }>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: initialRole,
        nik: '',
        homeroom_teacher: '',
        gender: '',
        education: '',
        photo: null,
    });

    // Helper to get back route based on role
    const getReturnRoute = (userRole: string) => {
        if (userRole === 'admin') return route('admin.admins.index');
        if (userRole === 'kepala_sekolah')
            return route('admin.principals.index');
        if (userRole === 'guru') return route('admin.teachers.index');
        return route('admin.users.index');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => router.get(getReturnRoute(data.role)),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto px-4 py-4 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <Label htmlFor="photo">Foto</Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            'photo',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    accept="image/*"
                                />
                                <InputError
                                    message={errors.photo}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="titlecase mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="titlecase mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="titlecase mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="titlecase mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="role">Peran</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) =>
                                        setData('role', value)
                                    }
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Pilih Peran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="guru">
                                            Guru
                                        </SelectItem>
                                        <SelectItem value="kepala_sekolah">
                                            Kepala Sekolah
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            {(data.role === 'guru' ||
                                data.role === 'kepala_sekolah') && (
                                <>
                                    <div className="mb-4">
                                        <Label htmlFor="nik">NIK</Label>
                                        <Input
                                            id="nik"
                                            type="text"
                                            name="nik"
                                            value={data.nik}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData('nik', e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.nik}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
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
                                                <SelectItem value="L">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="P">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Label htmlFor="education">
                                            Pendidikan
                                        </Label>
                                        <Input
                                            id="education"
                                            type="text"
                                            name="education"
                                            value={data.education}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    'education',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.education}
                                            className="mt-2"
                                        />
                                    </div>

                                    {data.role === 'guru' && (
                                        <div className="mb-4">
                                            <Label htmlFor="homeroom_teacher">
                                                Wali Kelas
                                            </Label>
                                            <Input
                                                id="homeroom_teacher"
                                                type="text"
                                                name="homeroom_teacher"
                                                value={data.homeroom_teacher}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        'homeroom_teacher',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.homeroom_teacher
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="mt-4 flex items-center justify-end gap-4">
                                <Link href={route('admin.users.index')}>
                                    <Button variant="outline">Batal</Button>
                                </Link>
                                <Button disabled={processing}>Simpan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
