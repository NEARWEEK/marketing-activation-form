import qs from 'query-string';

import { routes } from '../../config/routes';
import { getPageAccordingToState } from "../helpers/getPageAccordingToState";

export const onRedirectFromWallet = async (state, history) => {
  try {
    const { errorCode } = qs.parse(history.location.search);

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
