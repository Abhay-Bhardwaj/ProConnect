export const HOST=import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES=`${HOST}/api/auth`;
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`;
export const GET_USER_INFO=`${AUTH_ROUTES}/user-info`;
export const LOGOUT_ROUTE=`${AUTH_ROUTES}/logout`;


export const PROFILE_ROUTES=`${HOST}/api/profile`;
export const GET_PROFILE_INFO=`${PROFILE_ROUTES}/userInfo/`;
export const UPDATE_PROFILE_INFO=`${PROFILE_ROUTES}/update-profile`;
export const UPLOAD_PROFILE_IMAGE=`${PROFILE_ROUTES}/upload-profile-image`;


export const CONNECTION_ROUTES=`${HOST}/api/connection`;
export const SEND_CONNECTION_REQUEST=`${CONNECTION_ROUTES}/send`;
export const ACCEPT_CONNECTION_REQUEST=`${CONNECTION_ROUTES}/accept`;
export const DECLINE_CONNECTION_REQUEST=`${CONNECTION_ROUTES}/decline`;
export const LIST_CONNECTIONS=`${CONNECTION_ROUTES}/list`;
export const FOLLOW_USER=`${CONNECTION_ROUTES}/follow`;
export const UNFOLLOW_USER=`${CONNECTION_ROUTES}/unfollow`;



export const THREAD_ROUTES=`${HOST}/api/thread`;
export const GET_THREADS=`${THREAD_ROUTES}/get-threads`;
export const CREATE_GROUP_THREAD=`${THREAD_ROUTES}/create-group`;
export const CREATE_INDIVIDUAL_THREAD=`${THREAD_ROUTES}/create-individual`;
export const NEW_MESSAGE=`${THREAD_ROUTES}/new-message`;
export const GET_MESSAGES=`${THREAD_ROUTES}/get-messages`;
