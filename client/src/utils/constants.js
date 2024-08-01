export const HOST=import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES=`${HOST}/api/auth`;
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`;
export const GET_USER_INFO=`${AUTH_ROUTES}/user-info`;
export const LOGOUT_ROUTE=`${AUTH_ROUTES}/logout`;


export const PROFILE_ROUTES=`${HOST}/api/profile`;
export const GET_PROFILE_INFO=`${PROFILE_ROUTES}/userInfo/`;
export const UPDATE_PROFILE_INFO=`${PROFILE_ROUTES}/update-profile`;