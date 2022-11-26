const config = {
  apiKey: process.env.TRELLO_API_KEY,
  apiToken: process.env.TRELLO_API_TOKEN,
  listId: process.env.TRELLO_LIST_ID,
  listOfApprovedIssuesId: process.env.LIST_OF_APPROVED_ISSUES_ID,
  listOfRejectedIssuesId: process.env.LIST_OF_REJECTED_ISSUES_ID,
  cardName: process.env.TRELLO_CARD_NAME,
};

module.exports = config;
