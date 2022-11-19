import { useEffect, useState } from 'react';

import { getTypeFormId } from "../services/apiService";

import useAccountSignature from "./useAccountSignature";

const useTypeform = () => {
  const [typeformId, setTypeformId] = useState(null);
  const signature = useAccountSignature();

  useEffect(() => {
    if (signature) {
      (async () => {
        const formId = await getTypeFormId(signature);
        setTypeformId(formId ? formId : '');
      })();
    }
  }, [signature]);

  return typeformId;
};

export default useTypeform;
