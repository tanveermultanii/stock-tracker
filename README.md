# Stock Tracker

A real-time stock tracking web app that fetches and displays live stock prices, historical data, and charts based on user input.

**Live Demo:**  
[https://stock-tracker-five-livid.vercel.app](https://stock-tracker-five-livid.vercel.app)

## Features
- Search real-time stock quotes (price, change, % change)
- View 7-day historical trend in a line chart
- Light/Dark mode toggle

## Tech Stack
**Frontend:** React, Chart.js, Tailwind CSS, CRACO  
**Backend:** Node.js, Express  
**API:** Yahoo Finance (via `yahoo-finance2` npm package)  

## Deployment

| Layer     | Platform | URL |
|-----------|----------|-----|
| Frontend  | Vercel   | [vercel.app](https://stock-tracker-five-livid.vercel.app) |
| Backend   | Render   | [render.com](https://stock-tracker-3li7.onrender.com) |

Environment variables used:
```env
REACT_APP_API_URL = https://stock-tracker-3li7.onrender.com
```

## Getting Started Locally
### Backend
```bash
cd stock-tracker
npm install
node server.js
```

### Frontend
```bash
cd stock-tracker-client
npm install
npm start
```

Access locally at: http://localhost:3000
