import { GET_TRANSACTIONS_SUCCESSS } from "app/actions/types";
import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

async function fillHash(
  contractInstance,
  total,
  currentIteration,
  currentHash
) {
  if (total < currentIteration) {
    return currentHash;
  }
  let tx = await contractInstance.transactions(currentIteration);
  // modify tx BigNumbers
  for (var i in tx) {
    if (typeof tx[i] != "string") {
      tx[i] = tx[i].toNumber();
    }
  }
  currentHash[currentIteration] = tx;
  currentIteration++;
  return fillHash(contractInstance, total, currentIteration, currentHash);
}
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
          .then(bigNum => {
            var txCount = bigNum.toNumber();
            return fillHash(instance, txCount, 1, {});
          })
          .then(hash => {
            var arr = [];
            for (var key in hash) {
              hash[key][3] = web3.fromWei(hash[key][3], "ether");
              arr.push(hash[key]);
            }
            dispatch({
              type: GET_TRANSACTIONS_SUCCESSS,
              payload: { transactions: arr }
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    };
  }
}
