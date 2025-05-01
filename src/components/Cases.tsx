import { motion } from 'framer-motion';
import WebApp from '@twa-dev/sdk';
import { GetPhotoshootButton } from './GetPhotoshootButton';
import { useNavigate } from 'react-router-dom';

interface CaseProps {
  beforeImage: string;
  afterImage: string;
  oldCtr: number;
  newCtr: number;
  ordersGrowth: number;
  category: string;
  productName: string;
  description: string;
}

const Case = ({ beforeImage, afterImage, oldCtr, newCtr, ordersGrowth, category, productName, description }: CaseProps) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
    <div className="mb-4">
      <span className="inline-block px-3 py-1 bg-[#F8BFFF]/10 text-[#F8BFFF] text-sm font-medium rounded-full">
        {category}
      </span>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">{productName}</h3>
      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{description}</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
        <p className="absolute top-2 left-2 text-sm font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-full">До</p>
        <img 
          src={beforeImage} 
          alt="До" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
        <p className="absolute top-2 left-2 text-sm font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-full">После</p>
        <img 
          src={afterImage} 
          alt="После" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <div className="space-y-3 bg-gray-50/50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">CTR</span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-900">{oldCtr}% →</span>
          <span className="text-[#2AAB27] font-medium">{newCtr}%</span>
          <span className="text-[#2AAB27] text-sm bg-[#2AAB27]/10 px-2 py-0.5 rounded-full">
            (+{((newCtr - oldCtr) / oldCtr * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Рост заказов</span>
        <div className="flex items-center space-x-2">
          <span className="text-[#2AAB27] font-medium">в {ordersGrowth} раза</span>
          <span className="text-[#2AAB27] text-sm bg-[#2AAB27]/10 px-2 py-0.5 rounded-full">
            (+{((ordersGrowth - 1) * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const Cases = () => {
  const navigate = useNavigate();

  const cases = [
    {
      category: "Одежда",
      productName: "Рубашка из хлопка",
      description: "Повседневная рубашка из натурального хлопка с длинным рукавом",
      beforeImage: "/cases/case11.webp",
      afterImage: "/cases/case12.png",
      oldCtr: 2.95,
      newCtr: 4.8,
      ordersGrowth: 2.6
    },
    {
      category: "Обувь",
      productName: "Кроссовки для бега",
      description: "Легкие беговые кроссовки с амортизирующей подошвой",
      beforeImage: "/cases/case21.jpg",
      afterImage: "/cases/case22.png",
      oldCtr: 3.1,
      newCtr: 5.2,
      ordersGrowth: 2.8
    },
    {
      category: "Аксессуары",
      productName: "Кожаная сумка",
      description: "Стильная сумка из натуральной кожи с регулируемым ремешком",
      beforeImage: "/cases/case31.jpg",
      afterImage: "/cases/case32.png",
      oldCtr: 2.8,
      newCtr: 4.9,
      ordersGrowth: 2.4
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-4 pb-24"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Наши кейсы
          </h2>
          <p className="text-gray-600 mt-2">
            Реальные примеры того, как ИИ-фотосессия улучшает показатели карточек товаров
          </p>
        </motion.div>

        <div className="space-y-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Case {...caseItem} />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/')}
          className="w-full bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all mt-8"
        >
          ← Вернуться к расчету
        </motion.button>
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/payment')}
            className="w-full bg-accent text-white text-lg font-medium px-6 py-4 rounded-xl shadow-xl hover:bg-opacity-90 transition-all"
          >
            Получить фотосессию
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}; 