import { GET_TRANSACTIONS_SUCCESSS } from "app/actions/types";
import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
import _ from "lodash";
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
          .then(bigNum => {
            var txCount = bigNum.toNumber();
            // limit to 6 transactions
            // TODO: add pagination
            txCount = txCount > 6 ? 6 : txCount;
            return getContractTransactions(instance, txCount, {});
          })
          .then(hash => {
            var arr = [];
            for (var key in hash) {
              hash[key][3] = web3.fromWei(hash[key][3], "ether");
              arr.push(hash[key]);
            }
            // js object is always sorted ascending, need to reverse array
            dispatch({
              type: GET_TRANSACTIONS_SUCCESSS,
              payload: arr.reverse()
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    };
  }
}

// recursively get results in descending order by id
async function getContractTransactions(contractInstance, total, currentHash) {
  if (total === 0) {
    return currentHash;
  }
  let tx = await contractInstance.transactions(total);
  // modify tx BigNumbers
  for (var i in tx) {
    tx[i] = _.result(tx[i], "toNumber", tx[i]);
  }
  currentHash[total] = tx;
  total--;
  return getContractTransactions(contractInstance, total, currentHash);
}
