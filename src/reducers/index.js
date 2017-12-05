import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3";
import account from "./account";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account
});

export default reducer;
