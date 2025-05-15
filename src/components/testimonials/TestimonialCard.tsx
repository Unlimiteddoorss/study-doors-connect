
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  university: string;
  program: string;
  country: string;
  image?: string;
  rating: number;
  testimonial: string;
  year: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  university,
  program,
  country,
  image,
  rating,
  testimonial,
  year,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              {image ? (
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img src={image} alt={name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-unlimited-blue/20 flex items-center justify-center mr-3">
                  <span className="text-unlimited-blue font-bold">{name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h4 className="font-bold text-unlimited-dark-blue">{name}</h4>
                <p className="text-sm text-unlimited-gray">{program}</p>
              </div>
            </div>
            
            <div className="flex mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            
            <blockquote className="text-unlimited-gray mb-4">
              "{testimonial}"
            </blockquote>
          </div>
          
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <span className="text-unlimited-blue">{university}</span>
                <span className="mx-2 text-unlimited-gray">•</span>
                <span className="text-unlimited-gray">{country}</span>
              </div>
              <span className="text-unlimited-gray">{year}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
