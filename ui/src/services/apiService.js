import axios from 'axios';

import { routes } from "../config/routes";

const API_HOST = process.env.REACT_APP_BACKEND_HOST;

const getTypeFormId = async (signature) => {
  if (!signature) {
    return null;
  }

  const response = await axios.get(`${API_HOST}/api/form-id`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return response?.data?.formId;
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
  getTypeFormId,
  setupResponseInterceptor,
};
