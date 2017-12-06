// import { GET_ACCOUNT_SUCCESSS } from "app/actions/types";
import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

function buildContracts() {
  let contracts = {};
  let meta;
  this.props.contracts.forEach(_contract => {
    let { contract_name = "" } = _contract;
    meta = contract(_contract);
    meta.setProvider(this.web3Provided.currentProvider);
    meta.defaults({ from: this.web3Provided.eth.coinbase });
    contracts[contract_name] = meta;
  });
  return contracts;
}
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
        console.log(web3.eth.coinbase, 'durp');
        // BlockmoInstance.defaults({ from: web3.eth.coinbase });
        // Attempt to send tokens.
      //   BlockmoInstance.pay(sender, "test note", {
      //     value: web3.toWei(14, "ether"),
      //     gas: 500000
      //   })
      //     .then(function(data) {
      //       console.log(data);
      //     })
      //     .catch(function(err) {
      //       console.log(err);
      //     });
      // });
      // Get current ethereum wallet.
      // web3.eth.getCoinbase((err, sender) => {
      //   // Log errors, if any.
      //   if (err) {
      //     console.err(err);
      //   }
      // });
    };
  }
}
