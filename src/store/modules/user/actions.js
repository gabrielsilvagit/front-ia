export function updateProfile(profile) {
  return {
    type: '@auth/UPDATE_PROFILE',
    payload: { profile },
  };
}
export function uploadAvatar(imageUrl) {
  return {
    type: '@auth/UPLOAD_AVATAR',
    payload: { imageUrl },
  };
}
