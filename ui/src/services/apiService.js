import axios from 'axios';

import { routes } from "../config/routes";

const API_HOST = process.env.REACT_APP_BACKEND_HOST;

const getFormId = async (signature) => {
  if (!signature) {
    return null;
  }

  const response = await axios.get(`${API_HOST}/api/typeform/form-id`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return response?.data?.formId;
};

const sendingForm = async (formId, responseId, signature) => {
  if (!signature) {
    return null;
  }

  const response = await axios.post(
    `${API_HOST}/api/typeform/sending-form`,
    {
      typeformFormId: formId,
      typeformResponseId: responseId,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return response?.data;
};

const setupResponseInterceptor = (history) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    // eslint-disable-next-line consistent-return
    (error) => {
      console.log(error);
      history.push(routes.errorPage);
    }
  )
}

export {
  getFormId,
  sendingForm,
  setupResponseInterceptor,
};
