import { LogOutIcon } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui';
type Props = {};

const ProfileMenu = (_props: Props) => {
  // TODO: handle the logout functionality
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary'>
          RT
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button size='sm' variant='ghost'>
            <LogOutIcon className='!h-3 !w-3' />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
