import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

export const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    WebApp.showPopup({
      title: 'Оплата',
      message: 'Для оплаты вы будете перенаправлены на защищенную страницу',
      buttons: [
        {
          id: 'pay',
          type: 'ok',
          text: 'Продолжить'
        }
      ]
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-4"
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            ИИ-фотосессия для вашего бизнеса
          </h2>
          
          {/* Преимущества */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Всего <span className="font-medium">2 дня</span> на создание профессиональных фотографий</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Анализ целевых поисковых запросов и топовых карточек для максимальной эффективности</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700"><span className="font-medium">12 фотографий</span> в разных позах</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Высокое качество изображений</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Фотографии оптимизированы под поисковые запросы</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-positive/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Учитываем все ваши пожелания</p>
            </div>
          </div>

          {/* Цена и кнопка */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Стоимость за артикул</span>
              <span className="text-2xl font-semibold text-gray-900">9 990 ₽</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handlePayment}
              className="w-full bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-sm hover:bg-opacity-90 transition-all"
            >
              Оплатить
            </motion.button>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-gray-700 space-y-4">
            <p className="font-medium text-lg text-gray-900">Почему это работает?</p>
            <p>
              Как вы уже могли убедиться по нашим кейсам, даже одно изменение CTR может значительно увеличить количество заказов. 
              А поскольку вы предприниматель - действуйте!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 