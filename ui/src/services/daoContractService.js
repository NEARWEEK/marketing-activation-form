import { Decimal } from "decimal.js";

import { daoConfig } from '../config/nearConfig';
import { redirectPages } from "../config/redirectPages";
import { routes } from "../config/routes";

const { proposalDescription } = daoConfig;

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

    contract.add_proposal(
      {
        callbackUrl: `${window.location.origin}${routes.createBountyProposal}`,
        meta: redirectAction,
        args: {
          proposal: {
            description: proposalDescription,
            kind: {
              AddBounty: {
                bounty: {
                  description,
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

export {
  createBountyProposal,
};
