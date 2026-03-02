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
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 border-b border-gray-100 pb-2 text-base font-bold text-primary dark:border-gray-700">
                {title}
            </h2>
            {children}
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div>
            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                {value || '-'}
            </p>
        </div>
    );
}

interface StudentClass {
    id: number;
    name: string;
    school_year: {
        id: number;
        name: string;
    } | null;
}

interface Student {
    id: number;
    nis: string | null;
    full_name: string;
    nickname: string | null;
    nisn: string;
    family_status: string | null;
    student_phone: string | null;
    student_address: string | null;
    previous_school: string | null;
    accepted_date: string | null;
    accepted_grade: string | null;
    place_of_birth: string | null;
    date_of_birth: string | null;
    gender: string | null;
    religion: string | null;
    child_order: number | null;
    photo: string | null;
    class_id: number | null;
    student_class: StudentClass | null;
    father_name: string | null;
    mother_name: string | null;
    phone: string | null;
    father_job: string | null;
    mother_job: string | null;
    // ← kolom alamat baru (terpisah)
    address_street: string | null;
    address_village: string | null;
    address_district: string | null;
    address_city: string | null;
    address_province: string | null;
    guardian_name: string | null;
    guardian_job: string | null;
    guardian_address: string | null;
}

export default function ShowStudent({ student }: { student: Student }) {
    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const genderLabel =
        student.gender === 'male'
            ? 'Laki-laki'
            : student.gender === 'female'
              ? 'Perempuan'
              : '-';

    const kelasLabel = student.student_class
        ? `${student.student_class.name} - ${student.student_class.school_year?.name ?? '-'}`
        : '-';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                        {/* ── Header Profil ── */}
                        <div className="mb-6 flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            {student.photo ? (
                                <img
                                    src={`/storage/${student.photo}`}
                                    alt={student.full_name}
                                    className="h-48 w-36 rounded-md border-4 border-primary object-cover shadow"
                                />
                            ) : (
                                <div className="flex h-48 w-36 items-center justify-center rounded-md border-4 border-primary bg-gray-100 shadow dark:bg-gray-700">
                                    <span className="text-5xl font-bold text-gray-400">
                                        {student.full_name?.charAt(0) || '?'}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-xl font-bold text-primary">
                                    {student.full_name}
                                </h1>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        NISN: {student.nisn}
                                    </span>
                                    <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                        {kelasLabel}
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                                            student.gender === 'male'
                                                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                                                : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                        }`}
                                    >
                                        {genderLabel}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ── Data Siswa ── */}
                        <SectionCard title="Data Siswa">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <InfoRow
                                    label="Nama Lengkap"
                                    value={student.full_name}
                                />
                                <InfoRow
                                    label="Nama Panggilan"
                                    value={student.nickname}
                                />
                                <InfoRow label="NISN" value={student.nisn} />
                                <InfoRow label="NIS" value={student.nis} />
                                <InfoRow
                                    label="Status Keluarga"
                                    value={student.family_status}
                                />
                                <InfoRow
                                    label="No. Telpon Siswa"
                                    value={student.student_phone}
                                />
                                <InfoRow
                                    label="Alamat Siswa"
                                    value={student.student_address}
                                />
                                <InfoRow
                                    label="Asal Sekolah"
                                    value={student.previous_school}
                                />
                                <InfoRow
                                    label="Tanggal Diterima"
                                    value={formatDate(student.accepted_date)}
                                />
                                <InfoRow
                                    label="Diterima di Kelas"
                                    value={student.accepted_grade}
                                />
                                <InfoRow
                                    label="Tempat Lahir"
                                    value={student.place_of_birth}
                                />
                                <InfoRow
                                    label="Tanggal Lahir"
                                    value={formatDate(student.date_of_birth)}
                                />
                                <InfoRow
                                    label="Jenis Kelamin"
                                    value={genderLabel}
                                />
                                <InfoRow
                                    label="Agama"
                                    value={student.religion}
                                />
                                <InfoRow
                                    label="Anak Ke"
                                    value={student.child_order?.toString()}
                                />
                                <InfoRow label="Kelas" value={kelasLabel} />
                            </div>
                        </SectionCard>

                        {/* ── Data Orang Tua ── */}
                        <SectionCard title="Data Orang Tua">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                                <InfoRow
                                    label="Nama Ayah"
                                    value={student.father_name}
                                />
                                <InfoRow
                                    label="Nama Ibu"
                                    value={student.mother_name}
                                />
                                <InfoRow
                                    label="Pekerjaan Ayah"
                                    value={student.father_job}
                                />
                                <InfoRow
                                    label="Pekerjaan Ibu"
                                    value={student.mother_job}
                                />
                                <InfoRow
                                    label="No Telp / HP"
                                    value={student.phone}
                                />
                                <div className="col-span-2 mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                                    <p className="mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                                        Alamat Lengkap Orang Tua
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                        <InfoRow
                                            label="Dusun / Jalan"
                                            value={student.address_street}
                                        />
                                        <InfoRow
                                            label="Kelurahan / Desa"
                                            value={student.address_village}
                                        />
                                        <InfoRow
                                            label="Kecamatan"
                                            value={student.address_district}
                                        />
                                        <InfoRow
                                            label="Kabupaten / Kota"
                                            value={student.address_city}
                                        />
                                        <InfoRow
                                            label="Provinsi"
                                            value={student.address_province}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SectionCard>

                        {/* ── Data Wali ── */}
                        {(student.guardian_name ||
                            student.guardian_job ||
                            student.guardian_address) && (
                            <SectionCard title="Data Wali">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoRow
                                        label="Nama Wali"
                                        value={student.guardian_name}
                                    />
                                    <InfoRow
                                        label="Pekerjaan Wali"
                                        value={student.guardian_job}
                                    />
                                    <InfoRow
                                        label="Status Keluarga"
                                        value={student.family_status}
                                    />
                                    <div className="col-span-2">
                                        <InfoRow
                                            label="Alamat Wali"
                                            value={student.guardian_address}
                                        />
                                    </div>
                                </div>
                            </SectionCard>
                        )}

                        {/* ── Tombol Aksi ── */}
                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <Link href={route('admin.students.index')}>
                                <Button variant="outline">← Kembali</Button>
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
