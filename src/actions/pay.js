// import { GET_ACCOUNT_SUCCESSS } from "app/actions/types";
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
      // Declaring this for later so we can chain functions on Blockmo.
      var BlockmoInstance;
      BlockmoContract.deployed().then(function(instance) {
        BlockmoInstance = instance;
        BlockmoInstance.pay(
          "0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7",
          "test note",
          {
            from: web3.eth.coinbase,
            value: web3.toWei(14, "ether"),
            gas: 500000
          }
        );
      });
    };
  }
}
