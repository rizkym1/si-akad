import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash } = usePage<any>().props;
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                {/* Global Flash Messages */}
                {showFlash && (flash?.success || flash?.error) && (
                    <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                        <Alert variant={flash.error ? "destructive" : "default"} className="bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/90">
                            {flash.error ? (
                                <AlertTitle className="text-destructive font-bold">Terjadi Kesalahan</AlertTitle>
                            ) : (
                                <AlertTitle className="text-primary font-bold">Berhasil</AlertTitle>
                            )}
                            <AlertDescription className={flash.error ? "text-destructive/90" : "text-primary/90"}>
                                {flash.success || flash.error}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {children}
            </AppContent>
        </AppShell>
    );
}
