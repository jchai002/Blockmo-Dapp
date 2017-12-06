// import { GET_ACCOUNT_SUCCESSS } from "app/actions/types";
import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

export function sendTransaction({ address, amount, note }) {
  let web3 = store.getState().web3;
  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return dispatch => {
      const BlockmoContract = contract(BlockmoJSON);
      BlockmoContract.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Blockmo.
      var BlockmoInstance;
      // Get current ethereum wallet.
      web3.eth.getCoinbase((err, sender) => {
        // Log errors, if any.
        if (err) {
          console.err(err);
        }
        BlockmoContract.deployed().then(function(instance) {
          BlockmoInstance = instance;
          console.log(web3.eth.accounts);
          console.log(BlockmoInstance);
          // Attempt to send tokens.
          BlockmoInstance.sendTransaction(
            "0x94f2c03736d99cdc586a788fa9e17d4dc86be23c",
            "test note",
            {
              from: "0x9d7f38af7d8f2b486f3753e24010c537a7b6787e",
              value: web3.toWei(14, "ether"),
              gas: 500000
            }
          )
            .then(function(data) {
              console.log(data);
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      });
    };
  }
}
