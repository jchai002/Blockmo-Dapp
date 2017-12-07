import { PAYMENT_PENDING, PAYMENT_SUCCESSS } from "app/actions/types";

export default function(state = { mining: false }, action) {
  if (action.type === PAYMENT_PENDING) {
    return { mining: true };
  }
  if (action.type === PAYMENT_SUCCESSS) {
    return { mining: false };
  }

  return state;
}
