import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShowEntriesProps {
  route: string;
  search?: string;
  entries?: number;
}

export function Entries({ route, search, entries = 10 }: ShowEntriesProps) {
  const handleEntriesChange = (value: string) => {
    router.get(route, { 
      entries: value,
      search: search 
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="w-full md:mt-0 sm:flex sm:space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Show</span>
        <Select 
          value={entries.toString()} 
          onValueChange={handleEntriesChange}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder={entries} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
      </div>
    </div>
  );
}