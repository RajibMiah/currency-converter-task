# Currency Converter API

This API provides currency conversion capabilities by fetching real-time exchange rates from a third-party API. The solution includes routes, authentication middleware, and a service that interacts with an external currency exchange provider.

## Assumptions

- The user must provide valid `from` and `to` currency codes, as well as an amount to convert.
- The API key for ExchangeRate-API must be provided as an environment variable to fetch exchange rates.
- Proper authentication is required to access the currency conversion route.
- 
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
   - In the `ExchangeService.js`, replace the placeholder #API-key with your own key from [ExchangeRate-API]
   - Create a .env file in the root directory and add the following line:

   ```bash
      EXCHANGE_API_KEY=your_api_key_here
      EXCHANGE_RATE_API_URL = your_api_url
      In services/ExchangeService.js, update the base URL to use the environment variable:
   ```

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

---

### Service (`/services/exchangeService.js`)

The service handles the API call to ExchangeRate-API, fetches exchange rates, and performs the conversion logic.  
If the currency is not supported or the request fails, an error is thrown.

---

### Error Handling

- The API will throw an error if the exchange rate for the given currencies is not available.
- Errors related to the API fetch are handled gracefully with appropriate error messages.



