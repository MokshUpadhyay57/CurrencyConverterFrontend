import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState({});
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState('');
    const [curCode, setCurCode] = useState([]);



    // //Setting DropDown
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/currencies', {
                    params: {
                        appId: 'db29836ee7554644a309e5489cb31ef6' // Replace with your actual API key
                    }
                });
                setCurrencies(response.data);

                const ratesResponse = await axios.get('http://localhost:8080/exchange-rates', {
                    params: {
                        appId: 'db29836ee7554644a309e5489cb31ef6', // Replace with your actual API key
                        base:'USD'
                    }
                });
                const rates  = ratesResponse.data.rates;
                setCurCode(Object.keys(rates));
            } catch (error) {
                setError('Error fetching currencies');
                console.error(error);
            }
        };
        fetchCurrencies();
    }, []);


    // Function to convert currency using OpenExchangeRates Convert API
    const handleConvert = async () => {
        if (fromCurrency && toCurrency && amount) {
            try {
                const response = await axios.get(`http://localhost:8080/convert/${amount}/${fromCurrency}/${toCurrency}`, {
                    params: {
                        app_id: 'db29836ee7554644a309e5489cb31ef6' // Replace with your actual API key
                    }
                });
                setConvertedAmount(response.data.result.toFixed(2));
                setError('');
            } catch (error) {
                setError('Error converting currencies');
                console.error(error);
            }
        } else {
            setError('Please fill out all fields');
        }
    };
    return (
        <div>
            <h1>Currency Converter</h1>
            <div>
            <label>From:</label>
                <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {curCode.map((code) => (
                        <option key={code} value={code}>
                            {code} - {currencies[code]}
                        </option>
                    ))}
                </select>
            </div>
            <div>
            <label>To:</label>
                <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                    <option value="">Select Currency</option>
                    {curCode.map((code) => (
                        <option key={code} value={code}>
                            {code} - {currencies[code]}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <button onClick={handleConvert}>Convert</button>
            {convertedAmount !== null && (
                <div>
                    <h2>Converted Amount: {convertedAmount} {toCurrency}</h2>
                </div>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
          
        </div>
    );
};

export default CurrencyConverter;
