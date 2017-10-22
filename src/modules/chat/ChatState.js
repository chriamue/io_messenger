import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';

const env = require('../../../env.js');
const iota = require('../../services/iota.js');

// Initial state
const initialState = Map({
  seed: env.seed,
  address: env.address_from,
  recipient: env.address_to,
  messages: [],
  loading: false
});

// Actions
const SENDMESSAGE = 'ChatState/SENDMESSAGE';
const SENDINGMESSAGE = 'ChatState/SENDINGMESSAGE';
const RECEIVEMESSAGE = 'ChatState/RECEIVEMESSAGE';
const RECEIVINGMESSAGE = 'ChatState/RECEIVINGMESSAGE';

// Action creators

export function sendMessage(text) {
  return {type: SENDMESSAGE, text};
}

export function receiveMessage(text) {
  return {type: RECEIVEMESSAGE, text};
}

export async function sendingMessage(seed, address, recipient, text) {
  return {type: SENDINGMESSAGE,
    response: await iota.sendMessage(seed, address, recipient, text)};
}

export async function receivingMessage(seed, address) {
  console.log(address);
  var messages = await iota.getMessages(seed, address);
  var msgs = [];
  messages.forEach((message) => {
    msgs.push({
      _id: msgs.length,
      text: message,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
      }
    });
  });
  return {type: RECEIVINGMESSAGE,
    messages: msgs};
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
    case RECEIVEMESSAGE:
      return loop(
        state.set('loading', true),
        Effects.promise(receivingMessage, state.get('seed'), state.get('recipient'))
      );
    case RECEIVINGMESSAGE:
      return state
        .set('messages', action.messages)
        .set('loading', false);
    default:
      return state;
  }
}
