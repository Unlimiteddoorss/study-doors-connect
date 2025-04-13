
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 rtl:space-x-reverse">
      <motion.div 
        className="relative flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 8 }}
      >
        <div className="flex-shrink-0">
          <motion.img 
            alt="أبواب بلا حدود - Unlimited Doors" 
            className="h-16 w-auto" 
            src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mr-3 rtl:mr-0 rtl:ml-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-unlimited-light-blue bg-clip-text text-transparent">أبواب بلا حدود</h1>
          <p className="text-xs text-unlimited-light-blue -mt-1">Unlimited Doors - Since 1992</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;
