import qs from 'query-string';
import { matchPath } from 'react-router';

import { routes } from '../../config/routes';

export const isRedirectFromWallet = (state, history) => {
  const { redirectAction } = qs.parse(history.location.search);

  const match = matchPath(
    {
      path: routes.redirectFromWallet,
      exact: true,
    },
    history.location.pathname,
  );

  return (
    typeof redirectAction === 'string' &&
    match &&
    state.temporary.redirectAction === redirectAction
  );
};
