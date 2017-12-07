import { GET_TRANSACTIONS_SUCCESSS, PAYMENT_SUCCESSS } from "app/actions/types";

export default function(state = [], action) {
  if (action.type === GET_TRANSACTIONS_SUCCESSS) {
    return action.payload;
  }

  if (action.type === PAYMENT_SUCCESSS) {
    // optimistimally return the new transaction and add to dom
    return [action.payload, ...state];
  }

  return state;
}
