import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

export function getTransactions() {
  let web3 = store.getState().web3;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return dispatch => {
      const BlockmoContract = contract(BlockmoJSON);
      BlockmoContract.setProvider(web3.currentProvider);
      BlockmoContract.deployed().then(function(instance) {
        instance
          .getNumberOfTransactions()
          .then(number => {
            // var n = number.toNumber();
            // console.log(instance);
            instance.transactions(1).then(txs => {
              console.log(txs);
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    };
  }
}
