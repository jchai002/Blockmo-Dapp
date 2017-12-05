import { WEB3_INITIALIZED } from "actions/types";

const web3Reducer = (
  state = {
    web3: null
  },
  action
) => {
  if (action.type === WEB3_INITIALIZED) {
    return action.payload;
  }

  return state;
};

export default web3Reducer;
