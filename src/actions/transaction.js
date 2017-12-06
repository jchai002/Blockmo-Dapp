// import { GET_ACCOUNT_SUCCESSS } from "app/actions/types";
import SendToken from "contracts/SendToken.json";
import store from "store";

const contract = require("truffle-contract");

export function sendTransaction({ address, amount, note }) {
  console.log(store.getState());
  const sendtoken = contract(SendToken);
  return dispatch => {
    const sendtoken = contract(SendToken);
    console.log("action transaction", amount);
  };
}
