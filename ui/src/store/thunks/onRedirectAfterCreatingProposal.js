import { providers } from "near-api-js";
import qs from 'query-string';

import { nearConfig } from '../../config/nearConfig';
import { routes } from '../../config/routes';
import { updateProposalId } from "../../services/apiService";
import { signStringMessage } from "../../services/signatureService";
import { getPageAccordingToState } from "../helpers/getPageAccordingToState";

const { nodeUrl } = nearConfig;

export const onRedirectAfterCreatingProposal = async (actions, state, history) => {
  try {
    const { near, wallet } = state.entities;
    const accountId = wallet?.getAccountId();
    const { transactionHashes } = qs.parse(history.location.search);
    const marketingFromId = state.marketingFromId;
    const signature = await signStringMessage(near, wallet, accountId);

    if (transactionHashes && marketingFromId) {
      const provider = new providers.JsonRpcProvider(nodeUrl);
      const txStatus = await provider.txStatus(String(transactionHashes), accountId);
      const proposalId = txStatus?.status?.SuccessValue ?
        window.atob(txStatus?.status?.SuccessValue) :
        null;

      const response = await updateProposalId(marketingFromId, proposalId, signature);

      let page;
      if (response) {
        page = await getPageAccordingToState(history, state);
      } else {
        page = routes.errorPage;
      }

      await history.replace(page);

    } else {
      await history.replace(routes.createBountyProposal);
    }

  } catch (error) {
    console.log('onRedirectAfterCreatingProposal:', error);
    await history.replace(routes.errorPage);

  } finally {
    document.location.reload();
  }
};
