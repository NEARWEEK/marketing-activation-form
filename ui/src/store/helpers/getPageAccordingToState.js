import { routes } from "../../config/routes";

import { getMarketingRequestForm } from "./getMarketingRequestForm";
import { pathMatched } from "./pathMatched";

export const getPageAccordingToState = async (history, state) => {
  try {
    const locationPathName = history.location.pathname;

    if (!state.marketingFromId) {
      return routes.marketingRequestForm;
    }

    const form = await getMarketingRequestForm(state.marketingFromId, state);

    if (pathMatched(routes.marketingRequestForm, locationPathName)) {
      return routes.marketingRequestForm;
    }

    if (!form.typeformResponseObject || !form.clientContacts) {
      console.log(3)
      return routes.marketingRequestForm;
    }

    if (pathMatched(routes.createBountyProposal, locationPathName)) {
      return routes.createBountyProposal;
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
