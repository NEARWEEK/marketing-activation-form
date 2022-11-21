//const MarketingRequestForm = require('./MarketingRequestFormModel');
const { getSettingValue } = require('../../services/settingsService');
const {reportError} = require("../../services/errorReportingService");

module.exports = {
  async getTypeformId(req, res) {
    try {
      const formId = await getSettingValue('TypeformID');
      res.json({ formId });

    } catch (error) {
      reportError(error, 'Failed to get form ID');
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
