import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  permissions: [],
  roles: [],
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        draft.permissions = action.payload.permissions;
        draft.roles = action.payload.roles;
        break;
      }
      case '@auth/SIGN_OUT_SUCCESS': {
        draft.profile = null;
        draft.permissions = null;
        draft.roles = null;
        break;
      }
      case '@auth/UPDATE_PROFILE': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/UPLOAD_AVATAR': {
        draft.profile.avatar_url = action.payload.imageUrl;
        break;
      }
      default:
    }
  });
}
