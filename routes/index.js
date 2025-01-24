const express = require('express');
const router = express.Router();
const {ROLE} = require('../config/constant');
const AuthMiddleware = require('../middlewares/Authentication');

const UserRouter = require('./user')
const NyxcipherRouter = require('./nyxcipher')
const ItemRouter = require('./item')
const TicketRouter = require('./ticket')
const PaymentRouter = require('./payment')
const AuthRouter = require('./auth')
const CurrencyConverterRouter = require('./exchange');
//------------ Welcome Route ------------//


/**
 * Main route file that connects the 'CurrencyConverterRouter' to the '/convert' endpoint.
 * 
 * This line sets up the '/convert' route in the app. Any incoming requests to `/api/convert`
 * will be handled by the `CurrencyConverterRouter` that you imported earlier.
 */

router.get('/', AuthMiddleware(["Customer", "Sponsor"]), (req, res) => {
    res.status(200).send({data: 'Welcome Oasis'});
});

router.use('/user', UserRouter);

router.use('/convert', CurrencyConverterRouter);
router.use('/nyxcipher', NyxcipherRouter);
router.use('/item', ItemRouter);
router.use('/ticket', TicketRouter);
router.use('/payment', PaymentRouter);
router.use('/auth', AuthRouter)

module.exports = router;