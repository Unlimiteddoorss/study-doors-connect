
export const colors = {
  primary: {
    blue: '#3B82F6',
    darkBlue: '#1E40AF',
    lightBlue: '#EFF6FF'
  },
  secondary: {
    gray: '#6B7280',
    lightGray: '#F3F4F6',
    darkGray: '#374151'
  },
  success: {
    green: '#10B981',
    lightGreen: '#ECFDF5'
  },
  warning: {
    yellow: '#F59E0B',
    lightYellow: '#FFFBEB'
  },
  danger: {
    red: '#EF4444',
    lightRed: '#FEF2F2'
  }
};

export const colorClasses = {
  // Primary colors
  'text-primary-blue': 'text-blue-500',
  'text-primary-dark-blue': 'text-blue-800',
  'bg-primary-blue': 'bg-blue-500',
  'bg-primary-dark-blue': 'bg-blue-800',
  'bg-primary-light-blue': 'bg-blue-50',
  'border-primary-blue': 'border-blue-500',
  'hover:bg-primary-blue': 'hover:bg-blue-500',
  'hover:bg-primary-dark-blue': 'hover:bg-blue-800',
  
  // Secondary colors
  'text-secondary-gray': 'text-gray-600',
  'text-secondary-dark-gray': 'text-gray-800',
  'bg-secondary-gray': 'bg-gray-600',
  'bg-secondary-light-gray': 'bg-gray-50',
  'border-secondary-gray': 'border-gray-300',
  
  // Success colors
  'text-success-green': 'text-green-600',
  'bg-success-green': 'bg-green-600',
  'bg-success-light-green': 'bg-green-50',
  
  // Warning colors
  'text-warning-yellow': 'text-yellow-600',
  'bg-warning-yellow': 'bg-yellow-600',
  'bg-warning-light-yellow': 'bg-yellow-50',
  
  // Danger colors
  'text-danger-red': 'text-red-600',
  'bg-danger-red': 'bg-red-600',
  'bg-danger-light-red': 'bg-red-50'
};

// Helper function to get color class
export const getColorClass = (colorName: keyof typeof colorClasses): string => {
  return colorClasses[colorName] || '';
};

// Theme configuration
export const theme = {
  colors: {
    primary: colors.primary.blue,
    secondary: colors.secondary.gray,
    success: colors.success.green,
    warning: colors.warning.yellow,
    danger: colors.danger.red
  },
  
  gradients: {
    primary: 'from-blue-500 to-blue-700',
    secondary: 'from-gray-500 to-gray-700',
    success: 'from-green-500 to-green-700'
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
};
