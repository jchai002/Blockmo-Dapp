import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3";
import account from "./account";
import transactions from "./transactions";
import status from "./status";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account,
  transactions,
  status
});

export default reducer;
