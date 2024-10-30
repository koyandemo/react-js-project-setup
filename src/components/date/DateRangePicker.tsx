'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { cn } from '@/utils';

type Props = {
  label?:string;
  className?: string;
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
};

export function DateRangePicker({label="Pick a date", className, dateRange, setDateRange }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  React.useEffect(() => {
    setDateRange(date);
  }, [date]);

  return (
    <div className={cn('grid gap-2 h-[49px]', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full h-full flex items-center justify-between text-left font-normal !border !border-[#B3B3B3] !rounded-[8px]',
              !date && 'text-muted-foreground'
            )}
          >
           
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>{label}</span>
            )}
             <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={dateRange}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
