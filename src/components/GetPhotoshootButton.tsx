import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const GetPhotoshootButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate('/payment')}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all z-50 whitespace-nowrap"
    >
      Получить фотосессию
    </motion.button>
  );
}; 