// file content principals states of App
import { MessageServerType } from '@/Constants/Type';
import { atom } from 'recoil';

export const LoginDataStore = atom({
  key: 'loginDataState',
  default: {
    email: '',
    password: '',
  },
});

export const RegisterDataStore = atom({
  key: 'registerDataState',
  default: {
    fName: '',
    lName: '',
    email: '',
    tel: '',
  },
});

//datas using to update user datas
export const DatasOfUserLogin = atom({
  key: 'DatasOfUserLogin',
  default: {
    email: '',
    name: '',
    image: '',
    token: '',
  },
});

export const CompleteRegisterDataStore = atom({
  key: 'CompleteRegisterDataStore',
  default: {
    imageProfile: '',
    Province: '',
    Sexe: '',
    birthYear: '',
    AccountType: '',
    Ville: '',
    Telephone: '',
    document: '',
  },
});

export const ForgotPwdDatas = atom({
  key: 'ForgotPwdDatas',
  default: {
    email: '',
    code: '',
    newPassword: '',
    confirmPassWord: '',
  },
});

export const ActiveAccountDatas = atom({
  key: 'ActiveAccountDatas',
  default: {
    email: '',
    code: '',
  },
});

export const OTPFromScreen = atom({
  key: 'FromScreen',
  default: 'Forgot',
});

export const SuccessMsg = atom({
  key: 'SuccessMsg',
  default: {
    message: '',
  },
});

export const messageOfServer = atom({
  key: 'messageOfServer',
  default: {
    content: 'No Message Content',
    stateMsg: false,
    messageType: MessageServerType.SUCCESS,
  },
});

export const errorLogRegisterForm = atom({
  key: 'errorLogRegisterForm',
  default: {
    LoginInvalidEmail: false,
    RegisterInvalidEmail: false,
    RegisterInvalidStrongPswd: false,
    ForgotInvalidEmail: false,
    InvalidName: false,
    pswdAndCofirmPswd: false,
    valideDatasStates: false,
    pswdAndCofirmResetPswd: false,
    invalidPhoneNumber: false,
    invalidBirthDay: false,
  },
});

//Message Server State
export const MsgServerState = atom({
  key: 'MsgServerState',
  default: {
    hidden: true,
    message: 'Nothing',
    messageType: MessageServerType.SUCCESS,
  },
});

//Message Server State
export const SuccessAlerteState = atom({
  key: 'SuccessAlerteState',
  default: {
    hidden: true,
    message: 'Nothing',
  },
});
