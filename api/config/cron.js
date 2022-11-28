const config = {
  trelloIssuesStatusUpdateSchedule: process.env.TRELLO_ISSUES_STATUS_UPDATE_SCHEDULE || '*/10 * * * *',
};

module.exports = config;
