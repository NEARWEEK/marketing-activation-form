import qs from 'query-string';

import { routes } from '../../config/routes';

const onError = (actions, history) => {
  actions.setError({
    isError: true,
    description: 'You have not connected your wallet!',
  });
  history.replace(routes.welcome);
};

export const onRedirectFromWallet = async (actions, history) => {
  try {
    const query = qs.parse(history.location.search);
    const { errorCode } = query;
    if (errorCode) {
      await history.replace(routes.welcome);
    } else {
      await history.replace(routes.marketingRequestForm);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    onError(actions, history);
  } finally {
    document.location.reload();
  }
};
