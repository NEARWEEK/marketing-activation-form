import qs from 'query-string';

import { routes } from '../../config/routes';
import { updateProposalId } from "../../services/apiService";
import { getProposalId } from "../../services/daoContractService";
import { signStringMessage } from "../../services/signatureService";
import { getPageAccordingToState } from "../helpers/getPageAccordingToState";

const waitMilliseconds = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms );
  });
};

export const onRedirectAfterCreatingProposal = async (actions, state, history, helpers) => {
  try {
    const { near, wallet } = state.entities;
    const accountId = wallet?.getAccountId();
    const { transactionHashes } = qs.parse(history.location.search);
    const transactionId = transactionHashes ? String(transactionHashes) : undefined;
    const marketingFromId = state.marketingFromId;
    const signature = await signStringMessage(near, wallet, accountId);

    if (transactionId && marketingFromId) {
      let page;
      if (transactionId === helpers.getStoreState().transactionHash) {
        await waitMilliseconds(2_000);
        page = await getPageAccordingToState(history, state);

      } else {
        actions.setTransactionHash(transactionId);
        const proposalId = await getProposalId(transactionId, accountId);

        if (proposalId) {
          const response = await updateProposalId(marketingFromId, proposalId, signature);

          if (response) {
            page = await getPageAccordingToState(history, state);
          }
        }
      }

      if (!page) {
        page = routes.errorPage;
      }

      await history.replace(page);

    } else {
      await history.replace(routes.createBountyProposal);
    }

  } catch (error) {
    console.log('onRedirectAfterCreatingProposal:', error);
    await history.replace(routes.errorPage);
  }
};
