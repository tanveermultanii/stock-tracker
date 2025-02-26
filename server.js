const express = require('express'); // framework for creating the server
const axios = require('axios'); // axios for making HTTP requests to external APIs
const cors = require('cors'); // CORS middleware to handle cross-origin requests

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = 'ZTRIKEFV0111FU2S'; 

// middleware setup
app.use(cors());
app.use(express.json());

// endpoint to fetch stock data form Alpha Vantage API
app.get('/api/stock/:ticker', async (req, res) => {
    const { ticker } = req.params;
    try {
        // make a request to Alpha Vantage's GLOBAL_QUOTE API endpoint
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: ticker,
                apikey: API_KEY
            }
        });

        const data = response.data; // extract response data

        // check if valid stock data is returned
        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
            res.json(data['Global Quote']); // send the stock data as JSON response
        } else {
            res.status(404).json({ error: 'Stock data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
