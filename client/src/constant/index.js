// export const ProdUrl="https://job-board-mern-application-backend.onrender.com"
// export const DevUrl="http://localhost:5000"
// export const HOST = "http://localhost:5000"
export const ProdUrl = "http://job-board-mern-application-backend.onrender.com";
export const DevUrl = "http://localhost:5000";
export const HOST = import.meta.env.PROD ? ProdUrl : DevUrl;

export const AUTH_ROUTES=`${HOST}/api/auth`;
export const SIGNUP_URL=`${AUTH_ROUTES}/signup`
export const SIGNIN_URL=`${AUTH_ROUTES}/signin`
export const INFO_URL=`${AUTH_ROUTES}/userinfo`
export const LOGOUT_URL=`${AUTH_ROUTES}/logout`
export const JOBPOST_URL=`${AUTH_ROUTES}/postjob`;
export const GET_ALL_JOBS=`${AUTH_ROUTES}/getjobs`
export const GET_JOB_DETAILS=`${AUTH_ROUTES}`
export const SUBMIT_APPLICATION_URL =`${AUTH_ROUTES}`
export const APPLIED_JOBS_URL =`${AUTH_ROUTES}/applied-jobs`
export const POSTED_JOBS_URL =`${AUTH_ROUTES}/posted-jobs`
export const UPDATE_STATUS_URL=`${AUTH_ROUTES}/application-status`
export const NUMBER_OF_APPLICANTS=`${AUTH_ROUTES}/numberofapplicantperjobs`



