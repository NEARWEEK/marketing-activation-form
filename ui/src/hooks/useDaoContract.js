import { Contract } from 'near-api-js'
import { useState } from 'react';

import { daoConfig } from '../config/nearConfig';
import { createBountyProposal } from "../services/daoContractService";

const useDaoContract = () => {
  const [isNearLoading, setIsNearLoading] = useState(false);

  const submitProposal = async (
    wallet,
    description,
    amount,
    times,
    maxDeadline,
    setTemporaryData
  ) => {
    const contract = await new Contract(wallet.account(), daoConfig.contractName, {
      changeMethods: ['add_proposal'],
      viewMethods: ['get_policy'],
    });

    setIsNearLoading(true);
    await createBountyProposal(
      contract,
      description,
      amount,
      times,
      maxDeadline,
      setTemporaryData
    );
  };

  return {
    isNearLoading,
    setIsNearLoading,
    submitProposal,
  };
};

export default useDaoContract;
