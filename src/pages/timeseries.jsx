import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const TimeSeries = ({ baseCurrency = 'USD', targetCurrency = 'EUR', startDate = '2023-11-01', endDate = '2023-12-15' }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTimeSeriesData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/timeseries', {
                    params: {
                        app_id: 'db29836ee7554644a309e5489cb31ef6', // Replace with your actual API key
                        start: startDate,
                        end: endDate,
                        symbols: targetCurrency,
                        base: baseCurrency
                    }
                });

                const rates = response.data.rates;
                const labels = Object.keys(rates);
                const dataValues = labels.map(date => rates[date][targetCurrency]);

                setData({
                    labels,
                    datasets: [{  
                        label: `${baseCurrency} to ${targetCurrency}`,
                        data: dataValues,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                    }]
                });

            } catch (error) {
                setError('Error fetching time series data');
                console.error(error);
            }
        };

        fetchTimeSeriesData();
    }, [baseCurrency, targetCurrency, startDate, endDate]);

    return (
        <>
            <h1>Exchange Rate Time Series</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {data.labels && (
                <Line
                    data={data}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    tooltipFormat: 'll',
                                },
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Exchange Rate',
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return `${context.dataset.label}: ${context.raw}`;
                                    }
                                }
                            }
                        }
                    }}
                />
            )}
        </>
    );
};

export default TimeSeries;
