
import React from 'react';
import { Link } from 'react-router-dom';
import { ProgramInfo } from '@/data/programsData';

interface ProgramCardProps {
  program: ProgramInfo;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/program/${program.id}`}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={program.image || program.university_image || "https://via.placeholder.com/400x200"}
            alt={program.name || program.title || ''}
          />
          {(program.is_popular || program.isFeatured) && (
            <div className="absolute top-2 right-2 bg-unlimited-blue text-white text-xs px-2 py-1 rounded">
              Popular
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{program.name || program.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{program.university}</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-700 text-sm">
              {program.country || program.location}, {program.city}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-unlimited-blue font-medium">
              ${program.tuition_fee || program.fee} / year
            </span>
            {(program.has_scholarship || program.scholarshipAvailable) && (
              <span className="text-green-500 text-sm">Scholarship Available</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProgramCard;
