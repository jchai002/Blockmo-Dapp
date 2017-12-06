import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

export function listenToTransactions() {
  let web3 = store.getState().web3;
  console.log(web3);
  const BlockmoContract = contract(BlockmoJSON);
  BlockmoContract.setProvider(web3.currentProvider);
  BlockmoContract.deployed().then(instance => {
    // console.log(instance, "listing");
    instance
      .transactionEvent(
        {},
        {
          fromBlock: 0,
          toBlock: "latest"
        }
      )
      .watch((err, event) => {
        if (!err) {
          console.log(event);
        } else {
          console.err(err);
        }
      });
  });
}
