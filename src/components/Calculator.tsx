import { motion } from 'framer-motion';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Link } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

export const Calculator = () => {
  const [impressions, setImpressions] = useState(20000);
  const [currentCtr, setCurrentCtr] = useState(3.3);
  const [newCtr, setNewCtr] = useState(5.9);
  const [cartRate, setCartRate] = useState(9);
  const [orderRate, setOrderRate] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Расчеты для текущих показателей
  const currentClicks = Math.round((impressions * currentCtr) / 100);
  const currentCarts = Math.round((currentClicks * cartRate) / 100);
  const currentOrders = Math.round((currentCarts * orderRate) / 100);

  // Расчеты для новых показателей
  const newClicks = Math.round((impressions * newCtr) / 100);
  const newCarts = Math.round((newClicks * cartRate) / 100);
  const newOrders = Math.round((newCarts * orderRate) / 100);

  // Расчет процентов роста
  const ctrGrowth = ((newCtr - currentCtr) / currentCtr);
  const ordersGrowth = ((newOrders - currentOrders) / currentOrders) * 100;

  // Функция отправки данных в бота
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const data = {
        impressions,
        currentCtr,
        newCtr,
        cartRate,
        orderRate,
        currentClicks,
        newClicks,
        currentCarts,
        newCarts,
        currentOrders,
        newOrders,
        ctrGrowth: ctrGrowth * 100,
        ordersGrowth
      };

      // Отправляем данные через Telegram WebApp
      await WebApp.sendData(JSON.stringify(data));
      
      // Показываем уведомление об успехе
      WebApp.showPopup({
        title: 'Успешно!',
        message: 'Ваши данные отправлены. Наш менеджер свяжется с вами в ближайшее время.',
        buttons: [{ type: 'ok' }]
      });
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      WebApp.showPopup({
        title: 'Ошибка',
        message: 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже.',
        buttons: [{ type: 'ok' }]
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const MetricCard = ({ label, value, subtext, comparison }: { 
    label: string; 
    value: string | number; 
    subtext?: string;
    comparison?: { value: number; label: string; } 
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
      {subtext && <div className="text-sm text-gray-600">{subtext}</div>}
      {comparison && (
        <div className={`text-sm font-medium ${comparison.value > 0 ? 'text-positive' : 'text-negative'}`}>
          {comparison.value > 0 ? '+' : ''}{comparison.value.toFixed(0)}% {comparison.label}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-4"
    >
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Калькулятор эффективности ИИ-фотосессии
        </motion.h2>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="space-y-6">
            {/* Показы */}
            <div>
              <div className="flex flex-col space-y-1">
                <label className="block text-base font-medium text-gray-700">
                  Количество показов — сколько трафика?
                </label>
                <span className="text-sm text-gray-500">
                  Введите среднее количество показов ваших товаров
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 mb-2">
                <span className="text-base font-semibold text-gray-900">
                  {impressions.toLocaleString()}
                </span>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                value={[impressions]}
                onValueChange={([value]) => setImpressions(value)}
                max={800000}
                min={2000}
                step={2000}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Показы"
                />
              </Slider.Root>
            </div>

            {/* Текущий CTR */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-gray-700">
                  Текущий CTR
                </label>
                <span className="text-base font-semibold text-gray-900 ml-2">
                  {currentCtr.toFixed(1)}%
                </span>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                value={[currentCtr]}
                onValueChange={([value]) => setCurrentCtr(value)}
                max={10}
                min={0.1}
                step={0.1}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Текущий CTR"
                />
              </Slider.Root>
            </div>

            {/* Потенциальный CTR */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-gray-700">
                  Потенциальный CTR с ИИ
                </label>
                <span className={`text-base font-bold ${
                  newCtr > currentCtr ? 'text-positive' : 'text-negative'
                }`}>
                  {newCtr.toFixed(1)}%
                </span>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                value={[newCtr]}
                onValueChange={([value]) => setNewCtr(value)}
                max={13.37}
                min={0.1}
                step={0.1}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                  <Slider.Range className={`absolute h-full rounded-full ${
                    newCtr > currentCtr ? 'bg-positive' : 'bg-negative'
                  }`} />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="CTR"
                />
              </Slider.Root>
            </div>

            {/* Метрики */}
            <div className="space-y-4 mt-8">
              <div className="bg-white rounded-xl p-4 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#ffb8e9] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#FF00AA"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-900">Перешли в карточку</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{newClicks.toLocaleString()}</span>
                    <span className="px-2 py-1 text-sm font-medium text-positive bg-positive/10 rounded">
                      +{((newClicks - currentClicks) / currentClicks * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {newCtr.toFixed(1)}% от показов
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#e4b8ff] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#9747FF"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-900">Добавили в корзину</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{newCarts.toLocaleString()}</span>
                    <span className="px-2 py-1 text-sm font-medium text-positive bg-positive/10 rounded">
                      +{((newCarts - currentCarts) / currentCarts * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {cartRate}% добавили в корзину
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#b8e4ff] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#0088CC"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-900">Заказали</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{newOrders.toLocaleString()} шт</span>
                    <span className="px-2 py-1 text-sm font-medium text-positive bg-positive/10 rounded">
                      +{((newOrders - currentOrders) / currentOrders * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {orderRate}% заказали товаров
                  </div>
                </div>
              </div>
            </div>

            {/* Конверсии */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-medium text-gray-700">
                    Конверсия в корзину
                  </label>
                  <span className="text-base font-semibold text-gray-900">
                    {cartRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={cartRate}
                  onChange={(e) => setCartRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-medium text-gray-700">
                    Конверсия в заказ
                  </label>
                  <span className="text-base font-semibold text-gray-900">
                    {orderRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={orderRate}
                  onChange={(e) => setOrderRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Результаты */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Результаты расчета
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Рост CTR:</span>
              <span className={`text-lg font-bold ${ctrGrowth > 0 ? 'text-positive' : 'text-negative'}`}>
                в {(1 + ctrGrowth).toFixed(2)} раза
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Прирост заказов:</span>
              <span className={`text-lg font-bold ${ordersGrowth > 0 ? 'text-positive' : 'text-negative'}`}>
                {ordersGrowth > 0 ? '+' : ''}{ordersGrowth.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-primary text-white text-lg font-semibold px-6 py-4 rounded-xl shadow-lg transition-all mt-8 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </motion.button>

          <Link to="/cases">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-primary text-lg font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-all mt-4"
            >
              Посмотреть кейсы
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 