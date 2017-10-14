import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';

// Initial state
const initialState = Map({
  seed: 'unknown',
  address: '',
  recipient: '',
  loading: false
});

// Actions
const GENADDRESS = 'ChatState/GENADDRESS';

// Action creators
export function genAddress() {
  return {type: GENADDRESS};
}

// Reducer
export default function ChatStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GENADDRESS:
      return state.update('address', address => 'address1337');

    default:
      return state;
  }
}
