import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, GraduationCap, School, Users, ChevronRight, Activity, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Utama',
        href: dashboard().url,
    },
];

interface DashboardProps {
    total_students: number;
    total_classes: number;
    total_teachers: number;
    total_subjects: number;
    students_by_gender: {
        male: number;
        female: number;
    };
    students_by_class: Array<{
        class_name: string;
        student_count: number;
    }>;
    recent_students: Array<{
        id: number;
        full_name: string;
        nisn: string;
        class_name: string | null;
        created_at: string;
    }>;
}

export default function Dashboard({
    total_students,
    total_classes,
    total_teachers,
    students_by_gender,
    students_by_class,
    recent_students,
}: DashboardProps) {
    const malePercent =
        total_students > 0
            ? Math.round((students_by_gender.male / total_students) * 100)
            : 0;
    const femalePercent =
        total_students > 0
            ? Math.round((students_by_gender.female / total_students) * 100)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Pusat" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {/* ── Welcome Header ── */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 text-primary/5">
                        <School className="w-64 h-64" />
                    </div>
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                            <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                                Selamat Datang di Pusat Kendali
                            </h1>
                            <p className="mt-1.5 flex items-center text-sm font-medium text-muted-foreground">
                                <Activity className="mr-1.5 h-4 w-4 text-emerald-500" />
                                Sistem Informasi Akademik berjalan stabil. Berikut ringkasan data hari ini.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Key Metrics Cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Total Siswa Terdaftar */}
                    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500/5 to-transparent"></div>
                        <div className="relative flex justify-between">
                            <div>
                                <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Total Peserta Didik
                                </p>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <h3 className="text-4xl font-black text-foreground">
                                        {total_students}
                                    </h3>
                                    <span className="text-sm font-medium text-muted-foreground">Siswa aktif</span>
                                </div>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Total Kelas */}
                    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/50 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-500/5 to-transparent"></div>
                        <div className="relative flex justify-between">
                            <div>
                                <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Rombongan Belajar
                                </p>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <h3 className="text-4xl font-black text-foreground">
                                        {total_classes}
                                    </h3>
                                    <span className="text-sm font-medium text-muted-foreground">Kelas Aktif</span>
                                </div>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                <School className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Total Guru */}
                    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-500/50 relative overflow-hidden sm:col-span-2 lg:col-span-1">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                        <div className="relative flex justify-between">
                            <div>
                                <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Tenaga Pendidik
                                </p>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <h3 className="text-4xl font-black text-foreground">
                                        {total_teachers}
                                    </h3>
                                    <span className="text-sm font-medium text-muted-foreground">Guru & Staf</span>
                                </div>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Charts & Breakdown ── */}
                <div className="grid gap-6 lg:grid-cols-2">
                    
                    {/* Demografi Jenis Kelamin */}
                    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-6 border-b border-border pb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                                <Users className="h-5 w-5 text-primary" />
                                Demografi Peserta Didik
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">Rasio komposisi jenis kelamin seluruh siswa aktif.</p>
                        </div>
                        
                        <div className="flex flex-1 items-center justify-center sm:justify-start gap-8 px-4 py-6">
                            <div className="relative flex h-32 w-32 items-center justify-center">
                                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                                    {/* Track */}
                                    <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="4" />
                                    {/* Laki-laki */}
                                    <circle
                                        cx="18" cy="18" r="15.9" fill="none"
                                        className="stroke-blue-500" strokeWidth="4"
                                        strokeDasharray={`${malePercent} ${100 - malePercent}`} strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-xl font-bold text-foreground">{malePercent}%</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground text-center line-clamp-1">Laki-laki</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-5 flex flex-col justify-center">
                                {/* Bar Laki-Laki */}
                                <div>
                                    <div className="mb-1.5 flex justify-between text-sm">
                                        <span className="flex items-center gap-2 font-semibold text-foreground">
                                            <span className="inline-block h-3 w-3 rounded bg-blue-500 shadow-sm border border-blue-600/20"></span>
                                            Laki-laki
                                        </span>
                                        <span className="font-bold text-foreground">
                                            {students_by_gender.male}
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${malePercent}%` }} />
                                    </div>
                                </div>
                                {/* Bar Perempuan */}
                                <div>
                                    <div className="mb-1.5 flex justify-between text-sm">
                                        <span className="flex items-center gap-2 font-semibold text-foreground">
                                            <span className="inline-block h-3 w-3 rounded bg-pink-500 shadow-sm border border-pink-600/20"></span>
                                            Perempuan
                                        </span>
                                        <span className="font-bold text-foreground">
                                            {students_by_gender.female}
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full rounded-full bg-pink-500 transition-all duration-1000 ease-out" style={{ width: `${femalePercent}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Persebaran per Kelas */}
                    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-4 border-b border-border pb-4 flex justify-between items-center w-full">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Distribusi Siswa per Kelas
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">Analisis kepadatan kelas aktif saat ini.</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[240px] pr-2 custom-scrollbar">
                            {students_by_class.length > 0 ? (
                                students_by_class.map((item, index) => {
                                    const pct = total_students > 0 ? Math.round((item.student_count / total_students) * 100) : 0;
                                    const colors = ['bg-primary', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
                                    const color = colors[index % colors.length];
                                    
                                    return (
                                        <div key={index} className="group">
                                            <div className="mb-1.5 flex items-center justify-between text-sm">
                                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {item.class_name}
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    {item.student_count} siswa ({pct}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                                <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex h-full items-center justify-center pt-10">
                                    <p className="text-sm font-medium text-muted-foreground">Belum ada distribusi kelas.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Recent Registrations ── */}
                <div className="rounded-2xl border border-border bg-card p-0 shadow-sm overflow-hidden">
                    <div className="border-b border-border bg-muted/20 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Daftar Pendaftaran Terkini</h3>
                            <p className="mt-1 text-sm text-muted-foreground">5 siswa terakhir yang dimasukkan ke basis data sistem.</p>
                        </div>
                        <Link href={route('admin.students.index')} className="shrink-0 text-sm font-semibold text-primary hover:text-primary/80 flex items-center">
                            Lihat Semua Data <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-foreground">
                            <thead className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4">Nomor Induk / NISN</th>
                                    <th className="px-6 py-4">Nama Lengkap Partisipan</th>
                                    <th className="px-6 py-4">Kelas Ditempati</th>
                                    <th className="px-6 py-4 text-right">Tanggal Registrasi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-background">
                                {recent_students.length > 0 ? (
                                    recent_students.map((student, index) => (
                                        <tr key={student.id} className="transition-colors hover:bg-muted/40 group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-mono text-sm font-medium text-foreground">{student.nisn}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-foreground group-hover:text-primary transition-colors">{student.full_name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.class_name ? (
                                                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground min-w-[max-content]">
                                                        {student.class_name}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                                                        Belum Alokasi
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right text-muted-foreground">
                                                {new Date(student.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center bg-background">
                                            <div className="text-sm font-medium text-muted-foreground">Belum ada catatan peserta didik terbaru.</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: var(--border); 
                    border-radius: 20px;
                }
            `}} />
        </AppLayout>
    );
}
