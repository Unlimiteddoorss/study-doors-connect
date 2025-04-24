
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface StudentFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  nationalities: string[];
}

export function StudentFilters({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  nationalities
}: StudentFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
        <Input
          placeholder={t('admin.studentsPage.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full md:w-[300px]"
        />
      </div>
      
      <div className="flex flex-row gap-2 items-center">
        <Select value={filters.nationality} onValueChange={(value) => setFilters({ ...filters, nationality: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.studentsPage.nationality')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.studentsPage.allNationalities')}</SelectItem>
            {nationalities.map((nationality) => (
              <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.studentsPage.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.studentsPage.allStatuses')}</SelectItem>
            <SelectItem value="active">{t('admin.studentsPage.active')}</SelectItem>
            <SelectItem value="inactive">{t('admin.studentsPage.inactive')}</SelectItem>
            <SelectItem value="pending">{t('admin.studentsPage.pending')}</SelectItem>
            <SelectItem value="graduated">{t('admin.studentsPage.graduated')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
