import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
    },
    {
        title: 'Detail Siswa',
        href: '/admin/students/show',
    },
];

function SectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-primary">{title}</h2>
            {children}
        </div>
    );
}

export default function ShowStudent({ student }: { student: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto max-w-3xl px-4 py-6 text-gray-900 sm:px-6 lg:px-8 dark:text-gray-100">
                        {/* Header dengan Foto */}
                        <div className="mb-8 flex items-center gap-6">
                            {student.photo ? (
                                <img
                                    src={`/storage/${student.photo}`}
                                    alt={student.full_name}
                                    className="h-32 w-32 rounded-full border-4 border-primary object-cover shadow-md"
                                />
                            ) : (
                                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary bg-gray-100 shadow-md dark:bg-gray-700">
                                    <span className="text-4xl text-gray-400">
                                        {student.full_name?.charAt(0) || '?'}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-primary">
                                    {student.full_name}
                                </h1>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                                    <span className="rounded bg-gray-100 px-2 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                        NISN: {student.nisn}
                                    </span>
                                    <span className="rounded bg-gray-100 px-2 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                        {student.student_class
                                            ? `${student.student_class.name} - ${student.student_class.academic_year}`
                                            : '-'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Data Siswa */}
                        <SectionCard title="Data Siswa">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Nama Lengkap
                                    </label>
                                    <p className="mt-1 font-semibold">
                                        {student.full_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Nama Panggilan
                                    </label>
                                    <p className="mt-1">{student.nickname}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        NISN
                                    </label>
                                    <p className="mt-1">{student.nisn}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Tempat Lahir
                                    </label>
                                    <p className="mt-1">
                                        {student.place_of_birth || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Tanggal Lahir
                                    </label>
                                    <p className="mt-1">
                                        {student.date_of_birth
                                            ? new Date(
                                                  student.date_of_birth,
                                              ).toLocaleDateString('id-ID', {
                                                  day: 'numeric',
                                                  month: 'long',
                                                  year: 'numeric',
                                              })
                                            : '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Jenis Kelamin
                                    </label>
                                    <p className="mt-1">
                                        {student.gender === 'male'
                                            ? 'Laki-laki'
                                            : student.gender === 'female'
                                              ? 'Perempuan'
                                              : '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Agama
                                    </label>
                                    <p className="mt-1">
                                        {student.religion || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Anak Ke
                                    </label>
                                    <p className="mt-1">
                                        {student.child_order || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Kelas
                                    </label>
                                    <p className="mt-1">
                                        {student.student_class
                                            ? `${student.student_class.name} - ${student.student_class.academic_year}`
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Data Orang Tua */}
                        <SectionCard title="Data Orang Tua">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Nama Ayah
                                    </label>
                                    <p className="mt-1">
                                        {student.father_name || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Nama Ibu
                                    </label>
                                    <p className="mt-1">
                                        {student.mother_name || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Pekerjaan Ayah
                                    </label>
                                    <p className="mt-1">
                                        {student.father_job || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Pekerjaan Ibu
                                    </label>
                                    <p className="mt-1">
                                        {student.mother_job || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        No Telp/HP
                                    </label>
                                    <p className="mt-1">
                                        {student.phone || '-'}
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Alamat Lengkap
                                    </label>
                                    <p className="mt-1">
                                        {student.address || '-'}
                                    </p>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Data Wali */}
                        {(student.guardian_name ||
                            student.guardian_job ||
                            student.guardian_address) && (
                            <SectionCard title="Data Wali">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Nama Wali
                                        </label>
                                        <p className="mt-1">
                                            {student.guardian_name || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Pekerjaan Wali
                                        </label>
                                        <p className="mt-1">
                                            {student.guardian_job || '-'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Alamat Lengkap Wali
                                        </label>
                                        <p className="mt-1">
                                            {student.guardian_address || '-'}
                                        </p>
                                    </div>
                                </div>
                            </SectionCard>
                        )}

                        {/* Tombol Aksi */}
                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                            <Link href={route('admin.students.index')}>
                                <Button variant="outline">Kembali</Button>
                            </Link>
                            <Link
                                href={route('admin.students.edit', student.id)}
                            >
                                <Button>Edit Data</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
