import { matchPath } from 'react-router';

import { routes } from '../../config/routes';

const { welcome, marketingRequestForm } = routes;

const rootHandler = ({ replace }) => {
  console.log('rootHandler');
  return replace(welcome);
};

const marketingRequestFormHandler = ({ replace, state }) => {
  console.log('marketingRequestFormHandler');
  const { wallet } = state.entities;
  if (!wallet.isSignedIn()) return replace(welcome);
  return replace(marketingRequestForm);
};

const handlers = {
  [welcome]: rootHandler,
  [marketingRequestForm]: marketingRequestFormHandler,
};

export const onLoadPage = async (state, history) => {
  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (mp) await handlers[routes[mp]]({ replace: history.replace, state });
};
