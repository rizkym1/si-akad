import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    CalendarCheck,
    Folder,
    LayoutGrid,
    School,
    User2,
    UserCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Manajemen Pengguna',
        href: '#',
        icon: User2,
        isActive:
            window.location.pathname.startsWith('/admin/users') ||
            window.location.pathname.startsWith('/admin/teachers') ||
            window.location.pathname.startsWith('/admin/parents') ||
            window.location.pathname.startsWith('/admin/admins'),
        items: [
            {
                title: 'Data Admin',
                href: '/admin/admins',
            },
            {
                title: 'Data Guru',
                href: '/admin/teachers',
            },
            {
                title: 'Orang Tua',
                href: '/admin/parents',
            },
        ],
    },
    {
        title: 'Manajemen Tahun Pelajaran',
        href: '/admin/school-years',
        icon: CalendarCheck,
    },
    {
        title: 'Manajemen Kelas',
        href: '/admin/student-classes',
        icon: School,
    },
    {
        title: 'Manajemen Siswa',
        href: '/admin/students',
        icon: UserCircle,
    },
    {
        title: 'Manajemen Absensi',
        href: '/admin/attendances',
        icon: CalendarCheck,
    },
    // {
    //     title: 'Penilaian Perkembangan Anak',
    //     href: '/admin/child-development-assessments',
    //     icon: Award,
    // },
    {
        title: 'Penilaian Perkembangan Anak',
        href: '/admin/nilai-kokurikuler',
        icon: Award,
    },
];

const teacherNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    // {
    //     title: 'User Management',
    //     href: '/users',
    //     icon: LayoutGrid,
    // },
    // {
    //     title: 'Room Management',
    //     href: '/rooms',
    //     icon: LayoutGrid,
    // },
    // {
    //     title: 'Booking Management',
    //     href: '/bookings',
    //     icon: LayoutGrid,
    // },
];

const parentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    // {
    //     title: 'User Management',
    //     href: '/users',
    //     icon: LayoutGrid,
    // },
    // {
    //     title: 'Room Management',
    //     href: '/rooms',
    //     icon: LayoutGrid,
    // },
    // {
    //     title: 'Booking Management',
    //     href: '/bookings',
    //     icon: LayoutGrid,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const [roleNavItems, setRoleNavItems] = useState<NavItem[]>([]);

    useEffect(() => {
        if (auth.user.role == 'admin') {
            setRoleNavItems(adminNavItems);
        } else if (auth.user.role == 'teacher') {
            setRoleNavItems(teacherNavItems);
        } else if (auth.user.role == 'parent') {
            setRoleNavItems(parentNavItems);
        } else {
            setRoleNavItems([]);
        }
    }, []);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
