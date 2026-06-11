import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent">
                <img src="/images/logo_alislam.png" alt="Logo RA AL-ISLAM" className="size-8 object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold text-base">
                    Sistem Akademik
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    RA AL-ISLAM
                </span>
            </div>
        </>
    );
}
