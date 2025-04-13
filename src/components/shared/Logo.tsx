
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 rtl:space-x-reverse">
      <div className="relative flex items-center">
        <img 
          alt="أبواب بلا حدود - Unlimited Doors" 
          className="h-12 w-auto" 
          src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png" 
        />
        <div className="hidden md:block mr-2 rtl:mr-0 rtl:ml-2">
          <h1 className="text-xl font-bold text-white">أبواب بلا حدود</h1>
          <p className="text-xs text-unlimited-light-blue -mt-1">Unlimited Doors - Since 1992</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
