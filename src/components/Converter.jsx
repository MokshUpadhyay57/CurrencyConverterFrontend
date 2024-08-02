import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/currencies');
                setCurrencies(Object.keys(response.data));
            } catch (err) {
                setError('Error fetching available currencies.');
            }
        };
        fetchCurrencies();
    }, []);

    const handleConvert = async () => {
        try {
            const response = await axios.get('http://localhost:8080/exchange-rates');

            // For Debugging
            // console.log(response.data);

            const rate = response.data[targetCurrency];
            const conversion = (amount * rate).toFixed(2);
            setExchangeRate(rate.toFixed(2));
            setConvertedAmount(conversion);
            setError(null);
        } catch (err) {
            setError('Error fetching conversion rate. Please try again.');
            setConvertedAmount(null);
        }
    };

    return (
        <div>
            <h2>Currency Converter</h2>
            <div>
                <label>
                    Base Currency:
                    <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Target Currency:
                    <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
            </div>
            <button onClick={handleConvert}>Convert</button>
            {convertedAmount !== null && (
                <div>
                    <h3>Converted Amount:</h3>
                    <p>
                        {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                        Exchange Rate: 1 {baseCurrency} = {exchangeRate} {targetCurrency}
                    </p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;