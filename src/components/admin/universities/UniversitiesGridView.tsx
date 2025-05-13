
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from 'lucide-react';
import { UniversityCard } from './UniversityCard';
import { Skeleton } from '@/components/ui/skeleton';

interface UniversitiesGridViewProps {
  universities: any[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

export function UniversitiesGridView({
  universities,
  isLoading,
  onViewDetails,
  onEdit
}: UniversitiesGridViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-full">
            <Skeleton className="h-[200px] w-full rounded-t-md" />
            <div className="space-y-2 mt-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {Array(3).fill(0).map((_, j) => (
                  <Skeleton key={j} className="h-[80px]" />
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex rounded-full bg-unlimited-blue/10 p-6">
          <div className="rounded-full bg-unlimited-blue/20 p-4">
            <div className="rounded-full bg-unlimited-blue p-4">
              <Building className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-unlimited-dark-blue">لا توجد جامعات</h3>
        <p className="mt-2 text-unlimited-gray">لم يتم العثور على جامعات مطابقة لمعايير البحث</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {universities.map((university) => (
          <div key={university.id} className="h-full">
            <UniversityCard
              university={university}
              onView={onViewDetails}
              onEdit={onEdit}
            />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
