import { GET_ACCOUNT_SUCCESSS } from "app/actions/types";

export function getAccount(web3) {
  return dispatch => {
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
  };
}
