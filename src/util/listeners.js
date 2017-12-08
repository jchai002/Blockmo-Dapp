import store from "store";
import { getAccount } from "app/actions/account";

export function pollForAccountChange() {
  var web3 = store.getState().web3;
  var metaAddress = web3.eth.accounts[0];
  var storedAddress = store.getState().account.address;
  setTimeout(() => {
    if (metaAddress !== storedAddress) {
      return store.dispatch(getAccount(web3));
    }
    return pollForAccountChange();
  }, 800);
}

// depends on metamask events, which is currently not working
// const contract = require("truffle-contract");
// export function listenToTransactions() {
//   let web3 = store.getState().web3;
//   const BlockmoContract = contract(BlockmoJSON);
//   BlockmoContract.setProvider(web3.currentProvider);
//   BlockmoContract.deployed().then(instance => {
//     // console.log(instance, "listing");
//     instance
//       .transactionEvent(
//         {},
//         {
//           fromBlock: 0,
//           toBlock: "pending"
//         }
//       )
//       .watch((err, event) => {
//         if (!err) {
//           console.log(event);
//         } else {
//           console.err(err);
//         }
//       });
//   });
// }
