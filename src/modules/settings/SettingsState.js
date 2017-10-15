import { Map } from 'immutable';

// Initial state
const initialState = Map({

});

// Actions
const ACTION = 'SettingsState/ACTION';

// Action creators
export function act() {
  return { type: ACTION };
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION:
      return state;
    default:
      return state;
  }
}