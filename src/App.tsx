import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calculator } from './components/Calculator';
import { Cases } from './components/Cases';
import { Payment } from './components/Payment';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Инициализация Telegram WebApp
    WebApp.ready();
    // Расширяем на всю высоту
    WebApp.expand();
    // Устанавливаем основной цвет
    WebApp.setHeaderColor('#1E3A8A');
    // Показываем кнопку "Назад" в хедере
    WebApp.enableClosingConfirmation();
  }, []);

  return (
    <Router>
      <div className="min-h-[100vh] bg-gray-50">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
