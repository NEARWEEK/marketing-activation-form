import qs from 'query-string';

export const routes = {
  welcome: '/',
  marketingRequestForm: '/marketing-request-form',
  redirectFromWallet: '/redirect-from-wallet',
};

export const getRoute = {
  callbackUrl: (parameters) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(parameters)}`,
};
