import { action } from 'easy-peasy';

export const setMarketingFromId = action((state, payload) => {
  state.marketingFromId = payload;
});
