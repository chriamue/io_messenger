import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';


const IOTA = require('iota.lib.js')
var testnet = new IOTA({
  'host': 'http://p103.iotaledger.net',
  'port': 14700
})


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
    return state
    .set('loading', false)
    .set('seed', 'seed1337')
    .set('address', 'address42')
    .set('recipient', 'cp');
    default:
      return state;
  }
}
