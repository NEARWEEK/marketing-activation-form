const express = require('express');

const router = express.Router();
const MarketingRequestFormController = require('./MarketingRequestFormController');

router.get('/form-id', MarketingRequestFormController.getTypeformId);

module.exports = router;
