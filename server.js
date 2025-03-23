const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default; 

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/stock/:ticker', async (req, res) => {
    const { ticker } = req.params;
    console.log(`Fetching real-time data for ${ticker} from Yahoo Finance`);

    try {
        const quote = await yahooFinance.quote(ticker);

        if (!quote) {
            console.log(`No data found for ${ticker}`);
            return res.status(404).json({ error: 'Stock data not found' });
        }

        res.json({
            "01. symbol": ticker,
            "05. price": quote.regularMarketPrice,
            "09. change": quote.regularMarketChange.toFixed(2),
            "10. change percent": quote.regularMarketChangePercent.toFixed(2) + "%"
        });
    } catch (error) {
        console.error(`Error fetching real-time data for ${ticker}:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/stock/:ticker/history', async (req, res) => {
    const { ticker } = req.params;
    console.log(`Fetching 7-day historical data for ${ticker} from Yahoo Finance`);

    try {
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const history = await yahooFinance.historical(ticker, {
            period1: oneWeekAgo.toISOString().split('T')[0],  // start date
            period2: today.toISOString().split('T')[0],       // end date
            interval: '1d'
        });

        if (!history || history.length === 0) {
            console.log(`No historical data found for ${ticker}`);
            return res.status(404).json({ error: 'Historical data not found.' });
        }

        const formattedHistory = history.map(day => ({
            date: day.date.toISOString().split('T')[0],
            price: day.close
        }));

        res.json(formattedHistory);
    } catch (error) {
        console.error(`Error fetching historical data for ${ticker}:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});