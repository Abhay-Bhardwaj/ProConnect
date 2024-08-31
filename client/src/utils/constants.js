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
export const GET_ALL_USERS=`${CONNECTION_ROUTES}/allUsers`;
export const GET_FOLLOWERS_FOLLOWING=`${CONNECTION_ROUTES}/getsepratelist`;



export const THREAD_ROUTES=`${HOST}/api/thread`;
export const GET_THREADS=`${THREAD_ROUTES}/get-threads`;
export const CREATE_GROUP_THREAD=`${THREAD_ROUTES}/create-group`;
export const CREATE_INDIVIDUAL_THREAD=`${THREAD_ROUTES}/create-individual`;
export const NEW_MESSAGE=`${THREAD_ROUTES}/new-message`;
export const GET_MESSAGES=`${THREAD_ROUTES}/get-messages`;


export const COMPANY_ROUTES=`${HOST}/api/company`;
export const CREATE_COMPANY=`${COMPANY_ROUTES}/create-company`;
export const GET_ALL_COMPANIES=`${COMPANY_ROUTES}/get-companies`;
export const GET_COMPANY_BY_ID=`${COMPANY_ROUTES}/get-company-by-id`;


export const JOB_ROUTES=`${HOST}/api/job`;
export const CREATE_JOB=`${JOB_ROUTES}/create-job`;
export const GET_ALL_JOBS=`${JOB_ROUTES}/get-all-jobs`;
export const GET_JOB_BY_ID=`${JOB_ROUTES}/get-job-by-id`;
export const APPLY_JOB=`${JOB_ROUTES}/apply-job`;
export const GET_APPLIED_JOBS=`${JOB_ROUTES}/get-applied-jobs`;
export const GET_POSTED_JOBS=`${JOB_ROUTES}/get-posted-job`;