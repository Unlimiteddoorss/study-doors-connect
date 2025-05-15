
import React from 'react';
import { Link } from 'react-router-dom';
import { getFieldValue } from '@/utils/programsUtils';
import { ProgramInfo } from '@/data/programsData';

interface ProgramCardProps {
  program: ProgramInfo | any;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/program/${program.id}`}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={getFieldValue(program, 'university_image') as string || getFieldValue(program, 'image') as string || "https://via.placeholder.com/400x200"}
            alt={getFieldValue(program, 'name') as string || ''}
          />
          {(getFieldValue(program, 'is_popular') || getFieldValue(program, 'isFeatured')) && (
            <div className="absolute top-2 right-2 bg-unlimited-blue text-white text-xs px-2 py-1 rounded">
              Popular
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{getFieldValue(program, 'name') as string}</h3>
          <p className="text-gray-600 text-sm mt-1">{getFieldValue(program, 'university') as string}</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-700 text-sm">
              {getFieldValue(program, 'country') as string || getFieldValue(program, 'location') as string}
              {program.city && `, ${program.city}`}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-unlimited-blue font-medium">
              ${getFieldValue(program, 'tuition_fee') || getFieldValue(program, 'fee')} / year
            </span>
            {(getFieldValue(program, 'has_scholarship') || getFieldValue(program, 'scholarshipAvailable')) && (
              <span className="text-green-500 text-sm">Scholarship Available</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProgramCard;
