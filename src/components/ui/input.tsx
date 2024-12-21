import * as React from 'react';

import { cn } from '~/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
  return (
    <div className='relative'>
      {icon && (
        <div className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
          {React.cloneElement(icon, {
            className: cn('h-5 w-5 text-gray-400', icon.props.className),
          })}
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-thin ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted hover:border-primary focus:border-primary focus:shadow-sm focus:shadow-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          icon && 'pl-10',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
