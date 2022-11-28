const cron = require('node-cron');

const config = require('../config/cron');
const { daoConfig } = require('../config/near');
const MarketingRequestForm = require('../modules/MarketingRequestForm/MarketingRequestFormModel');
const { reportError } = require('./errorReportingService');
const { updateTrelloIssue } = require("./trelloService");

const updateTrelloIssuesStatus = async (app) => {
  try {
    const { account } = app.get('near');
    const daoContractId = daoConfig.contractName;
    const forms = await MarketingRequestForm.find({
      daoProposalStatus: 'InProgress',
      daoContractId,
      daoProposalId: {$exists: true},
    });

    for (const form of forms) {
      let proposal, status;

      try {
        proposal = await account.viewFunction(
          daoContractId,
          'get_proposal',
          { id: Number(form.daoProposalId) }
        );
      } catch (error) {
        reportError(error, 'No proposal found');
        if (error.message.includes('ERR_NO_PROPOSAL')) {
          status = 'Removed';
        }
      }

      status = status || proposal?.status

      if (['Approved', 'Rejected', 'Removed'].includes(status)) {
        await MarketingRequestForm.findOneAndUpdate(
          { _id: form._id },
          { daoProposalStatus: status }
        );

        if (form.trelloIssueId) {
          await updateTrelloIssue(form.trelloIssueId, status === 'Approved');
          await MarketingRequestForm.findOneAndUpdate(
            { _id: form._id },
            { trelloIssueStatus: status === 'Approved' ? 'Approved' : 'Rejected' }
          );
        }
      }
    }
  } catch (error) {
    reportError(error, 'Error updating issue statuses');
  }
};

const setupSchedules = (app) => {
  cron.schedule(
    config.trelloIssuesStatusUpdateSchedule,
    async () => {
      await updateTrelloIssuesStatus(app);
    },
    { scheduled: true },
  );
};

module.exports = {
  setupSchedules,
};
