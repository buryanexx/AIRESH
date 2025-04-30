import { motion } from 'framer-motion';

interface WelcomeProps {
  onViewCases: () => void;
}

export const Welcome = ({ onViewCases }: WelcomeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-primary mb-4 text-center"
      >
        Как ИИ-фотосессии увеличивают ваши заказы
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-600 mb-8 text-center"
      >
        Улучшайте визуал → получайте больше заказов
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onViewCases}
        className="bg-primary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition-all"
      >
        Посмотреть кейсы
      </motion.button>
    </motion.div>
  );
}; 