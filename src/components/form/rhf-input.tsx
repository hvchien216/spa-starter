import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, InputProps } from '~/components/ui';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';

interface RHFInputProps extends InputProps {
  name: string;
  placeholder?: string;
  title?: string;
  description?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RHFInput = ({
  name,
  placeholder,
  title,
  description,
  required = false,
  onChange,
  ...props
}: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {title && <FormLabel required={required}>{title}</FormLabel>}
          {description && <FormDescription className='text-xs text-slate-500'>{description}</FormDescription>}
          <FormControl>
            <Input
              {...props}
              placeholder={placeholder}
              {...field}
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className='w-[149px] max-w-52'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
