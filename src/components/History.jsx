import React, { useState } from 'react';
import axios from 'axios';
import '../styles/history.css';

const History = () => {
    const [date, setDate] = useState('');
    const [base, setBase] = useState('');
    const [target, setTarget] = useState('');
    const [rate, setRate] = useState(null);
    const [error, setError] = useState(null);

    const fetchHistoricalRate = async () => {
        if (date && base && target) {
            try {
                const response = await axios.get(`http://localhost:8080/historical/${date}`);
                console.log(response.data);
                // Assuming the API returns an object with the target currency rate
                setRate(response.data[target]);
                setError('');
            } catch (error) {
                setError('Error fetching historical rate');
                console.error('Error fetching historical rate', error);
            }
        }
    };

    return (
        <>
        <div className='history-wrapper'>
            <h2>Historical Exchange Rate</h2>
            <div>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Base Currency:
                    <input type="text" value={base} placeholder='Enter 3 Letter Code' onChange={(e) => setBase(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Target Currency:
                    <input type="text" value={target} placeholder='Enter 3 Letter Code' onChange={(e) => setTarget(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={fetchHistoricalRate}>Get Rate</button>
            {rate && (
                <div>
                    <h3>Exchange Rate on {date}:</h3>
                    <p>{base} to {target}: {rate}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default History;