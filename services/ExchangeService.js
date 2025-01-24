// Description: Service for fetching exchange rates from the ExchangeRate-API and performing currency conversion

// Import required libraries
// Replace with your actual API key from ExchangeRate-API
const API_KEY = process.env.EXCHANGE_API_KEY; // API key for authentication with ExchangeRate-API
const BASE_URL = `${process.env.EXCHANGE_RATE_API_URL}${API_KEY}/latest`; // The base URL to get the latest exchange rates

/**
 * Fetches the exchange rate for a specific currency pair and converts an amount.
 *
 * @param {string} from - The currency to convert from (e.g., USD).
 * @param {string} to - The currency to convert to (e.g., EUR).
 * @param {number} amount - The amount to convert (e.g., 100).
 * @returns {Object} - An object containing the original and converted amount, along with the conversion rate.
 * @throws {Error} - Throws an error if the API call fails or if invalid data is encountered.
 */
exports.getExchangeRate = async (from, to, amount) => {
    try {
        // Fetch the exchange rates from the API
        const response = await fetch(`${BASE_URL}/${from}`); // Fetching data for the 'from' currency
        
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            // If the response is not successful, throw an error with the status text
            throw new Error(`Error fetching exchange rates: ${response.statusText}`);
        }

        // Parse the response as JSON to extract exchange rates
        const data = await response.json();
        const rates = data.conversion_rates; // Extract conversion rates from the response

        // Check if the 'to' currency is available in the response data
        if (!rates[to]) {
            // If the 'to' currency is not found in the conversion rates, throw an error
            throw new Error(`Invalid currency code: ${to}`);
        }

        // Perform the currency conversion: amount * exchange rate
        const convertedAmount = (amount * rates[to]).toFixed(2); // The result is rounded to 2 decimal places

        // Return the conversion result as an object
        return {
            from, // The currency we are converting from
            to, // The currency we are converting to
            originalAmount: amount, // The original amount entered by the user
            convertedAmount, // The converted amount in the 'to' currency
            conversionRate: rates[to], // The exchange rate used for conversion
        };
    } catch (error) {
        // If an error occurs during the API fetch or data processing, throw a descriptive error
        throw new Error('Error fetching exchange rates or invalid data');
    }
};
