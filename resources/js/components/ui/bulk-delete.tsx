import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteDialog } from './delete-dialog';
import { usePage } from '@inertiajs/react';

interface BulkDeleteDialogProps {
  selectedCount: number;
  onConfirm: () => void;
}

export function BulkDeleteDialog({ selectedCount, onConfirm }: BulkDeleteDialogProps) {
  const { translations, locale } : any = usePage().props;
  return (
    <DeleteDialog
      trigger={
        <Button variant="destructive">
          <Trash2 className="inline-flex items-center font-medium rounded-md" />
          {`${translations.app.delete} ${translations.app.selected}`} ({selectedCount})
        </Button>
      }
      title={`${translations.app.bulk_delete} ${translations.app.selected}`}
      description={`${translations.app.delete_confirmation} ${selectedCount} ${translations.app.selected_item}? ${translations.app.delete_confirmation_info}.`}
      onConfirm={onConfirm}
      confirmText={translations.app.delete_all}
    />
  );
}