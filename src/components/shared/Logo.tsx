
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
      <img 
        src="/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png" 
        alt="Unlimited Doors - Come to Study Since 1992" 
        className="h-12 w-auto"
      />
      <div className="hidden md:block">
        <h1 className="text-lg font-bold text-white">أبواب بلا حدود</h1>
        <p className="text-xs text-unlimited-light-blue">Come to Study - Since 1992</p>
      </div>
    </Link>
  );
};

export default Logo;
