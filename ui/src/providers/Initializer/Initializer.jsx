/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { cloneElement, useEffect, useState } from 'react';

import Loader from '../../components/general/Loader/Loader';

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();
  const onInitApp = actions.onInitApp;

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      await onInitApp({ history, setInit });
    })();
  }, [store, history, setInit]);

  return isInit ? cloneElement(children, { history }) : <Loader />;
};
