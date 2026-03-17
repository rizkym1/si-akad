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
} from 'lucide-react';
import { useState } from 'react';
interface Event {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    type: 'holiday' | 'event';
    description: string | null;
}
interface PageProps {
    events: Event[];
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Beranda', href: '/dashboard' },
    { title: 'Kalender Pendidikan', href: '/admin/academic-calendars' },
];
export default function AcademicCalendarIndex({ events }: PageProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
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
    const getUserRole = () => {
        // @ts-ignore
        return usePage().props.auth?.user?.role;
    };
    const isAdmin = getUserRole() === 'admin';
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
                onSuccess: handleCloseModal,
            });
        } else {
            post('/admin/academic-calendars', { onSuccess: handleCloseModal });
        }
    };
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
            destroy(`/admin/academic-calendars/${id}`);
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kalender Pendidikan" />
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row">
                {/* ── Kiri: Box Kalender Grid ── */}
                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Header Kalender */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                <CalendarClock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 capitalize dark:text-gray-100">
                                {format(currentMonth, 'MMMM yyyy', {
                                    locale: id,
                                })}
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() =>
                                    setCurrentMonth(subMonths(currentMonth, 1))
                                }
                                className="rounded-lg border p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setCurrentMonth(new Date())}
                                className="rounded-lg border px-3 py-1 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                {' '}
                                Hari Ini{' '}
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentMonth(addMonths(currentMonth, 1))
                                }
                                className="rounded-lg border p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    {/* Grid Hari / Header */}
                    <div className="mb-1 grid grid-cols-7 gap-1 border-b pb-2 dark:border-gray-700">
                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
                            (day, index) => (
                                <div
                                    key={day}
                                    className={`py-1 text-center text-xs font-semibold ${index === 6 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
                                >
                                    {day}
                                </div>
                            ),
                        )}
                    </div>
                    {/* Grid Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => {
                            const dayEvents = getDayEvents(day);
                            const isCurrentMonth = isSameMonth(
                                day,
                                currentMonth,
                            );
                            const isToday = isSameDay(day, new Date());
                            const hasHoliday = dayEvents.some(
                                (e) => e.type === 'holiday',
                            );
                            const hasEvent = dayEvents.some(
                                (e) => e.type === 'event',
                            );
                            let cellClass =
                                'min-h-[70px] p-1.5 border rounded-lg flex flex-col items-start transition-all cursor-pointer relative dark:border-gray-700 ';
                            if (!isCurrentMonth)
                                cellClass +=
                                    'bg-gray-50 text-gray-400 dark:bg-gray-900/40 dark:text-gray-600 ';
                            else
                                cellClass +=
                                    'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 ';
                            if (isToday)
                                cellClass +=
                                    'ring-2 ring-blue-500 dark:ring-blue-400 ';
                            else if (hasHoliday)
                                cellClass +=
                                    'bg-red-50/70 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 ';
                            else if (hasEvent)
                                cellClass +=
                                    'bg-blue-50/70 hover:bg-blue-100 dark:bg-blue-900/10 dark:hover:bg-blue-900/20 ';
                            else if (isCurrentMonth)
                                cellClass +=
                                    'hover:bg-gray-50 dark:hover:bg-gray-700/50 ';
                            return (
                                <div
                                    key={idx}
                                    className={cellClass}
                                    onClick={() =>
                                        isAdmin &&
                                        handleOpenModal(undefined, day)
                                    }
                                >
                                    <span
                                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${isToday ? 'bg-blue-500 text-white' : idx % 7 === 6 || hasHoliday ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {format(day, 'd')}
                                    </span>

                                    {/* Events Dots/Lines */}
                                    <div className="mt-1 w-full space-y-0.5 overflow-hidden">
                                        {dayEvents
                                            .slice(0, 2)
                                            .map((e, index) => (
                                                <div
                                                    key={index}
                                                    className={`truncate rounded px-1 py-0.5 text-[9px] ${e.type === 'holiday' ? 'bg-red-200 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'}`}
                                                >
                                                    {e.title}
                                                </div>
                                            ))}
                                        {dayEvents.length > 2 && (
                                            <div className="text-center text-[8px] text-gray-400">
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
                <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:w-80 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md font-bold text-gray-900 dark:text-gray-100">
                            Daftar Agenda
                        </h3>
                        {isAdmin && (
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-1 rounded-md bg-blue-50 p-1 px-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                            >
                                <Plus className="h-3 w-3" /> Tambah
                            </button>
                        )}
                    </div>

                    {events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-400">
                            <CalendarDays className="mb-2 h-8 w-8 stroke-1" />
                            <p className="text-xs">
                                Belum ada agenda terdaftar
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
                            {events
                                .filter((e) =>
                                    isSameMonth(
                                        parseISO(e.start_date),
                                        currentMonth,
                                    ),
                                )
                                .map((e) => {
                                    const isHoliday = e.type === 'holiday';
                                    return (
                                        <div
                                            key={e.id}
                                            className="group relative flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span
                                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isHoliday ? 'bg-red-100 text-red-800 dark:bg-red-900/30' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30'}`}
                                                >
                                                    {isHoliday
                                                        ? 'Libur'
                                                        : 'Event'}
                                                </span>
                                                {isAdmin && (
                                                    <div className="flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
                                                        <button
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    e,
                                                                )
                                                            }
                                                            className="p-1 text-gray-500 hover:text-blue-600"
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    e.id,
                                                                )
                                                            }
                                                            className="p-1 text-gray-500 hover:text-red-500"
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm leading-tight font-semibold text-gray-900 dark:text-white">
                                                {e.title}
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                {format(
                                                    parseISO(e.start_date),
                                                    'dd MMM yyyy',
                                                )}{' '}
                                                s/d{' '}
                                                {format(
                                                    parseISO(e.end_date),
                                                    'dd MMM yyyy',
                                                )}
                                            </span>
                                            {e.description && (
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    {e.description}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                {/* ── Modal Form (Dialog) ── */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md animate-in rounded-2xl border border-gray-100 bg-white p-6 shadow-xl duration-200 zoom-in-95 fade-in dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-bold">
                                {editingEvent ? 'Edit Agenda' : 'Tambah Agenda'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Judul Agenda
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    'start_date',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium">
                                            Selesai
                                        </label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) =>
                                                setData(
                                                    'end_date',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Tipe
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData(
                                                'type',
                                                e.target.value as
                                                    | 'holiday'
                                                    | 'event',
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700"
                                    >
                                        <option value="event">Kegiatan</option>
                                        <option value="holiday">
                                            Hari Libur
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-full rounded-lg border py-2 text-sm text-gray-700"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            backgroundColor: '#0369a1',
                                            color: 'white',
                                        }}
                                        className="w-full rounded-lg py-2 text-sm font-semibold shadow-md"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
