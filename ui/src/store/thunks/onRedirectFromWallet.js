import qs from 'query-string';

import { routes } from '../../config/routes';
import { getPageAccordingToState } from "../helpers/getPageAccordingToState";

export const onRedirectFromWallet = async (actions, state, history) => {
  try {
    const query = qs.parse(history.location.search);
    const { errorCode } = query;

    if (errorCode) {
      await history.replace(routes.welcome);

    } else {
      const page = await getPageAccordingToState(history, state);
      await history.replace(page);
    }

  } catch (error) {
    console.log('onRedirectFromWallet:', error);
    await history.replace(routes.welcome);

  } finally {
    document.location.reload();
  }
};
