import qs from 'query-string';

export const routes = {
  welcome: '/',
  marketingRequestForm: '/marketing-request-form',
  createBountyProposal: '/create-bounty-proposal',
  redirectFromWallet: '/redirect-from-wallet',
  errorPage: '/error',
};

export const getRoute = {
  callbackUrl: (parameters) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(parameters)}`,
};
