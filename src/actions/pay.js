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
        console.log("mining...");
        instance
          .pay(address, note, {
            from: web3.eth.coinbase,
            value: web3.toWei(amount, "ether"),
            gas: 500000
          })
          .then(data => {
            console.log("mined...", data);
            var { _amount, _note, _sender, _receiver } = data.logs[0].args;
            _amount = web3.fromWei(_amount, "ether").toNumber();
            if (data) {
              dispatch({
                type: PAYMENT_SUCCESSS,
                payload: [
                  null,
                  _sender,
                  _receiver,
                  _amount,
                  _note,
                  new Date().getTime() / 1000
                ]
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    };
  }
}
