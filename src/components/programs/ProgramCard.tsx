
import React from 'react';
import { Link } from 'react-router-dom';

// Add ProgramInfo interface for external use
export interface ProgramInfo {
  id: number;
  name: string;
  name_ar?: string;
  university: string;
  university_id: number;
  degree_type: string;
  duration: number;
  tuition_fee: number;
  language: string;
  country: string;
  city: string;
  has_scholarship: boolean;
  is_popular: boolean;
  description?: string;
  university_image?: string; // Optional property for university logo
  image?: string; // Optional property for program image
}

interface ProgramCardProps {
  program: ProgramInfo;
  // Don't include the index prop in the interface since it's causing errors
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/program/${program.id}`}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={program.image || program.university_image || "https://via.placeholder.com/400x200"}
            alt={program.name}
          />
          {program.is_popular && (
            <div className="absolute top-2 right-2 bg-unlimited-blue text-white text-xs px-2 py-1 rounded">
              {program.is_popular ? 'Popular' : ''}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{program.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{program.university}</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-700 text-sm">
              {program.country}, {program.city}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-unlimited-blue font-medium">
              ${program.tuition_fee} / year
            </span>
            {program.has_scholarship && (
              <span className="text-green-500 text-sm">Scholarship Available</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProgramCard;
