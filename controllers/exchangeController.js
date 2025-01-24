// Description: This file contains the exchange controller logic for handling the currency conversion request.

const ExchangeService = require('../services/ExchangeService'); 

/**
 * Handles the GET request for currency conversion.
 * 
 * @param {Object} req - The request object containing the query parameters (from, to, amount).
 * @param {Object} res - The response object to send back the result or error.
 */
exports.getExchangeCurrency = async (req, res) => {
    try {
        // Destructure the query parameters 'from', 'to', and 'amount' from the request
        const { from, to, amount } = req.query;
        // Validate the presence of required query parameters
        if (!from || !to || !amount) {
            // If any required parameter is missing, return a 400 Bad Request with an error message
            return res.status(400).json({ error: 'Missing required parameters (from, to, amount).' });
        }

        // Call the getExchangeRate function from the ExchangeService to get the converted amount
        const result = await ExchangeService.getExchangeRate(from, to, amount);
        
        // If successful, return a 200 OK response with the conversion result
        res.status(200).json(result);
    } catch (error) {
        // Log any error (optional) for debugging purposes: console.error('Error during currency conversion:', error);
        
        // If any error occurs during the process, return a 500 Internal Server Error with an error message
        res.status(500).json({ error: 'An error occurred while fetching exchange rates.' });
    }
};
