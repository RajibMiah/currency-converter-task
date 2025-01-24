const express = require('express');
const router = express.Router();
const {ROLE} = require('../config/constant')
const AuthMiddleware = require('../middlewares/Authentication');
const exchangeController = require('../controllers/exchangeController');


//------------ Welcome Route ------------//

/**
 * GET /api/convert - Route for performing currency conversion.
 * 
 * This route is protected by authentication middleware, allowing only users
 * with the roles of CUSTOMER, SPONSOR, or OWNER to access it. The controller 
 * method 'getExchangeCurrency' handles the conversion logic.
 */
router.get('/', 
    AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), // Authentication middleware that checks user roles
    exchangeController.getExchangeCurrency // Controller method that handles the currency conversion logic
);

// Export the router so it can be used in other parts of the application
module.exports = router;