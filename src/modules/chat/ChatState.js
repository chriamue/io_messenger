import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';

const env = require('../../../env.js');
const iota = require('../../services/iota.js');

// Initial state
const initialState = Map({
  seed: env.seed,
  address: env.address_from,
  recipientName: 'unknown',
  recipientAddress: env.address_to,
  loading: false
});

// Actions
const SENDMESSAGE = 'ChatState/SENDMESSAGE';
const SENDINGMESSAGE = 'ChatState/SENDINGMESSAGE';

// Action creators

export function sendMessage(text) {
  return {type: SENDMESSAGE, text};
}

export async function sendingMessage(seed, address, recipient, text) {
  return {type: SENDINGMESSAGE,
    response: await iota.sendMessage(seed, address, recipient, text)};
}

// Reducer
export default function ChatStateReducer(state = initialState , action = {}) {
  switch (action.type) {
    case SENDMESSAGE:
      return loop(
        state.set('loading', true),
        Effects.promise(sendingMessage, state.get('seed'), state.get('address'), state.get('recipient'), action.text)
      );
    case SENDINGMESSAGE:
      return state
        .set('loading', false);
    default:
      return state;
  }
}
