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
          type: 'ok'
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
        {/* Кнопка возврата к кейсам */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/cases')}
          className="mb-6 text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Вернуться к кейсам</span>
        </motion.button>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            ИИ-фотосессия для вашего бизнеса
          </h2>
          
          {/* Преимущества */}
          <div className="space-y-6 mb-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Всего 2 дня</p>
                    <p className="text-sm text-gray-600">на создание профессиональных фотографий</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Анализ запросов</p>
                    <p className="text-sm text-gray-600">целевых поисковых запросов и топовых карточек</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">12 фотографий</p>
                    <p className="text-sm text-gray-600">в разных позах и ракурсах</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Высокое качество</p>
                    <p className="text-sm text-gray-600">профессиональные фотографии</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Цена и кнопка */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900 block">9 990 ₽</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handlePayment}
              className="w-full bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all mb-3"
            >
              Заказать
            </motion.button>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">цена за артикул (12 фото)</span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-white rounded-xl shadow-lg p-6">
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