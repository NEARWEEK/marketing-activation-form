const axios = require('axios');
const config = require('../config/trello');
const logger = require('../utilities/logger');
const { reportError } = require('../services/errorReportingService');

const BASE_API_URL = 'https://api.trello.com/1';
const trelloInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' }
});

const buildIssueDescription = (form) => {
  const result = [];

  if (form.nearAccountId) {
    result.push(`NEAR Account ID: ${form.nearAccountId}`);
  }

  if (form.clientContacts) {
    result.push(`Client contacts: ${form.clientContacts}`);
  }

  const questions = form.typeformAnswers?.questions;
  const answers = form.typeformAnswers?.answers;

  if (questions?.length > 0 && answers?.length > 0) {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers.find(element => element.field?.ref === question.ref);
      let answerText;
      const emptyResponse = 'No response';

      switch (answer?.type) {
        case "text":
          answerText = answer.text;
          break;
        case "boolean":
          answerText = String(answer.boolean);
          break;
        case "email":
          answerText = answer.email;
          break;
        case "number":
          answerText = String(answer.number);
          break;
        case "choices":
          answerText = Array.isArray(answer.choices?.labels) ?
            answer.choices.labels.join(', ') :
            emptyResponse;
          break;
        case "date":
          answerText = new Date(answer.date).toISOString();
          break;
        case "choice":
          answerText = answer.choice?.label;
          break;
        default:
          answerText = emptyResponse;
          break;
      }

      if (!answerText) {
        answerText = emptyResponse;
      }

      result.push(`${i + 1}. ${question.title}: ${answerText}`);
    }
  }

  return result.join('\n') + '\n';
};

module.exports = {
  async createTrelloIssue(form) {
    try {
      const name = config.cardName + ` (Proposal ID: ${form.daoProposalId})`;
      const description = buildIssueDescription(form);
      const params = {
        name,
        desc: description,
        pos: 'bottom',
      };

      const { data } = await trelloInstance.post(
        `/cards?idList=${config.listId}&key=${config.apiKey}&token=${config.apiToken}`,
        params,
        {
          'Content-Type': 'application/json',
        }
      );

      if (!data?.id) {
        reportError(data, 'Unsuccessful response from Trello');
        return null;
      }

      logger.info(`The Trello Card '${data.id}' has been created`);
      return data;

    } catch (error) {
      reportError(error, 'Error creating a card in Trello');
      return null;
    }
  },

  async updateTrelloIssue(id, approvalResult) {
    // TODO
  },
};
