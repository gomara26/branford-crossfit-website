import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  debounce?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, debounce = 0, ...props }, ref) => {
    // For immediate response to typing
    const [value, setValue] = React.useState(props.value || props.defaultValue || '');
    
    // Store the timeout ID for debouncing
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    
    // Clear timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    
    // Handle change with optional debounce
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Always update local state immediately for responsive UI
        setValue(e.target.value);
        
        // If we have a debounce delay, use it
        if (debounce > 0 && onChange) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          timeoutRef.current = setTimeout(() => {
            onChange(e);
          }, debounce);
        } else if (onChange) {
          // No debounce, call onChange directly
          onChange(e);
        }
      },
      [onChange, debounce]
    );

    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        onChange={handleChange}
        value={value}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
