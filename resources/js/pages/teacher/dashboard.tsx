import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, Users } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Guru',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    totalClasses, 
    upcomingAgendas 
}: { 
    totalClasses: number;
    upcomingAgendas: any[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Guru" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Selamat Datang, Guru!
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Kelola data absensi harian dan periksa jadwal kegiatan pendidikan dari portal ini.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Kelas Anda
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">
                                {totalClasses}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Kelas yang diampu aktif
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Absensi Harian
                            </CardTitle>
                            <Users className="h-4 w-4 text-secondary-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Link href="/teacher/attendances" className="mt-2 inline-block rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80">
                                Isi Absensi Sekarang
                            </Link>
                            <p className="mt-2 text-xs text-muted-foreground">
                                Rekam kehadiran siswa harian.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Kalender Akademik
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <Link href="/teacher/academic-calendars" className="mt-2 inline-block rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Lihat Agenda
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Agenda Pendidikan Terdekat</CardTitle>
                            <CardDescription>Jadwal penting yang akan datang.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcomingAgendas.length > 0 ? (
                                <ul className="space-y-4">
                                    {upcomingAgendas.map((agenda, i) => (
                                        <li key={i} className="flex flex-col border-b border-border pb-3 last:border-0 last:pb-0">
                                            <span className="font-semibold text-foreground">{agenda.title}</span>
                                            <span className="text-xs text-muted-foreground mt-1">
                                                {new Date(agenda.start_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                            {agenda.type === 'holiday' && (
                                                <span className="mt-1 inline-flex w-max items-center rounded-sm bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-400">
                                                    Libur Resmi
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">Tidak ada agenda dalam waktu dekat.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
