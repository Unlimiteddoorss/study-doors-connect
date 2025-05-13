
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CalendarIcon, ChevronDown } from 'lucide-react';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeSelectorProps {
  onRangeChange: (range: DateRange) => void;
  className?: string;
}

const predefinedRanges = [
  { label: 'آخر 7 أيام', days: 7 },
  { label: 'آخر 30 يوم', days: 30 },
  { label: 'آخر 90 يوم', days: 90 },
  { label: 'هذا الشهر', type: 'currentMonth' },
  { label: 'مخصص', type: 'custom' },
];

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onRangeChange, className }) => {
  const [date, setDate] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRangeLabel, setSelectedRangeLabel] = useState('آخر 7 أيام');

  const handleRangeSelect = (range: typeof predefinedRanges[0]) => {
    let newRange: DateRange;
    
    if (range.type === 'custom') {
      setIsOpen(true);
      setSelectedRangeLabel('مخصص');
      return;
    } else if (range.type === 'currentMonth') {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      newRange = {
        from: firstDayOfMonth,
        to: today,
      };
    } else {
      newRange = {
        from: subDays(new Date(), range.days!),
        to: new Date(),
      };
    }
    
    setDate(newRange);
    setSelectedRangeLabel(range.label);
    setIsOpen(false);
    onRangeChange(newRange);
  };

  const handleDateChange = (newDate: DateRange | { from: Date; to?: Date }) => {
    // Ensure we have a complete range
    const completeRange = {
      from: newDate.from,
      to: newDate.to || newDate.from,
    };
    
    setDate(completeRange);
    
    if (newDate.to) {
      onRangeChange(completeRange);
      setSelectedRangeLabel('مخصص');
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-between text-sm font-normal px-3 py-2 h-9"
            )}
          >
            <span className="flex items-center">
              <CalendarIcon className="ml-2 h-4 w-4" />
              {selectedRangeLabel}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="space-y-1">
              {predefinedRanges.map((range) => (
                <Button
                  key={range.label}
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => handleRangeSelect(range)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={ar}
          />
        </PopoverContent>
      </Popover>
      
      <div className="text-sm text-muted-foreground hidden sm:block">
        {format(date.from, 'dd/MM/yyyy', { locale: ar })} - {format(date.to, 'dd/MM/yyyy', { locale: ar })}
      </div>
    </div>
  );
};

export default DateRangeSelector;
