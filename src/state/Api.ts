// globale state for Theme App
import { atom } from 'recoil';

export const AgreeConditionState = atom({
  key: 'AgreeConditionState',
  default: false,
});

export const API = atom({
  key: 'apiDatas',
  default: {
    LAN_LINK: 'https://cherubin-restefull-api.onrender.com',
    LOCAL_LINK: 'http://localhost:5000',
    LINK: 'http://localhost:8010/proxy', //for local Proxy Testing
    SIGN_IN: '/Authentification/AdminLogin',
    SIGN_UP: '/Authentification/CreateUser',

    FORGOT_PWD: '/forgot-password',
    REGISTER_VERIFI_CODE: '/confirmCode',
    FORGOT_VERIFI_CODE: '/reset-Code',
    ACTIVE_ACCOUNT: '/api/auth/signUp/active-account/otp',
    UPDATE_USER: '/user/update',
    UPDATE_PASSWORD: '/user/change-password',

    RESET_PWD: '/reset-password',
    LOGOUT: '/logout',

    // Users
    GET_USERS: '/Users',
    DELETE_USER: '/Users/Delete/',
    DEBAT_FILTER: '/debate/filter',
    DEBATs_POSTS: '/postDebate',
    LIKES_POSTS: '/posts/like',
    UNLIKES_POSTS: '/posts/unlike',
    POLLS: '/polls',
    VOTES_POLLS: '/polls/vote',
    MEETINGS: '/meetings',
    INTEREST: '/interests',

    //IMAGES
    UPLOAD_IMAGE: '/upload/imageprofile',
  },
});
