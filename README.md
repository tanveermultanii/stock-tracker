# StockTracker

A real-time stock tracking web app that fetches and displays live stock prices, historical data, and charts based on user input.

## Features
- Search real-time stock quotes (price, change, % change)
- View 7-day historical trend in a line chart
- Light/Dark mode toggle

## Tech Stack
**Frontend:** React, Chart.js, Tailwind CSS, CRACO  
**Backend:** Node.js, Express  
**API:** Yahoo Finance (via `yahoo-finance2` npm package)  

## Getting Started

### Backend
```bash
cd stock-tracker
npm install
node server.js

### Frontend
cd stock-tracker-client
npm install
npm start

Visit the app locally: http://localhost:3000