
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProgramCard from '@/components/programs/ProgramCard';
import { dummyPrograms, convertToProgramInfo } from '@/data/programsData';
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedPrograms = () => {
  // Get featured programs
  const featuredPrograms = dummyPrograms
    .filter(program => program.is_popular)
    .slice(0, 4)
    .map(program => convertToProgramInfo(program));

  return (
    <div className="bg-unlimited-light-blue/5 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">برامج دراسية مميزة</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" id="prev-featured" aria-label="Previous">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" id="next-featured" aria-label="Next">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/programs">عرض جميع البرامج</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPrograms;
