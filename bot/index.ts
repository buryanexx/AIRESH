import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

// Проверяем наличие токена
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('Ошибка: TELEGRAM_BOT_TOKEN не найден в .env файле');
  process.exit(1);
}

// Инициализируем бота
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// URL вашего веб-приложения
const webAppUrl = process.env.APP_URL || 'https://yourdomain.com';

// Функция для логирования
const log = (message: string, data?: any) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? data : '');
};

// Обработчик команды /start
bot.start(async (ctx) => {
  try {
    const firstName = ctx.from?.first_name || 'гость';
    log(`Пользователь ${ctx.from?.id} (${firstName}) запустил бота`);
    
    await ctx.reply(
      `Привет, ${firstName}! 👋\n\nЯ бот для оценки эффективности ИИ-фотосессии для вашего товара на маркетплейсе.\n\nРассчитайте, как новые фото могут увеличить ваши продажи:`,
      Markup.keyboard([
        Markup.button.webApp('📊 Открыть калькулятор', webAppUrl),
        Markup.button.webApp('🔍 Посмотреть кейсы', `${webAppUrl}/cases`),
      ]).resize()
    );
  } catch (error) {
    log('Ошибка в команде /start:', error);
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
  }
});

// Обработчик команды /calculator
bot.command('calculator', async (ctx) => {
  try {
    log(`Пользователь ${ctx.from?.id} запросил калькулятор`);
    await ctx.reply(
      '📊 Рассчитайте эффективность ИИ-фотосессии:',
      Markup.inlineKeyboard([
        Markup.button.webApp('Открыть калькулятор', webAppUrl)
      ])
    );
  } catch (error) {
    log('Ошибка в команде /calculator:', error);
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
  }
});

// Обработчик команды /cases
bot.command('cases', async (ctx) => {
  try {
    log(`Пользователь ${ctx.from?.id} запросил кейсы`);
    await ctx.reply(
      '🔍 Ознакомьтесь с нашими успешными кейсами:',
      Markup.inlineKeyboard([
        Markup.button.webApp('Посмотреть кейсы', `${webAppUrl}/cases`)
      ])
    );
  } catch (error) {
    log('Ошибка в команде /cases:', error);
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
  }
});

// Обработчик для получения данных от веб-приложения
bot.on('web_app_data', async (ctx) => {
  try {
    const data = ctx.webAppData?.data;
    if (!data) {
      throw new Error('Данные не получены');
    }
    
    log(`Получены данные от веб-приложения от пользователя ${ctx.from?.id}:`, data);
    
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    
    await ctx.reply(
      `✅ Мы получили вашу заявку!\n\n` +
      `📊 CTR: ${parsedData.ctr}%\n` +
      `📈 Прогнозируемый рост заказов: ${parsedData.ordersGrowth}%\n\n` +
      `Наш менеджер свяжется с вами в ближайшее время для обсуждения деталей.`
    );
  } catch (error) {
    log('Ошибка при обработке данных веб-приложения:', error);
    await ctx.reply('❌ Произошла ошибка при обработке данных. Пожалуйста, попробуйте снова.');
  }
});

// Обработчик любых текстовых сообщений
bot.on('text', async (ctx) => {
  try {
    log(`Пользователь ${ctx.from?.id} отправил текстовое сообщение: ${ctx.message.text}`);
    await ctx.reply(
      'Выберите одну из доступных опций:',
      Markup.keyboard([
        Markup.button.webApp('📊 Открыть калькулятор', webAppUrl),
        Markup.button.webApp('🔍 Посмотреть кейсы', `${webAppUrl}/cases`),
      ]).resize()
    );
  } catch (error) {
    log('Ошибка при обработке текстового сообщения:', error);
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
  }
});

// Обработчик ошибок
bot.catch((err, ctx) => {
  log('Ошибка в боте:', err);
  ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
});

// Запускаем бота
bot.launch().then(() => {
  log('Бот успешно запущен!');
}).catch((error) => {
  log('Ошибка при запуске бота:', error);
  process.exit(1);
});

// Плавное завершение работы при отключении
process.once('SIGINT', () => {
  log('Получен сигнал SIGINT, останавливаем бота...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  log('Получен сигнал SIGTERM, останавливаем бота...');
  bot.stop('SIGTERM');
}); 