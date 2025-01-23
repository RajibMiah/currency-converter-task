// Description: This file contains the exchange controller logic.
const ExchangeService = require('../services/exchangeService');

exports.getExchangeCurrency = async (req, res) => {
    try {
        const { from, to, amount } = req.query;

        if (!from || !to || !amount) {
            return res.status(400).json({ error: 'Missing required parameters (from, to, amount).' });
        }

        // Get the converted amount from the ExchangeService
        const result = await ExchangeService.getExchangeRate(from, to, amount);
      
        // Return the result
        res.status(200).json(result);
    } catch (error) {
        // console.error('Error during currency conversion:', error);
        res.status(500).json({ error: 'An error occurred while fetching exchange rates.' });
    }
};
