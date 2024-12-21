import { ColumnDef } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui';
import { Substation } from '~/services/substation/model';
import { formatDateTime } from '~/utils';

export const columns: ColumnDef<Substation>[] = [
  {
    accessorKey: 'name',
    header: 'Substation name',
  },
  {
    accessorKey: 'numOfApplications',
    header: 'No. of applications',
  },
  {
    accessorKey: 'capacityInkWac',
    header: 'Capacity (kWac)',
  },
  {
    accessorKey: 'capacityInkWp',
    header: 'Capacity (kWp)',
  },
  {
    accessorKey: 'capacityInkWh',
    header: 'Capacity (kWh)',
  },
  {
    accessorKey: 'updatedAt',
    enableSorting: false,
    header: 'Last updated',
    cell: ({ row }) => {
      return formatDateTime(row.getValue('updatedAt'));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button
          variant='outline-secondary'
          size='icon'
          onClick={() => {
            console.log(`Edit ${payment.name}`);
          }}
          className='hover:animate-spin'
        >
          <ChevronRight className='h-5 w-5' strokeWidth={2} />
        </Button>
      );
    },
  },
];
