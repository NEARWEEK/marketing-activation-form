const cron = require('node-cron');

const config = require('../config/cron');
const { daoConfig } = require('../config/near');
const MarketingRequestForm = require('../modules/MarketingRequestForm/MarketingRequestFormModel');
const { reportError } = require('./errorReportingService');

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
      const proposal = await account.viewFunction(
        daoContractId,
        'get_proposal',
        { id: Number(form.daoProposalId) }
      );
      // console.log(proposal);
      // TODO
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
