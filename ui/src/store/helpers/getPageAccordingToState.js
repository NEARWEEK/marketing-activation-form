import { routes } from "../../config/routes";

import { getMarketingRequestForm } from "./getMarketingRequestForm";
import { pathMatched } from "./pathMatched";

export const getPageAccordingToState = async (history, state) => {
  try {
    const locationPathName = history.location.pathname;
    const { wallet } = state.entities;
    const accountId = wallet?.getAccountId();

    if (!state.marketingFromId) {
      return routes.marketingRequestForm;
    }

    const form = await getMarketingRequestForm(state.marketingFromId, state);

    if (form.nearAccountId !== accountId) {
      return routes.marketingRequestForm;
    }

    if (pathMatched(routes.marketingRequestForm, locationPathName)) {
      return routes.marketingRequestForm;
    }

    if (!form.typeformResponseObject || !form.clientContacts) {
      return routes.marketingRequestForm;
    }

    if (!form.daoProposalId || !form.daoProposalStatus) {
      return routes.createBountyProposal;
    }

    return routes.complete;

  } catch (error) {
    console.log('getPageAccordingToState:', error);
    return routes.errorPage;
  }
};
