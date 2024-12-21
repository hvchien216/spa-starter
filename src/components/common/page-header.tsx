import { cn } from '~/utils';

type Props = {
  title: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, children }: Props) => {
  return (
    <div className={cn('flex justify-between bg-background py-4')}>
      <div className='container-wrapper'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <div className='ml-auto'>{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
