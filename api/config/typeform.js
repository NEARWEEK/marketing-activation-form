const path = require('path');

const config = {
  accessToken: process.env.TYPEFORM_TOKEN,
  formName: process.env.TYPEFORM_FORM_NAME,
  themeName: process.env.TYPEFORM_THEME_NAME,
  workspaceName: process.env.TYPEFORM_WORKSPACE_NAME,
  answerWithContactsRef: process.env.TYPEFORM_ANSWER_WITH_CONTACTS_REF,
  formTemplatePath: path.join(__dirname, '..', process.env.TYPEFORM_FORM_TEMPLATE_PATH),
  themeTemplatePath: path.join(__dirname, '..', process.env.TYPEFORM_THEME_TEMPLATE_PATH),
};

module.exports = config;
