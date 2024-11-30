import axios from "axios";

const API_URL = "https://api.exchangerate-api.com/v4/latest";

export const getRates = async (baseCurrency) => {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    return response.data.rates;
};

export const convertCurrency = async (amount, from, to) => {
    const rates = await getRates(from);
    return amount * rates[to];
};
