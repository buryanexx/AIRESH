import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';

// Варианты пакетов фотографий
const PHOTO_PACKAGES = [
  {
    id: '2photos',
    count: 2,
    title: '2 фотографии',
    description: 'для анализа главной фотографии (разный или единый стиль)',
    price: 7990,
    badge: 'Популярный'
  },
  {
    id: '4photos',
    count: 4,
    title: '4 фотографии',
    description: 'для анализа главной фотографии и воронки (единый стиль)',
    price: 10990,
    badge: 'Оптимальный'
  },
  {
    id: '8photos',
    count: 8,
    title: '8 фотографий',
    description: 'полноценная фотосессия (единый стиль)',
    price: 14990,
    badge: 'Максимальный'
  }
];

export const Payment = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(PHOTO_PACKAGES[0]);

  const handlePayment = () => {
    // Отправка данных в бот
    WebApp.sendData(JSON.stringify({
      action: 'order',
      package: selectedPackage.id,
      photoCount: selectedPackage.count,
      price: selectedPackage.price
    }));
    
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            ИИ-фотосессия для вашего бизнеса
          </h2>
          
          <p className="text-center text-gray-600 mb-8">Увеличьте продажи с помощью профессиональных фотографий</p>
          
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

          {/* Выбор пакета фотографий */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-5">Выберите количество фотографий</h3>
            <div className="space-y-4">
              {PHOTO_PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPackage.id === pkg.id 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage.id === pkg.id 
                          ? 'border-primary' 
                          : 'border-gray-400'
                      }`}>
                        {selectedPackage.id === pkg.id && (
                          <div className="w-3.5 h-3.5 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">{pkg.title}</span>
                        {pkg.badge && (
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            selectedPackage.id === pkg.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{pkg.description}</div>
                      <div className="text-primary font-bold text-lg mt-2">{pkg.price.toLocaleString()} ₽</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Цена и кнопка */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md">
            <div className="text-center mb-2">
              <span className="text-sm font-medium text-gray-500">Итоговая стоимость:</span>
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900 block">{selectedPackage.price.toLocaleString()} ₽</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handlePayment}
              className="w-full bg-primary text-white text-lg font-bold px-6 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all mb-3"
            >
              Заказать
            </motion.button>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">цена за артикул ({selectedPackage.count} фотографии)</span>
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