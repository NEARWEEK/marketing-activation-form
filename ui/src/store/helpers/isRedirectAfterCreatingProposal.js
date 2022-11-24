import qs from 'query-string';

import { routes } from '../../config/routes';

import { pathMatched } from "./pathMatched";

export const isRedirectAfterCreatingProposal = (state, history) => {
  const { signMeta } = qs.parse(history.location.search);

  return (
    typeof signMeta === 'string' &&
    pathMatched(routes.createBountyProposal, history.location.pathname) &&
    state.temporary.redirectAction === signMeta
  );
};
