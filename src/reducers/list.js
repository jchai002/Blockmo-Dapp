import { GET_TRANSACTIONS_SUCCESSS } from "app/actions/types";

export default function(
  state = {
    transactions: []
  },
  action
) {
  if (action.type === GET_TRANSACTIONS_SUCCESSS) {
    return action.payload;
  }

  return state;
}
