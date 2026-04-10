import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    parseISO,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { id } from 'date-fns/locale';
import {
    CalendarClock,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Edit,
    Plus,
    Trash,
    Info,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
import { DeleteDialog } from '@/components/ui/delete-dialog';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Event {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    type: 'holiday' | 'event';
    description: string | null;
}

interface PageProps extends Record<string, unknown> {
    events: Event[];
    auth: {
        user: {
            role: string;
        };
    };
    flash: {
        success: string | null;
        error: string | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Beranda', href: '/dashboard' },
    { title: 'Kalender Pendidikan', href: '/admin/academic-calendars' },
];

export default function AcademicCalendarIndex({ events }: PageProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [showFlash, setShowFlash] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        title: '',
        start_date: '',
        end_date: '',
        type: 'event' as 'holiday' | 'event',
        description: '',
    });

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const isAdmin = auth.user?.role === 'admin';
    // ── helpers format date ──-
    const formatToYMD = (date: Date) => format(date, 'yyyy-MM-dd');
    const handleOpenModal = (event?: Event, initialDate?: Date) => {
        if (!isAdmin) return;
        clearErrors();
        if (event) {
            setEditingEvent(event);
            setData({
                title: event.title,
                start_date: event.start_date.substring(0, 10),
                end_date: event.end_date.substring(0, 10),
                type: event.type,
                description: event.description || '',
            });
        } else {
            setEditingEvent(null);
            reset();
            if (initialDate) {
                const ymd = formatToYMD(initialDate);
                setData((d) => ({ ...d, start_date: ymd, end_date: ymd }));
            }
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEvent) {
            put(`/admin/academic-calendars/${editingEvent.id}`, {
                onSuccess: () => {
                    handleCloseModal();
                },
            });
        } else {
            post('/admin/academic-calendars', {
                onSuccess: () => {
                    handleCloseModal();
                },
            });
        }
    };

    // ── Calendar Logic Helpers ──
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Senin
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const getDayEvents = (day: Date) => {
        return events.filter((event) => {
            const start = parseISO(event.start_date.substring(0, 10));
            const end = parseISO(event.end_date.substring(0, 10));
            return (
                isWithinInterval(day, { start, end }) || isSameDay(day, start)
            );
        });
    };

    // Improved Filtering: Show events that are active during the current month
    const currentMonthEvents = events.filter((e) => {
        const start = parseISO(e.start_date.substring(0, 10));
        const end = parseISO(e.end_date.substring(0, 10));
        return (
            isSameMonth(start, currentMonth) ||
            isSameMonth(end, currentMonth) ||
            (start < monthStart && end > monthEnd)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kalender Pendidikan" />
            
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6">

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* ── Kiri: Box Kalender Grid ── */}
                    <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        {/* Header Kalender */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-primary/10 p-2.5 dark:bg-primary/20">
                                    <CalendarClock className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 capitalize dark:text-gray-100">
                                    {format(currentMonth, 'MMMM yyyy', {
                                        locale: id,
                                    })}
                                </h2>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-xl border bg-gray-50/50 p-1 dark:border-gray-700 dark:bg-gray-900/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                    className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-gray-800"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentMonth(new Date())}
                                    className="h-8 px-3 text-xs font-semibold hover:bg-white dark:hover:bg-gray-800"
                                >
                                    Hari Ini
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-gray-800"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Grid Hari / Header */}
                        <div className="mb-2 grid grid-cols-7 gap-1">
                            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
                                (day, index) => (
                                    <div
                                        key={day}
                                        className={`py-2 text-center text-xs font-bold uppercase tracking-wider ${index === 6 ? 'text-destructive' : 'text-gray-400 dark:text-gray-500'}`}
                                    >
                                        {day}
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Grid Days */}
                        <div className="grid grid-cols-7 gap-2">
                            {days.map((day, idx) => {
                                const dayEvents = getDayEvents(day);
                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                const isToday = isSameDay(day, new Date());
                                const hasHoliday = dayEvents.some((e) => e.type === 'holiday');
                                const hasEvent = dayEvents.some((e) => e.type === 'event');

                                return (
                                    <div
                                        key={idx}
                                        className={`group relative flex min-h-[85px] flex-col items-start rounded-xl border p-2 transition-all hover:shadow-md dark:border-gray-700/50 ${
                                            !isCurrentMonth
                                                ? 'bg-gray-50/50 opacity-40 dark:bg-gray-900/20'
                                                : isToday
                                                ? 'border-primary/30 bg-primary/5 ring-1 ring-primary dark:bg-primary/10'
                                                : hasHoliday
                                                ? 'border-destructive/20 bg-destructive/5 hover:bg-destructive/10 dark:bg-destructive/5'
                                                : hasEvent
                                                ? 'border-primary/20 bg-primary/5 hover:bg-primary/10 dark:bg-primary/5'
                                                : 'bg-white hover:border-gray-200 dark:bg-gray-800/40 dark:hover:border-gray-600'
                                        } ${isAdmin ? 'cursor-pointer' : ''}`}
                                        onClick={() => isAdmin && handleOpenModal(undefined, day)}
                                    >
                                        <span
                                            className={`mb-1 flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                                                isToday
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : idx % 7 === 6 || hasHoliday
                                                    ? 'text-destructive'
                                                    : isCurrentMonth
                                                    ? 'text-gray-700 dark:text-gray-300'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {format(day, 'd')}
                                        </span>

                                        <div className="flex w-full flex-col gap-1">
                                            {dayEvents.slice(0, 2).map((e, index) => (
                                                <div
                                                    key={index}
                                                    className={`truncate rounded-md px-1.5 py-0.5 text-[9px] font-medium leading-tight ${
                                                        e.type === 'holiday'
                                                            ? 'bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground'
                                                            : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                                                    }`}
                                                >
                                                    {e.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="px-1 text-[8px] font-medium text-gray-400 dark:text-gray-500">
                                                    +{dayEvents.length - 2} lagi
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Kanan: Log Agenda Panel ── */}
                    <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:w-80 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between border-b pb-4 dark:border-gray-700">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                    Daftar Agenda
                                </h3>
                                <p className="text-[10px] text-gray-500">Periode saat ini</p>
                            </div>
                            {isAdmin && (
                                <Button
                                    size="sm"
                                    onClick={() => handleOpenModal()}
                                    className="h-8 gap-1 rounded-lg bg-primary px-3 text-[11px] font-bold hover:bg-primary/90"
                                >
                                    <Plus className="h-3 w-3" /> Tambah
                                </Button>
                            )}
                        </div>

                        <div className="flex max-h-[500px] flex-col gap-3 overflow-y-auto pr-1">
                            {currentMonthEvents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="mb-3 rounded-full bg-gray-50 p-3 dark:bg-gray-900/50">
                                        <CalendarDays className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                                    </div>
                                    <p className="text-xs font-medium text-gray-400">
                                        Belum ada agenda terdaftar
                                    </p>
                                </div>
                            ) : (
                                currentMonthEvents.map((e) => {
                                    const isHoliday = e.type === 'holiday';
                                    return (
                                        <div
                                            key={e.id}
                                            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50/30 p-3 transition-all hover:border-gray-200 hover:bg-white dark:border-gray-700/50 dark:bg-gray-900/20 dark:hover:border-gray-600 dark:hover:bg-gray-800/40"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <span
                                                        className={`w-fit rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                                            isHoliday
                                                                ? 'bg-destructive/10 text-destructive'
                                                                : 'bg-primary/10 text-primary'
                                                        }`}
                                                    >
                                                        {isHoliday ? 'Hari Libur' : 'Kegiatan'}
                                                    </span>
                                                    <h4 className="text-xs font-bold leading-snug text-gray-900 dark:text-white">
                                                        {e.title}
                                                    </h4>
                                                    <p className="text-[10px] font-medium text-gray-400">
                                                        {format(parseISO(e.start_date.substring(0,10)), 'dd MMM yyyy')} 
                                                        {e.start_date !== e.end_date && ` - ${format(parseISO(e.end_date.substring(0,10)), 'dd MMM yyyy')}`}
                                                    </p>
                                                </div>

                                                {isAdmin && (
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-lg text-gray-400 hover:text-primary dark:hover:text-primary"
                                                            onClick={() => handleOpenModal(e)}
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <DeleteDialog
                                                            title="Hapus Agenda"
                                                            description={`Apakah Anda yakin ingin menghapus agenda "${e.title}"?`}
                                                            onConfirm={() => destroy(`/admin/academic-calendars/${e.id}`)}
                                                            trigger={
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                                >
                                                                    <Trash className="h-3.5 w-3.5" />
                                                                </Button>
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {e.description && (
                                                <p className="mt-2 line-clamp-2 border-t pt-2 text-[10px] leading-relaxed text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                                    {e.description}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Modal Form (Dialog) ── */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-foreground">
                                {editingEvent ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Isi informasi agenda kalender pendidikan dengan lengkap.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-foreground">
                                    Judul Agenda <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    placeholder="Contoh: Libur Akhir Semester"
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="border-border bg-card focus:ring-primary"
                                    required
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start_date" className="text-foreground">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="border-border bg-card focus:ring-primary"
                                        required
                                    />
                                    <InputError message={errors.start_date} className="mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="end_date" className="text-foreground">
                                        Tanggal Selesai <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="border-border bg-card focus:ring-primary"
                                        required
                                    />
                                    <InputError message={errors.end_date} className="mt-1" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="type" className="text-foreground">
                                    Tipe Agenda <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) => setData('type', value as 'holiday' | 'event')}
                                >
                                    <SelectTrigger className="border-border bg-card focus:ring-primary">
                                        <SelectValue placeholder="Pilih tipe agenda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="event">Kegiatan Akademik</SelectItem>
                                        <SelectItem value="holiday">Hari Libur Resmi</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} className="mt-1" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-foreground">
                                    Deskripsi (Opsional)
                                </Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tambahkan keterangan tambahan jika ada..."
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
