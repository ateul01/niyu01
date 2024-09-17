// admin.js - Admin route for price updates
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const pricesFilePath = path.join(__dirname, '../data/categories.json'); // Path to the JSON file storing the prices

// Load prices from the JSON file
router.get('/prices', (req, res) => {
    fs.readFile(pricesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading prices data' });
        }
        res.json(JSON.parse(data));
    });
});

// Update prices
router.post('/update-prices', (req, res) => {
    const newPrices = req.body;
    fs.writeFile(pricesFilePath, JSON.stringify(newPrices, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving prices' });
        }
        res.json({ message: 'Prices updated successfully' });
    });
});

module.exports = router;
