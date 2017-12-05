import { GET_ACCOUNT_SUCCESSS } from "actions/types";
import { getWeb3 } from "util/web3";

export function getAccount() {
  return dispatch => {
    getWeb3.then(web3 => {
      return new Promise((resolve, reject) => {
        // get address
        web3.eth.getCoinbase((err, address) => {
          if (address) {
            // get balance
            web3.eth.getBalance(address, (err, wei) => {
              var balance = web3.fromWei(wei, "ether").toNumber();
              resolve({ address, balance });
            });
          }
        });
      }).then(payload => {
        dispatch({
          type: GET_ACCOUNT_SUCCESSS,
          payload
        });
      });
    });
  };
}
