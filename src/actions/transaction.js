import { GET_ACCOUNT_SUCCESSS } from "actions/types";

export function sendTransaction({ address, amount, note }) {
  return dispatch => {
    console.log("action transaction", amount);
  };
}
