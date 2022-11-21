import qs from 'query-string';

import { routes } from '../../config/routes';

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
    await history.replace(routes.welcome);
  } finally {
    document.location.reload();
  }
};
