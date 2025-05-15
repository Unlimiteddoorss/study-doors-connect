
import React from 'react';
import { PieChart } from './chart';

// Re-export PieChart as DonutChart with the same API
export const DonutChart = (props: React.ComponentProps<typeof PieChart>) => {
  return <PieChart {...props} />;
};
