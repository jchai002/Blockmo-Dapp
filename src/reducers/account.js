import { GET_ACCOUNT_SUCCESSS } from "actions/types";

export default function(
  state = {
    address: null,
    balance: null
  },
  action
) {
  if (action.type === GET_ACCOUNT_SUCCESSS) {
    return action.payload;
  }

  return state;
}
