
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SearchData {
  country: string;
  level: string;
  specialization: string;
}

export function useSearchParams() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchData, setSearchData] = useState<SearchData>({
    country: '',
    level: '',
    specialization: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.country || !searchData.level || !searchData.specialization) {
      toast({
        title: "تنبيه",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const searchParams = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });

    navigate(`/programs?${searchParams.toString()}`);
  };

  // Reset search parameters
  const resetSearch = () => {
    setSearchData({
      country: '',
      level: '',
      specialization: ''
    });
  };

  // Set search data from URL parameters
  const setSearchFromUrl = (params: URLSearchParams) => {
    const country = params.get('country') || '';
    const level = params.get('level') || '';
    const specialization = params.get('specialization') || '';
    
    setSearchData({
      country,
      level,
      specialization
    });
  };

  return {
    searchData,
    handleInputChange,
    handleSearch,
    resetSearch,
    setSearchFromUrl
  };
}
