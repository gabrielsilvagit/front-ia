import produce from 'immer';
import { states, recurrences, personTypes } from './constants';

const INITIAL_STATE = {
  version: null,
  recurrences: recurrences,
  personTypes: personTypes,
  states: states,
};

export default function app(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.version = action.payload.version ? action.payload.version : state.version;
        break;
      }
      case '@auth/SIGN_OUT_SUCCESS': {
        draft.version = null;
        break;
      }
      default:
    }
  });
}
