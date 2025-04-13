
import { Link } from 'react-router-dom';
const Logo = () => {
  return <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
      <img alt="أبواب بلا حدود - Unlimited Doors" className="h-12 w-auto" src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png" />
      <div className="hidden md:block">
        <h1 className="text-lg font-bold text-white">أبواب بلا حدود</h1>
        <p className="text-xs text-unlimited-light-blue">Unlimited Doors - Since 1992</p>
      </div>
    </Link>;
};
export default Logo;
