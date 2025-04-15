
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo = ({ variant = 'dark' }: LogoProps) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-unlimited-dark-blue';
  const accentColor = variant === 'dark' ? 'text-unlimited-light-blue' : 'text-unlimited-blue';

  return (
    <Link to="/" className="flex items-center">
      <span className={`text-2xl font-bold ${textColor}`}>
        Unlimited<span className={`${accentColor}`}>Edu</span>
      </span>
    </Link>
  );
};

export default Logo;
