import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    const match = query.match(/(\d+(\.\d+)?)\s?(\w{3})\s?in\s?(\w{3})/i);
    if (!match) {
      setError('Введите запрос в формате: 15 USD in RUB');
      setResult(null);
      return;
    }

    const amount = parseFloat(match[1]);
    const fromCurrency = match[3].toUpperCase();
    const toCurrency = match[4].toUpperCase();

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (rate) {
        setResult((amount * rate).toFixed(2));
        setError('');
      } else {
        setError('Неверная целевая валюта.');
        setResult(null);
      }
    } catch (err) {
      setError('Ошибка при получении данных. Проверьте правильность введенных валют.');
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Конвертер валют</h1>
      <input
        type="text"
        placeholder="15 USD in RUB"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleConvert}>Конвертировать</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>Результат: {result} {query.split(' ')[3].toUpperCase()}</p>}
    </div>
  );
};

export default CurrencyConverter;
