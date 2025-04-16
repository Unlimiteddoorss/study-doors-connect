
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

const Logo = ({ variant = 'dark', className = '' }: LogoProps) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-unlimited-dark-blue';
  const accentColor = variant === 'dark' ? 'text-unlimited-light-blue' : 'text-unlimited-blue';

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/e82df0f6-f604-4cb3-86ba-54121ae30ce9.png" 
        alt="Unlimited Doors Logo" 
        className="h-12 w-12 mr-2"
      />
      <div>
        <span className={`text-lg font-bold ${textColor}`}>
          Come to Study
        </span>
        <div className={`text-sm ${accentColor}`}>
          Unlimited Doors
        </div>
      </div>
    </Link>
  );
};

export default Logo;
