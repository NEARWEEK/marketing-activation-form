import { action } from 'easy-peasy';

export const setTransactionHash = action((state, payload) => {
  state.transactionHash = payload;
});
