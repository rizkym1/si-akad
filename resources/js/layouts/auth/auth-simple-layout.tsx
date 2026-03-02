import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8 rounded-xl bg-card p-6 shadow-sm min-[450px]:p-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex items-center gap-3 font-medium transition-opacity hover:opacity-90"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
                                <img
                                    src="/images/logo_alislam.png"
                                    alt="Logo RA Al-Islam Gunungcupu"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-lg leading-tight font-bold">
                                    RA Al-Islam
                                </span>
                                <span className="text-sm leading-tight font-medium text-muted-foreground">
                                    Gunungcupu
                                </span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
