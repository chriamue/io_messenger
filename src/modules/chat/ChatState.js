import {Map} from 'immutable';

var env = require('../../../env.js');

// Initial state
const initialState = Map({
  seed: env.seed,
  address: env.address_from,
  recipient: env.address_to,
  loading: false
});

// Actions
const GENADDRESS = 'ChatState/GENADDRESS';

// Action creators
export function genAddress() {
  return {type: GENADDRESS};
}

// Reducer
export default function ChatStateReducer(state = initialState , action = {}) {
  switch (action.type) {
    case GENADDRESS:
      return state
        .set('loading', false)
        .set('seed', 'seed1337')
        .set('address', 'address42')
        .set('recipient', 'cp');
    default:
      return state;
  }
}
