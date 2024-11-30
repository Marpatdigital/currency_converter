import React, { useState, useEffect } from "react";
import { getRates } from "../api/currencyApi";

const RatesPage = () => {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [rates, setRates] = useState({});

    useEffect(() => {
        const fetchRates = async () => {
            const ratesData = await getRates(baseCurrency);
            setRates(ratesData);
        };
        fetchRates();
    }, [baseCurrency]);

    return (
        <div>
            <h1>Курсы валют</h1>
            <label>
                Базовая валюта:
                <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>
            </label>
            <ul>
                {Object.keys(rates).map((currency) => (
                    <li key={currency}>
                        1 {baseCurrency} = {rates[currency].toFixed(2)} {currency}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RatesPage;
