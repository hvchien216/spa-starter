import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';
import { cva, VariantProps } from 'class-variance-authority';

const Tabs = TabsPrimitive.Root;

const tabVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-0 py-3 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        border:
          "relative after:absolute after:bottom-0.5 after:left-0 after:h-[2px] after:w-full after:content-[''] hover:after:bg-primary data-[state=inactive]:font-normal data-[state=inactive]:text-muted data-[state=active]:after:bg-primary",
        badge:
          'rounded-full px-4 text-muted data-[state=active]:bg-[#E7ECEF] data-[state=active]:text-secondary data-[state=inactive]:font-normal',
      },
    },
    defaultVariants: {
      variant: 'border',
    },
  },
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('inline-flex h-10 items-center justify-center space-x-4 text-muted-foreground', className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabVariants>
>(({ variant, className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(tabVariants({ variant, className }))} {...props} />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    variant?: 'border' | 'badge';
  }
>(({ variant = 'border', className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'py-4',
      variant === 'border' && 'mt-0 border-t border-gray-200',
      variant === 'badge' && 'border-none',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
