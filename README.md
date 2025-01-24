# Currency Converter API

This API provides currency conversion capabilities by fetching real-time exchange rates from a third-party API. The solution includes routes, authentication middleware, and a service that interacts with an external currency exchange provider.

## Assumptions

- The user must provide valid `from` and `to` currency codes, as well as an amount to convert.
- The API key for ExchangeRate-API must be provided as an environment variable to fetch exchange rates.
- Proper authentication is required to access the currency conversion route.
  
## **Table of Contents**

- [Project Structure](#project-structure)
  - [API](#api)
    - [Routes](#routes)
      - [index.js](#indexjs)
      - [exchange.js](#convertjs)
    - [Controllers](#controllers)
      - [exchangeController.js](#exchangecontrollerjs)
    - [Middlewares](#middlewares)
      - [Authentication.js](#authenticationjs)
    - [Services](#services)
      - [ExchangeService.js](#exchangeservicejs)
    - [Config](#config)
      - [constant.js](#constantjs)
  - [Root Files](#root-files)
    - [app.js](#appjs)


## Setup Instructions

### Prerequisites

Before running the application, ensure you have the following:

- [Node.js version 20 or higher](https://nodejs.org/) installed on your machine.
- A valid API key from [ExchangeRate-API](https://www.exchangerate-api.com/).
- Express.js installed via npm.

### Steps to Run the Application

1. **Clone the repository and install dependencies:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   npm install
   ```
 
3.**Set up your ExchangeRate-API key**:

   - Go to ExchangeRate-API and sign up for an account.
   - Create a .env file in the root directory and add the following line:
    ```bash
      EXCHANGE_API_KEY=your_api_key_here
      EXCHANGE_RATE_API_URL = your_api_url
      In services/ExchangeService.js,will update the base URL to use the environment variable:
     ```

   - In the `ExchangeService.js`, replace the placeholder #API-key with your own key from [ExchangeRate-API]
  

  

4. **Start the application:**

   - For development mode (with hot-reloading):

     ```bash
     npm run dev
     ```

   - For production mode:

     ```bash
     npm start
     ```

5. The server should now be running at `http://localhost:5000`.

## API Endpoints

### `GET /api/convert`

- Converts a given amount of currency to another currency.
- **Request Parameters:**

  - `from` (String): The base currency code (e.g., `USD`).
  - `to` (String): The target currency code (e.g., `EUR`).
  - `amount` (Number): The amount to convert.

- **Response:**
  - `from`: The base currency code.
  - `to`: The target currency code.
  - `originalAmount`: The original amount provided.
  - `convertedAmount`: The converted amount in the target currency.
  - `conversionRate`: The exchange rate used for conversion.

**Example:**

Request:

```bash
GET /api/convert?from=USD&to=EUR&amount=100
```
```bash
Response:

{
  "from": "USD",
  "to": "EUR",
  "originalAmount": 100,
  "convertedAmount": 85.50,
  "conversionRate": 0.855
}'
```


## Code Explanation

### Routes (`/routes/index.js`)

The `/api` route is defined and connected to the `CurrencyConverterRouter` in `routes/index.js`.  
This router handles the `GET /convert` request.

---

### Middleware (`/middlewares/Authentication.js`)

Authentication middleware is used to protect the `/api/convert` route.  
Only users with roles of `CUSTOMER`, `SPONSOR`, or `OWNER` are allowed to access the currency conversion functionality.

---

### Controller (`/controllers/exchangeController.js`)

The controller contains the logic for handling the route and invoking the service to fetch the exchange rate.
```
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
```

---

### Service (`/services/ExchangeService.js`)

The service handles the API call to ExchangeRate-API, fetches exchange rates, and performs the conversion logic.  
If the currency is not supported or the request fails, an error is thrown.
```
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
```
---

### Error Handling

- The API will throw an error if the exchange rate for the given currencies is not available.
- Errors related to the API fetch are handled gracefully with appropriate error messages.



