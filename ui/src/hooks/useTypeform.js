import { useEffect, useState } from 'react';

import { getFormId } from "../services/apiService";

import useAccountSignature from "./useAccountSignature";

const useTypeform = () => {
  const [typeformId, setTypeformId] = useState(null);
  const signature = useAccountSignature();

  useEffect(() => {
    if (signature) {
      (async () => {
        const formId = await getFormId(signature);
        setTypeformId(formId ? formId : '');
      })();
    }
  }, [signature]);

  return typeformId;
};

export default useTypeform;
