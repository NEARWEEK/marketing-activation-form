const { answerWithContactsRef } = require('../../config/typeform');
const { getSettingValue } = require('../../services/settingsService');
const { getResponses } = require('../../services/typeformService');
const logger = require("../../utilities/logger");
const { reportError } = require("../../services/errorReportingService");
const MarketingRequestForm = require('./MarketingRequestFormModel');

const isOtherNearAccount = (req, marketingRequestForm) => {
  const nearAccountId = req.headers['x-near-account-id'];
  return marketingRequestForm.nearAccountId !== nearAccountId;
};

module.exports = {
  async getFormId(req, res) {
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

  async sendingForm(req, res) {
    try {
      const { typeformResponseId, typeformFormId } = req.body;
      const nearAccountId = req.headers['x-near-account-id'];
      logger.info(`Submitting Marketing Request Form: ${typeformResponseId}`);

      if (!typeformResponseId || !typeformFormId) {
        const message = 'Invalid form data';
        reportError(null, message);
        res.status(400).json({ message });
        return;
      }

      const responses = await getResponses(typeformFormId, typeformResponseId);
      let typeformResponseObject, clientContacts;
      if (responses?.length > 0) {
        typeformResponseObject = responses[0]?.answers;
        clientContacts = Array.isArray(typeformResponseObject) ?
          typeformResponseObject.find(
            element => element?.field?.ref === answerWithContactsRef
          )?.text :
          undefined;
      }

      let form = await MarketingRequestForm.findOne({ nearAccountId, typeformFormId });
      if (form) {
        form.typeformResponseId = typeformResponseId;
        form.typeformResponseObject = typeformResponseObject;
        form.clientContacts = clientContacts;
        form.daoProposalId = undefined;
        form.daoProposalStatus = undefined;
        form.daoBountyId = undefined;
        form.trelloIssueId = undefined;
        form.trelloIssueStatus = undefined;
      } else {
        form = new MarketingRequestForm({
          nearAccountId,
          typeformFormId,
          typeformResponseId,
          typeformResponseObject,
          clientContacts,
        });
      }
      form = await form.save();

      res.json({ id: form.id });

    } catch (error) {
      reportError(error, 'Error processing submitted form');
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      logger.info(`Showing Marketing Request Form: ${id}`);
      const marketingRequestForm = await MarketingRequestForm.findOne({ id });

      if (!marketingRequestForm) {
        const message = 'No such Marketing Request Form under this ID';
        reportError(null, message);
        res.status(404).json({ message });
        return;
      }

      if (isOtherNearAccount(req, marketingRequestForm)) {
        const message = 'This entry belongs to another account';
        reportError(null, message);
        res.status(403).json({ message });
        return;
      }

      res.json({ marketingRequestForm });

    } catch (error) {
      reportError(error, 'Could not get marketing form');
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async updateProposalId(req, res) {
    try {
      const { id, daoProposalId } = req.body;
      logger.info(`Update proposal ID in the Form: ${id}`);
      let marketingRequestForm = await MarketingRequestForm.findOne({ id });

      if (!marketingRequestForm) {
        const message = 'No such Marketing Request Form under this ID';
        reportError(null, message);
        res.status(404).json({ message });
        return;
      }

      if (marketingRequestForm.daoProposalId) {
        const message = 'An proposal ID is already set in this entry';
        reportError(null, message);
        res.status(400).json({ message });
        return;
      }

      if (isOtherNearAccount(req, marketingRequestForm)) {
        const message = 'This entry belongs to another account';
        reportError(null, message);
        res.status(403).json({ message });
        return;
      }

      marketingRequestForm.daoProposalId = daoProposalId;
      marketingRequestForm.daoProposalStatus = 'InProgress';
      marketingRequestForm = await marketingRequestForm.save();

      res.json({ marketingRequestForm });

    } catch (error) {
      reportError(error, 'Failed to update marketing form');
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async updateIssueId(req, res) {
    try {
      const { id, trelloIssueId } = req.body;
      logger.info(`Update issue ID in the Form: ${id}`);
      let marketingRequestForm = await MarketingRequestForm.findOne({ id });

      if (!marketingRequestForm) {
        const message = 'No such Marketing Request Form under this ID';
        reportError(null, message);
        res.status(404).json({ message });
        return;
      }

      if (!marketingRequestForm.daoProposalId) {
        const message = 'This entry does not yet have an proposal ID';
        reportError(null, message);
        res.status(400).json({ message });
        return;
      }

      if (marketingRequestForm.trelloIssueId) {
        const message = 'An issue ID is already set in this entry';
        reportError(null, message);
        res.status(400).json({ message });
        return;
      }

      if (isOtherNearAccount(req, marketingRequestForm)) {
        const message = 'This entry belongs to another account';
        reportError(null, message);
        res.status(403).json({ message });
        return;
      }

      marketingRequestForm.trelloIssueId = trelloIssueId;
      marketingRequestForm = await marketingRequestForm.save();

      res.json({ marketingRequestForm });

    } catch (error) {
      reportError(error, 'Failed to update marketing form');
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
