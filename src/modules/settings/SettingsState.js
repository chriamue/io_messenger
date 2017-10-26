import {Map} from 'immutable';
const iota = require('../../services/iota.js');

// Initial state
const initialState = Map({
  seed: 'unknown',
  address: '',
  phonenr: '+49',
  loading: false
});

// Actions
const SET_SEED = 'SettingsState/SET_SEED';
const SET_PHONENR = 'SettingsState/SET_PHONENR';
const SET_ADDRESS = 'SettingsState/SET_ADDRESS';
const GEN_ADDRESS = 'SettingsState/GEN_ADDRESS';

export function setSeed(seed) {
  return {type: SET_SEED, seed};
}

export function setPhoneNr(phonenr) {
  return {type: SET_PHONENR, phonenr};
}

export function setAddress(address) {
  return {type: SET_ADDRESS, address};
}

export async function genAddress(seed) {
  return {type: GEN_ADDRESS, address: await iota.generateAddress(seed, 1)};
}

// Reducer
export default function SettingsStateReducer(state = initialState , action = {}) {
  switch (action.type) {
    case SET_SEED:
      return state.set('seed', action.seed);
    case SET_PHONENR:
      return state.set('phonenr', action.phonenr);
    case SET_ADDRESS:
      return state.set('address', action.address);
    case GEN_ADDRESS:
      return state.set('address', action.address);
    default:
      return state;
  }
}
