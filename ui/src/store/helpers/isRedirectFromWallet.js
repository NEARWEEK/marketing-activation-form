import qs from 'query-string';

import { routes } from '../../config/routes';

import { pathMatched } from "./pathMatched";

export const isRedirectFromWallet = (state, history) => {
  const { redirectAction } = qs.parse(history.location.search);

  return (
    typeof redirectAction === 'string' &&
    pathMatched(routes.redirectFromWallet, history.location.pathname) &&
    state.temporary.redirectAction === redirectAction
  );
};
