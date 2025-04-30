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
  const ordersGrowthFromCurrent = ((newOrders - currentOrders) / currentOrders) * 100;

  // Функция форматирования процентов
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(0)}%`;
  };

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
        ordersGrowth: ordersGrowthFromCurrent
      };

      await WebApp.sendData(JSON.stringify(data));
      
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

  const MetricCard = ({ icon, label, value, change, subtext }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    change?: number;
    subtext?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 flex items-start space-x-3">
      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium text-gray-900">{label}</div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-medium">{value}</span>
          {change !== undefined && (
            <span className={`px-2 py-0.5 text-sm font-medium rounded-full ${
              change >= 0 ? 'text-positive bg-positive/5' : 'text-negative bg-negative/5'
            }`}>
              {formatPercentage(change)}
            </span>
          )}
        </div>
        {subtext && <div className="text-sm text-gray-500 mt-1">{subtext}</div>}
      </div>
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
        >
          Калькулятор эффективности ИИ-фотосессии
        </motion.h2>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
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
                <span className="text-base font-medium text-gray-900">
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
                <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
                  <Slider.Range className="absolute h-full rounded-full bg-primary/90" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <span className="text-base font-medium text-gray-900">
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
                <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
                  <Slider.Range className="absolute h-full rounded-full bg-primary/90" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <div className="flex items-center space-x-2">
                  <span className={`text-base font-medium ${
                    newCtr > currentCtr ? 'text-positive' : 'text-negative'
                  }`}>
                    {newCtr.toFixed(1)}%
                  </span>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    newCtr > currentCtr ? 'text-positive bg-positive/5' : 'text-negative bg-negative/5'
                  }`}>
                    {formatPercentage((newCtr - currentCtr) / currentCtr * 100)}
                  </span>
                </div>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                value={[newCtr]}
                onValueChange={([value]) => setNewCtr(value)}
                max={13.37}
                min={0.1}
                step={0.1}
              >
                <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
                  <Slider.Range className={`absolute h-full rounded-full ${
                    newCtr > currentCtr ? 'bg-positive/90' : 'bg-negative/90'
                  }`} />
                </Slider.Track>
                <Slider.Thumb
                  className={`block w-5 h-5 bg-white rounded-full shadow-sm border focus:outline-none focus:ring-2 ${
                    newCtr > currentCtr 
                      ? 'border-positive/20 focus:ring-positive/20' 
                      : 'border-negative/20 focus:ring-negative/20'
                  }`}
                  aria-label="CTR"
                />
              </Slider.Root>
            </div>

            {/* Метрики */}
            <div className="space-y-3 mt-8">
              <MetricCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                }
                label="Перешли в карточку"
                value={newClicks.toLocaleString()}
                change={((newClicks - currentClicks) / currentClicks * 100)}
                subtext={`${newCtr.toFixed(1)}% от показов`}
              />

              <MetricCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                label="Добавили в корзину"
                value={newCarts.toLocaleString()}
                change={((newCarts - currentCarts) / currentCarts * 100)}
                subtext={`${cartRate}% добавили в корзину`}
              />

              <MetricCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Заказали"
                value={`${newOrders.toLocaleString()} шт`}
                change={((newOrders - currentOrders) / currentOrders * 100)}
                subtext={`${orderRate}% заказали товаров`}
              />
            </div>

            {/* Конверсии */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-medium text-gray-700">
                    Конверсия в корзину
                  </label>
                  <span className="text-base font-medium text-gray-900">
                    {cartRate}%
                  </span>
                </div>
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                  value={[cartRate]}
                  onValueChange={([value]) => setCartRate(value)}
                  max={50}
                  min={1}
                  step={1}
                >
                  <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
                    <Slider.Range className="absolute h-full rounded-full bg-primary/90" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Конверсия в корзину"
                  />
                </Slider.Root>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-medium text-gray-700">
                    Конверсия в заказ
                  </label>
                  <span className="text-base font-medium text-gray-900">
                    {orderRate}%
                  </span>
                </div>
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                  value={[orderRate]}
                  onValueChange={([value]) => setOrderRate(value)}
                  max={100}
                  min={1}
                  step={1}
                >
                  <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
                    <Slider.Range className="absolute h-full rounded-full bg-primary/90" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Конверсия в заказ"
                  />
                </Slider.Root>
              </div>
            </div>
          </div>
        </div>

        {/* Результаты */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Результаты расчета
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
              <span className="text-gray-600">Рост CTR</span>
              <span className={`text-lg font-medium ${ctrGrowth > 0 ? 'text-positive' : 'text-negative'}`}>
                в {(1 + ctrGrowth).toFixed(2)} раза
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
              <span className="text-gray-600">Прирост заказов</span>
              <span className={`text-lg font-medium ${ordersGrowthFromCurrent > 0 ? 'text-positive' : 'text-negative'}`}>
                {formatPercentage(ordersGrowthFromCurrent)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-sm transition-all ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </motion.button>

          <Link to="/cases" className="block">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-white text-primary text-lg font-medium px-6 py-4 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
            >
              Посмотреть кейсы
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 