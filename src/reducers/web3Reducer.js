import { WEB3_INITIALIZED } from "../actions/types";

const web3Reducer = (
  state = {
    web3Instance: null
  },
  action
) => {
  if (action.type === WEB3_INITIALIZED) {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    });
  }

  return state;
};

export default web3Reducer;
