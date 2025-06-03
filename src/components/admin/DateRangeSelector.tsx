
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface DateRangeSelectorProps {
  onRangeChange: (range: { from: Date; to: Date }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onRangeChange }) => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range) {
      setDateRange(range);
      if (range.from && range.to) {
        onRangeChange({ from: range.from, to: range.to });
        setIsOpen(false);
      }
    }
  };

  const formatRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'dd/MM/yyyy', { locale: ar })} - ${format(dateRange.to, 'dd/MM/yyyy', { locale: ar })}`;
    }
    if (dateRange.from) {
      return format(dateRange.from, 'dd/MM/yyyy', { locale: ar });
    }
    return "اختر فترة التاريخ";
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          locale={ar}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeSelector;
