import { routes } from '../../config/routes';
import { getPageAccordingToState } from "../helpers/getPageAccordingToState";
import { pathMatched } from "../helpers/pathMatched";

export const onLoadPage = async (actions, state, history) => {
  const { wallet } = state.entities;
  const locationPathName = history.location.pathname;

  if (!wallet.isSignedIn() || pathMatched(routes.welcome, locationPathName)) {
    await history.replace(routes.welcome);

  } else {
    const page = await getPageAccordingToState(history, state);
    await history.replace(page);
  }
};
