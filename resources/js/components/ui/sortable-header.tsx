import { router, usePage } from '@inertiajs/react';
import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide } from 'lucide-react';

interface SortableHeaderProps {
    column: string;
    label: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function SortableHeader({ column, label, className = '', align = 'left' }: SortableHeaderProps) {
    const { url } = usePage();
    const [path, queryString] = url.split('?');
    const searchParams = new URLSearchParams(queryString || '');
    
    const currentSort = searchParams.get('sort');
    const currentDir = searchParams.get('direction');
    
    const isActive = currentSort === column;
    
    const toggleSort = () => {
        let newDir = 'asc';
        if (isActive && currentDir === 'asc') {
            newDir = 'desc';
        }
        
        const newParams = Object.fromEntries(searchParams.entries());
        newParams.sort = column;
        newParams.direction = newDir;
        
        router.get(path, newParams as any, { preserveState: true, replace: true, preserveScroll: true });
    };

    return (
        <th scope="col" className={`px-6 py-4 cursor-pointer select-none hover:bg-muted/50 transition-colors group ${className}`} onClick={toggleSort}>
            <div className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
                <span className={`font-semibold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{label}</span>
                {isActive ? (
                    currentDir === 'asc' ? <ArrowUpNarrowWide className="h-4 w-4 text-primary" /> : <ArrowDownWideNarrow className="h-4 w-4 text-primary" />
                ) : (
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground/70 group-hover:text-muted-foreground transition-colors" />
                )}
            </div>
        </th>
    );
}
