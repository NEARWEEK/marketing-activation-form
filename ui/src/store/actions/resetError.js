import { action } from 'easy-peasy';

export const resetError = action((state) => {
  state.error.isError = false;
  state.error.description = '';
});
