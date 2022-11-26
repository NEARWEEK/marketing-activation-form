const axios = require('axios');
const fs = require("fs");
const { answerWithContactsRef } = require("../config/typeform");
const config = require('../config/typeform');
const logger = require('../utilities/logger');
const { reportError } = require('../services/errorReportingService');
const settingsService = require('./settingsService');

const BASE_API_URL = 'https://api.typeform.com';
const typeformInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10_000,
  headers: {'Authorization': `Bearer ${config.accessToken}`}
});

const getEntities = async (entityName, params) => {
  const { data } = await typeformInstance.get(`/${entityName}`, { params });
  return data?.items ? data.items : [];
};

const getFormFields = async (formId) => {
  const { data } = await typeformInstance.get(`/forms/${formId}`);
  return data?.fields?.length > 0 ? data.fields : null;
};

const createForm = async (params) => {
  const { data } = await typeformInstance.post(
    `/forms`,
    params,
    {
      'Content-Type': 'application/json',
    }
  );
  return data;
};

const createTheme = async (params) => {
  const { data } = await typeformInstance.post(
    `/themes`,
    params,
    {
      'Content-Type': 'application/json',
    }
  );
  return data;
};

const getAllItems = async (itemName) => {
  const result = [];
  let i = 1;
  let items = await getEntities(itemName, { page: i, pageSize: 100 });

  while (items?.length > 0) {
    Array.prototype.push.apply(result, items);
    i++;
    items = await getEntities(itemName, { page: i, pageSize: 100 });
  }

  return result;
};

module.exports = {
  async setupTypeform() {
    try {
      const formName = config.formName;
      const themeName = config.themeName;
      const workspaceName = config.workspaceName;

      let createFormData = JSON.parse(fs.readFileSync(config.formTemplatePath, "utf-8"));
      let createThemeData = JSON.parse(fs.readFileSync(config.themeTemplatePath, "utf-8"));

      let themeId;
      if (typeof createThemeData === 'object') {
        createThemeData.name = themeName;
        const themes = await getAllItems('themes');
        const marketingTheme = themes.find(element => element.name === themeName);

        if (marketingTheme) {
          themeId = marketingTheme.id;
        } else {
          createThemeData = await createTheme(createThemeData);
          themeId = createThemeData.id;
          logger.info(`Theme '${themeId}' has been created`);
        }
      }

      if (typeof createFormData === 'object') {
        createFormData.title = formName;
        if (themeId) {
          createFormData.theme = { href: `https://api.typeform.com/themes/${themeId}` };
        }

        const workspaces = await getAllItems('workspaces');
        const marketingWorkspace = workspaces.find(element => element.name === workspaceName);

        if (marketingWorkspace) {
          createFormData.workspace = { href: `https://api.typeform.com/workspaces/${marketingWorkspace.id}` };
        } else {
          reportError(null, `Workspace '${workspaceName}' is not found.`);
          return;
        }

        const forms = await getAllItems('forms');
        const marketingForm = forms.find(element => element.title === formName);

        let formId;
        if (marketingForm) {
          formId = marketingForm.id;
        } else {
          //console.log(JSON.stringify(createFormData, null, 2));
          createFormData = await createForm(createFormData);
          formId = createFormData.id;
          logger.info(`Marketing form '${formId}' has been created`);
        }

        await settingsService.setSettingValue("TypeformID", formId);

      } else {
        reportError(null, `Incorrect form data in ${config.formTemplatePath} file.`);
      }

    } catch (error) {
      reportError(error, 'Marketing form initialize error');
    }
  },

  async getResponses(formId, responseId) {
    const questions = await getFormFields(formId);
    const emptyResult = { typeformAnswers: null, clientContacts: null };

    if (!questions) {
      return emptyResult;
    }

    const { data } = await typeformInstance.get(
      `/forms/${formId}/responses`,
      { params: { 'included_response_ids': String(responseId), completed: true } }
    );

    let answers, clientContacts;
    if (data?.items?.length > 0) {
      answers = data?.items[0]?.answers;
      clientContacts = Array.isArray(answers) ?
        answers.find(
          element => element?.field?.ref === answerWithContactsRef
        )?.text :
        null;
    }

    if (!(answers?.length > 0)) {
      return emptyResult;
    }

    return {
      typeformAnswers: {
        questions,
        answers,
      },
      clientContacts,
    }
  }
};
