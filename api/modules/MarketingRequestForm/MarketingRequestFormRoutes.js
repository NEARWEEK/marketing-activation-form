const express = require('express');

const router = express.Router();
const MarketingRequestFormController = require('./MarketingRequestFormController');

router.get('/form-id', MarketingRequestFormController.getFormId);

router.post('/sending-form', MarketingRequestFormController.sendingForm);

router.get('/:id', MarketingRequestFormController.show);

router.put('/update-proposal-id', MarketingRequestFormController.updateProposalId);

module.exports = router;
