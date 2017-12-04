import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3
});

export default reducer;
