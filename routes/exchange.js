const express = require('express');
const router = express.Router();
const {ROLE} = require('../config/constant')
const AuthMiddleware = require('../middlewares/Authentication');
const exchangeController = require('../controllers/exchangeController');
//------------ Welcome Route ------------//

router.get('/', AuthMiddleware([ROLE.CUSTOMER, ROLE.SPONSOR, ROLE.OWNER]), exchangeController.getExchangeCurrency );


module.exports = router;