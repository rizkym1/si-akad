import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Buku Induk RA Al-Islam Gunungcupu">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            <div
                className="relative flex min-h-screen flex-col items-center overflow-hidden bg-zinc-50 p-6 font-sans text-neutral-800 transition-colors duration-300 selection:bg-green-500/30 lg:justify-center lg:p-8 dark:bg-black dark:text-neutral-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {/* Background Effects */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
                <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.05] blur-[120px] dark:bg-green-500/[0.08]"></div>

                <header className="relative z-10 mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4 rounded-full border border-black/5 bg-white/50 px-6 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                            >
                                Dashboard Buku Induk
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                                >
                                    Masuk
                                </Link>
                                <div className="h-4 w-px bg-black/10 dark:bg-white/10"></div>
                                <Link
                                    href={register()}
                                    className="inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="relative z-10 flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-xl backdrop-blur-xl lg:max-w-4xl lg:flex-row dark:border-white/10 dark:bg-white/5 dark:shadow-2xl">
                        {/* LEFT PANEL — Selamat Datang */}
                        <div className="flex flex-1 flex-col justify-center p-6 pb-12 lg:p-10">
                            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                                </span>
                                Sistem Administrasi
                            </div>

                            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                                Selamat Datang di{' '}
                                <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-300">
                                    Buku Induk
                                </span>
                            </h1>
                            <p className="mb-2 text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
                                Buku Induk adalah sistem administrasi pendidikan
                                yang membantu mengelola data peserta didik RA
                                Al-Islam Gunungcupu.
                            </p>
                            <p className="mb-8 text-sm text-neutral-500 lg:text-base">
                                Akses fitur-fitur utama aplikasi di bawah ini.
                            </p>

                            <ul className="mb-10 flex flex-col gap-6">
                                <li className="relative flex items-start gap-4">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-white text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:shadow-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line
                                                x1="15"
                                                y1="12"
                                                x2="3"
                                                y2="12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                                            Akses Dashboard
                                        </span>
                                        <Link
                                            href={login()}
                                            className="group mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-green-400 dark:hover:text-green-300"
                                        >
                                            Login ke akun Anda
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="transition-transform group-hover:translate-x-1"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </li>
                                <li className="relative flex items-start gap-4">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-white text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:shadow-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <line
                                                x1="19"
                                                y1="8"
                                                x2="19"
                                                y2="14"
                                            />
                                            <line
                                                x1="22"
                                                y1="11"
                                                x2="16"
                                                y2="11"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                                            Daftar Akun Baru
                                        </span>
                                        <Link
                                            href={register()}
                                            className="group mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-green-400 dark:hover:text-green-300"
                                        >
                                            Buat akun pengelola
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="transition-transform group-hover:translate-x-1"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-auto">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-green-600 active:scale-[0.98] sm:w-auto dark:text-black dark:shadow-none dark:hover:bg-green-400"
                                >
                                    Mulai Sekarang
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT PANEL — Logo + Nama Sekolah */}
                        <div className="relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden border-b border-black/5 bg-black/[0.02] p-8 lg:w-[438px] lg:border-b-0 lg:border-l lg:p-12 dark:border-white/10 dark:bg-white/[0.02]">
                            {/* Inner subtle glow for the right panel */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent dark:from-green-500/5"></div>

                            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6">
                                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-black/5 bg-white/50 p-6 shadow-sm backdrop-blur-sm lg:h-40 lg:w-40 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                                    <img
                                        src="/images/logo_alislam.png"
                                        alt="Logo RA Al-Islam Gunungcupu"
                                        className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.15)] dark:drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                    />
                                    {/* Rotating outer ring for aesthetic */}
                                    <div className="absolute inset-0 -z-10 rounded-full border-t border-green-500/40 dark:border-green-500/30"></div>
                                </div>

                                <div className="text-center">
                                    <h2 className="text-xl font-bold tracking-tight text-neutral-900 lg:text-2xl dark:text-white">
                                        Raudhatul Athfal Al-Islam
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-green-400">
                                        Gunungcupu
                                    </p>

                                    <div className="mt-6 flex flex-col items-center gap-2 border-t border-black/5 pt-6 dark:border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
                                            <p className="text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                                                Sistem Informasi
                                            </p>
                                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
                                        </div>
                                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                            Buku Induk Peserta Didik
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
