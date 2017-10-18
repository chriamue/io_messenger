import {Map} from 'immutable';

// Initial state
const initialState = Map({
  seed: 'unknown',
  loading: false
});

// Actions
const ACTION = 'SettingsState/ACTION';
const SET_SEED = 'SettingsState/SET_SEED';

// Action creators
export function act() {
  return {type: ACTION};
}

export function setSeed(text) {
  return {type: SET_SEED, text};
}

// Reducer
export default function SettingsStateReducer(state = initialState , action = {}) {
  switch (action.type) {
    case ACTION:
      return state;
    case SET_SEED:
      return state.set('seed', action.seed);
    default:
      return state;
  }
}
