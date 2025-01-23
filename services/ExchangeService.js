// Description: Service for fetching exchange rates from the API.

// Replace with your actual API key from ExchangeRate-API
const API_KEY =  process.env.API_KEY;
const BASE_URL = `${process.env.EXCHANGE_RATE_API_URL}${API_KEY}/latest`;

exports.getExchangeRate = async (from, to, amount) => {
    console.log("from:", from, "to:", to, "amount:", amount);
    try {
        // Fetch the exchange rates from the API
        const response = await fetch(`${BASE_URL}/${from}`);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching exchange rates: ${response.statusText}`);
        }
        
        // Parse the response as JSON
        const data = await response.json();
        const rates = data.conversion_rates;

        if (!rates[to]) {
            throw new Error(`Invalid currency code: ${to}`);
        }

        // Convert the amount
        const convertedAmount = (amount * rates[to]).toFixed(2);

        // Return the conversion result
        return {
            from,
            to,
            originalAmount: amount,
            convertedAmount,
            conversionRate: rates[to],
        };
    } catch (error) {
        throw new Error('Error fetching exchange rates or invalid data');
    }
};
