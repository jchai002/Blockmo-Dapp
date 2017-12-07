import BlockmoJSON from "contracts/Blockmo.json";
import store from "store";
const contract = require("truffle-contract");

// depends on metamask events, which is currently not working
export function listenToTransactions() {
  let web3 = store.getState().web3;
  const BlockmoContract = contract(BlockmoJSON);
  BlockmoContract.setProvider(web3.currentProvider);
  BlockmoContract.deployed().then(instance => {
    // console.log(instance, "listing");
    instance
      .transactionEvent(
        {},
        {
          fromBlock: 0,
          toBlock: "pending"
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
