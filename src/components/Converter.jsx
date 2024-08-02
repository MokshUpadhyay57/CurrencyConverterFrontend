import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/converter.css';

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

     // Format number with commas and limit decimal places
     const formatNumber = (number) => {
        const num = Number(number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        console.log(num);
        return num.toString();
    };

    return (
        <div className='converter-wrapper'>
            <h2>Currency Converter</h2>
            <div className='input-wrapper'>
                <label>
                    Base Currency
                    <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Target Currency
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
                    <input type="text" value={amount} onChange={(e) => {
                            const value = e.target.value;
                                setAmount(value);
                            }
                        }
                    />
                </label>
            </div>
            <div>
                <button  className='button-wrapper' onClick={handleConvert}>Convert</button>

            </div>
            {convertedAmount !== null && (
                <div className='result-wrapper'>
                    <h3>Converted Amount:</h3>
                    <p>
                        {formatNumber(amount)} {baseCurrency} = {formatNumber(convertedAmount)} {targetCurrency}
                        <br/>
                        Exchange Rate: 1 {baseCurrency} = {formatNumber(exchangeRate)} {targetCurrency}
                    </p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;