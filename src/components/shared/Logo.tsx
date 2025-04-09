
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
      <img 
        src="/lovable-uploads/6e0c99ef-ce91-48b1-b3c8-49e2ef5a454a.png" 
        alt="Come to Study - Unlimited Doors" 
        className="h-12 w-auto"
      />
      <div className="hidden md:block">
        <h1 className="text-lg font-bold text-white">أبواب غير محدودة</h1>
        <p className="text-xs text-unlimited-light-blue">Come to Study - Since 1992</p>
      </div>
    </Link>
  );
};

export default Logo;
