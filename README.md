# Currency Converter API

This API allows users to convert currency from one type to another using real-time exchange rates fetched from a third-party API. The solution consists of a set of routes, middleware, and a service to interact with an external exchange rate provider.

## Features

- Convert currency between supported currencies using real-time exchange rates.
- Authentication middleware for protecting routes based on user roles (Customer, Sponsor, Owner).
- Fetch exchange rates from ExchangeRate-API.

## Assumptions

- The user must provide valid `from` and `to` currency codes, as well as an amount to convert.
- The API key for ExchangeRate-API must be provided in the service for fetching exchange rates.
- Proper authentication is required to access the currency conversion route.

## Folder Structure

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- A valid API key from [ExchangeRate-API](https://www.exchangerate-api.com/).
- Express.js installed.

### Steps to Run the Application

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your API key:**

   - In the `exchangeService.js`, replace the placeholder #API-key with your own key from [ExchangeRate-API]

4. **Start the application:**

   ```bash
   npm start
   ```

5. The server should now be running at `http://localhost:3000`.

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


Response:

json
Copy
Edit
{
  "from": "USD",
  "to": "EUR",
  "originalAmount": 100,
  "convertedAmount": 85.50,
  "conversionRate": 0.855
}
Code Explanation
Routes (/routes/index.js)
The /api route is defined and connected to the CurrencyConverterRouter in routes/index.js. This router handles the GET /convert request.

Middleware (/middlewares/Authentication.js)
Authentication middleware is used to protect the /api/convert route. Only users with roles of CUSTOMER, SPONSOR, or OWNER are allowed to access the currency conversion functionality.

Controller (/controllers/exchangeController.js)
The controller contains the logic for handling the route and invoking the service to fetch the exchange rate.

Service (/services/exchangeService.js)
The service handles the API call to ExchangeRate-API, fetches exchange rates, and performs the conversion logic. If the currency is not supported or the request fails, an error is thrown.

Error Handling
The API will throw an error if the exchange rate for the given currencies is not available.
Errors related to the API fetch are handled gracefully with appropriate error messages.
Technologies Used
Node.js
Express.js
Fetch API (for API calls)
Authentication Middleware
License
This project is licensed under the MIT License - see the LICENSE file for details.

vbnet
Copy
Edit

This version now includes the properly formatted folder structure within the markdown. Let me know if there
```
