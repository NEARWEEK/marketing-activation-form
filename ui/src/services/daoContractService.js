import { Decimal } from "decimal.js";
import { providers } from "near-api-js";

import { daoConfig, nearConfig } from '../config/nearConfig';
import { redirectPages } from "../config/redirectPages";
import { routes } from "../config/routes";

const { proposalDescriptionPrefix } = daoConfig;
const { nodeUrl } = nearConfig;

const createBountyProposal = async (
  contract,
  description,
  amount,
  times,
  maxDeadline,
  setTemporaryData
) => {
  if (
    contract?.get_policy &&
    contract?.add_proposal &&
    description &&
    amount &&
    times &&
    maxDeadline
  ) {
    const redirectAction = redirectPages.createBountyProposal;
    setTemporaryData({ redirectAction });
    const policy = await contract.get_policy();
    const fullDescription = `${proposalDescriptionPrefix}: ${description}`;

    contract.add_proposal(
      {
        callbackUrl: `${window.location.origin}${routes.createBountyProposal}`,
        meta: redirectAction,
        args: {
          proposal: {
            description: fullDescription,
            kind: {
              AddBounty: {
                bounty: {
                  description: fullDescription,
                  token: "",
                  amount: new Decimal(String(amount))
                    .mul(new Decimal(10).pow(24))
                    .toFixed(0),
                  times: Number(times),
                  max_deadline: new Decimal("1000000000")
                    .mul(60)
                    .mul(60)
                    .mul(24)
                    .mul(maxDeadline)
                    .toFixed(0),
                }
              }
            }
          }
        },
        gas: '300000000000000',
        amount: policy.proposal_bond.toString(),
      },
    );
  }
};

const getProposalId = async (transactionId, accountId) => {
  const provider = new providers.JsonRpcProvider(nodeUrl);
  const txStatus = await provider.txStatus(transactionId, accountId);
  return txStatus?.status?.SuccessValue ?
    window.atob(txStatus?.status?.SuccessValue) :
    null;
};

export {
  createBountyProposal,
  getProposalId,
};
