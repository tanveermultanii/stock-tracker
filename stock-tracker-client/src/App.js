import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function StockChart({ data, darkMode }) {
    if (data.length === 0) return null;

    const chartData = {
        labels: data.map(day => day.date),
        datasets: [
            {
                label: 'Price (USD)',
                data: data.map(day => day.price),
                borderColor: '#3182ce',
                backgroundColor: 'rgba(56, 161, 105, 0.2)',
                tension: 0.2,
            },
        ],
    };

    const options = {
        plugins: { legend: { display: false } },
        scales: {
            x: {
                ticks: {
                    color: darkMode ? '#ffffff' : '#1a202c', 
                },
                grid: {
                    color: darkMode ? 'rgba(255,255,255,0.2)' : '#e2e8f0', 
                },
            },
            y: {
                ticks: {
                    color: darkMode ? '#ffffff' : '#1a202c',
                },
                grid: {
                    color: darkMode ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                },
            },
        }
    };

    return <Line data={chartData} options={options} />;
}

function App() {
    const [ticker, setTicker] = useState("");
    const [stockData, setStockData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStockData(null);
        setHistoricalData([]);
        setLoading(true);

        try {
            const stockResponse = await axios.get(`${API_BASE}/api/stock/${ticker}`);
            setStockData(stockResponse.data);

            const historyResponse = await axios.get(`${API_BASE}/api/stock/${ticker}/history`);
            setHistoricalData(historyResponse.data);
        } catch (err) {
            console.error(err);
            setError(getRandomErrorMessage());
        } finally {
            setLoading(false);
        }
    };

    const getRandomErrorMessage = () => {
        const messages = [
            "Oopsie, couldn't find that stock!",
            "Stock not found — is this some new meme coin? 🐕",
            "That ticker seems sus... 👀 Try again!",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const isPositiveChange = stockData && parseFloat(stockData["09. change"]) >= 0;

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="toggle-container">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="dark-mode-toggle"
                >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>

            <h1 className="title">Stock Tracker</h1>

            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter stock ticker"
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {loading && <div className="spinner"></div>}

            {stockData && (
                <div className="stock-card">
                    <h2>{ticker.toUpperCase()}</h2>
                    <p><strong>Price:</strong> ${stockData["05. price"]}</p>
                    <p className={isPositiveChange ? 'positive-change' : 'negative-change'}>
                        <strong>Change:</strong> {stockData["09. change"]}
                    </p>
                    <p className={isPositiveChange ? 'positive-change' : 'negative-change'}>
                        <strong>Change Percent:</strong> {stockData["10. change percent"]}
                    </p>

                    <StockChart data={historicalData} darkMode={darkMode} />
                </div>
            )}
        </div>
    );
}

export default App;
