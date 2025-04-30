import { motion } from 'framer-motion';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Link, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { GetPhotoshootButton } from './GetPhotoshootButton';

export const Calculator = () => {
  const navigate = useNavigate();
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

  // Обновляем обработчик для перехода на страницу оплаты
  const handleSubmit = () => {
    navigate('/payment');
  };

  const MetricCard = ({ icon, label, value, change, subtext }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    change?: number;
    subtext?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 flex items-start space-x-3">
      <div className="w-8 h-8 rounded-lg bg-[#F8BFFF] bg-opacity-10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium text-gray-900">{label}</div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-medium">{value}</span>
          {change !== undefined && (
            <span className={`px-2 py-0.5 text-sm font-medium rounded-full ${
              change >= 0 ? 'text-[#2AAB27] bg-[#2AAB27]/5' : 'text-negative bg-negative/5'
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
      className="min-h-screen bg-gray-50 p-4 pb-20"
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="space-y-6">
            {/* Показы */}
            <div>
              <div className="flex flex-col space-y-1">
                <label className="block text-base font-medium text-gray-700">
                  Количество показов
                </label>
                <span className="text-sm text-gray-500">
                  Введите среднее количество показов вашего товара
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
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  <span className="text-base font-medium text-accent">
                    {newCtr.toFixed(1)}%
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-accent/10 text-accent">
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
                  <Slider.Range className="absolute h-full rounded-full bg-accent" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm border border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  aria-label="CTR"
                />
              </Slider.Root>
            </div>

            {/* Метрики */}
            <div className="space-y-px">
              <div className="bg-white rounded-t-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE0F4] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#FF2D87]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Перешли в карточку</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-medium">{newClicks.toLocaleString()}</span>
                        <span className="text-[#2AAB27] text-sm bg-[#2AAB27]/10 px-2 py-0.5 rounded-full">
                          {formatPercentage(((newClicks - currentClicks) / currentClicks * 100))}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{newCtr.toFixed(1)}% от показов</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBE5FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#6F3AFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Добавили в корзину</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-medium">{newCarts.toLocaleString()}</span>
                        <span className="text-[#2AAB27] text-sm bg-[#2AAB27]/10 px-2 py-0.5 rounded-full">
                          {formatPercentage(((newCarts - currentCarts) / currentCarts * 100))}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{cartRate}% добавили в корзину</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-b-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E2F5FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0EA5E9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Заказали</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-medium">{newOrders.toLocaleString()} шт</span>
                        <span className="text-[#2AAB27] text-sm bg-[#2AAB27]/10 px-2 py-0.5 rounded-full">
                          {formatPercentage(((newOrders - currentOrders) / currentOrders * 100))}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{orderRate}% заказали товаров</div>
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
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-full shadow-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              <span className="text-lg font-medium text-[#2AAB27]">
                в {(1 + ctrGrowth).toFixed(2)} раза
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
              <span className="text-gray-600">Прирост заказов</span>
              <span className="text-lg font-medium text-[#2AAB27]">
                {formatPercentage(((newCtr - currentCtr) / currentCtr) * 100)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSubmit}
            className="w-full bg-primary text-white text-lg font-medium px-6 py-4 rounded-xl shadow-sm hover:bg-opacity-90 transition-all"
          >
            Получить фотосессию
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