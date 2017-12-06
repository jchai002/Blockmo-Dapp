import { PAYMENT_SUCCESSS } from "app/actions/types";
import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

export function pay({ address, amount, note }) {
  let web3 = store.getState().web3;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return dispatch => {
      const BlockmoContract = contract(BlockmoJSON);
      BlockmoContract.setProvider(web3.currentProvider);
      BlockmoContract.deployed().then(function(instance) {
        instance
          .pay("0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7", note, {
            from: web3.eth.coinbase,
            value: web3.toWei(amount, "ether"),
            gas: 500000
          })
          .then(({ tx }) => {
            if (tx) {
              dispatch({ type: PAYMENT_SUCCESSS });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    };
  }
}
