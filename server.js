// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();

// Debug Middleware
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// Health Check
app.get('/health', (req, res) => {
    console.log("Health check passed");
    res.status(200).send('OK');
});

// 1. Database Configuration
const dbConfig = {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'locus_app',
};

// Add socket path if available (GCP), otherwise use host (Local)
if (process.env.INSTANCE_UNIX_SOCKET) {
    dbConfig.socketPath = process.env.INSTANCE_UNIX_SOCKET;
} else {
    dbConfig.host = process.env.DB_HOST || '127.0.0.1';
}

// 2. API Endpoint
app.get('/api/books', async (req, res) => {
    try {
        console.log("Connecting to DB with config:", JSON.stringify({ ...dbConfig, password: '***' }));
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT "The Great Gatsby" as title, "F. Scott Fitzgerald" as author');
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error("Locus DB Error:", err);
        res.status(500).json({ error: 'Locus Database Disconnected', details: err.message });
    }
});

// Serve React Files
app.use(express.static(path.join(__dirname, 'client/build')));

// Explicit Root Route
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'client/build', 'index.html');
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
});

// Catch-All (Regex for Express 5)
app.get(/.*/, (req, res) => {
    const indexPath = path.join(__dirname, 'client/build', 'index.html');
    console.log("Serving catch-all index.html from:", indexPath);
    res.sendFile(indexPath);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`LOCUS Server running on port ${PORT}`);
});
