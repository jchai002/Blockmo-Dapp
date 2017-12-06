import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3";
import account from "./account";
import list from "./list";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account,
  list
});

export default reducer;
