import React, { useState } from 'react';
import axios from 'axios';

const History = () => {
    const [date, setDate] = useState('');
    const [base, setBase] = useState('USD');
    const [symbols, setSymbols] = useState('EUR');
    const [rate, setRate] = useState('');

    const fetchHistoricalRate = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/historical/${date}`, {
                params: { app_id: 'db29836ee7554644a309e5489cb31ef6', 
                    base, symbols }
            });
            setRate(response.data.rates[symbols]);
        } catch (error) {
            console.error('Error fetching historical rate', error);
        }
    };

    return (
        <>
        <h2>Historical Exchange Rate</h2>
        <div>
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
        </div>
        <div>
            <label>
                Base Currency:
                <input
                    type="text"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                />
            </label>
        </div>
        <div>
            <label>
                Target Currency:
                <input
                    type="text"
                    value={symbols}
                    onChange={(e) => setSymbols(e.target.value)}
                />
            </label>
        </div>
        <button onClick={fetchHistoricalRate}>Get Rate</button>
        {rate && (
            <div>
                <h3>Exchange Rate on {date}:</h3>
                <p>{base} to {symbols}: {rate}</p>
            </div>
        )}
        </>
    );
};

export default History;
