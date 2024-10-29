//Deign
import { PlatformInfo } from '@/state/user';
import { useEffect, useState } from 'react';

//Atoms an Recoil Functions
import { useRecoilState } from 'recoil';
import {
  errorLogRegisterForm,
  ForgotPwdDatas,
  LoginDataStore,
  RegisterDataStore,
} from '@/state/SignInUpDatas';

//Customs Hooks
import useEmail from '@/hooks/useEmail';

//Icones
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ValidatesDatasErrors } from '@/Constants/Type';
import { SystemMessages } from '@/Constants/TabListDatas';
import usePassWord from '@/hooks/usePassWord';

interface inputDatasDefinition {
  fromPage: string;
  placehold: string;
  label: string;
  type: string;
  idField: number;
  secure: boolean;
  checked: boolean;
  ErrorType: ValidatesDatasErrors;
}

const InputField = (datas: inputDatasDefinition) => {
  // states & atoms
  const [platformInfos, setPlatformInfos] = useRecoilState(PlatformInfo);
  const [secureState, setSecureState] = useState(true);
  const usePassword = usePassWord('');

  //Recoil States
  const [LoginData, setLoginData] = useRecoilState(LoginDataStore);
  const [RegisterData, setRegisterData] = useRecoilState(RegisterDataStore);
  const [NewPwdData, setNewPwdData] = useRecoilState(ForgotPwdDatas);
  //Errors States
  const [ErrorsValues, setErrorValues] = useRecoilState(errorLogRegisterForm);
  const [MessageError, setMessageError] = useState('');
  const [ErroFieldState, setErrorFieldState] = useState(false);

  // checking if email is Valid
  const CheckingEmail = (email: string) => {
    const useMail = useEmail(email);
    return useMail.isValid(); // return Boolean, true if email is valid and False if email is not valide
  };
  useEffect(() => {
    if (datas.ErrorType !== ValidatesDatasErrors.NONE) {
      switch (datas.ErrorType) {
        case ValidatesDatasErrors.LOGEMAIL:
          setMessageError(SystemMessages.Errors.invalidEmail);
          setErrorFieldState(ErrorsValues.LoginInvalidEmail);
          break;
        case ValidatesDatasErrors.REGEMAIL:
          setMessageError(SystemMessages.Errors.invalidEmail);
          setErrorFieldState(ErrorsValues.RegisterInvalidEmail);
          break;
        case ValidatesDatasErrors.FORGOTEMAIL:
          setMessageError(SystemMessages.Errors.invalidEmail);
          setErrorFieldState(ErrorsValues.ForgotInvalidEmail);
          break;
        case ValidatesDatasErrors.NAME:
          setMessageError(SystemMessages.Errors.invalidName);
          setErrorFieldState(ErrorsValues.InvalidName);
          break;
        case ValidatesDatasErrors.CONFIRMPWD:
          setMessageError(SystemMessages.Errors.inValidPassword);
          setErrorFieldState(ErrorsValues.pswdAndCofirmPswd);
          break;
        case ValidatesDatasErrors.STRONGPASSWORD:
          setMessageError(SystemMessages.Errors.InvalidStrongPassword);
          setErrorFieldState(ErrorsValues.RegisterInvalidStrongPswd);
          break;
        case ValidatesDatasErrors.CONFIRMRESETPWD:
          setMessageError(SystemMessages.Errors.inValidPassword);
          setErrorFieldState(ErrorsValues.pswdAndCofirmResetPswd);
          break;

        case ValidatesDatasErrors.PHONE:
          setMessageError(SystemMessages.Errors.inValidPhoneNumber);
          setErrorFieldState(ErrorsValues.invalidPhoneNumber);
          break;
        case ValidatesDatasErrors.BIRTHYEAR:
          setMessageError(SystemMessages.Errors.invalidBirthDay);
          setErrorFieldState(ErrorsValues.invalidBirthDay);
          break;
      }
    }
  }, [ErrorsValues]);

  //Handles
  const UpdateLoginDatas = (newValue: string) => {
    switch (datas.idField) {
      case 0:
        {
          // email
          setLoginData({
            ...LoginData,
            email: newValue,
          });
          if (CheckingEmail(newValue)) {
            // if datas is Valid?
            setErrorValues({
              ...ErrorsValues,
              LoginInvalidEmail: false,
            });
          } else {
            setErrorValues({
              ...ErrorsValues,
              LoginInvalidEmail: true,
            });
          }
        }
        break;
      case 1:
        {
          setLoginData({
            ...LoginData,
            password: newValue,
          });
        }
        break;
    }
  };

  const UpdateRegisterDatas = (newValue: string) => {
    switch (datas.idField) {
      case 0:
        {
          if (newValue.length) {
            // fullName
            const names = newValue.split(' ');
            const firstName = names[0];
            const secondName = names[1] ? names[1] : '~';

            setRegisterData({
              ...RegisterData,
              fName: firstName,
              lName: secondName,
            });
          } else {
            setRegisterData({
              ...RegisterData,
              fName: '',
            });
          }

          // Validation name Value
          if (newValue.split(' ')[1]) {
            setErrorValues({
              ...ErrorsValues,
              InvalidName: false,
            });
          } else {
            setErrorValues({
              ...ErrorsValues,
              InvalidName: true,
            });
          }
        }
        break;
      case 1:
        {
          // email
          setRegisterData({
            ...RegisterData,
            email: newValue,
          });

          if (CheckingEmail(newValue)) {
            // if datas is Valid?
            setErrorValues({
              ...ErrorsValues,
              RegisterInvalidEmail: false,
            });
          } else {
            setErrorValues({
              ...ErrorsValues,
              RegisterInvalidEmail: true,
            });
          }
        }
        break;

      case 2:
        {
          //const PhoneNumberExpressionBeginer = //;
          const PhoneNumberExpressionContent = /^[+243][0-9]{12}$/;
          setRegisterData({
            ...RegisterData,
            tel: newValue,
          });
          //Check if Phone Number is Valid
          if (PhoneNumberExpressionContent.test(newValue)) {
            setErrorValues({
              ...ErrorsValues,
              invalidPhoneNumber: false,
            });
          } else {
            setErrorValues({
              ...ErrorsValues,
              invalidPhoneNumber: true,
            });
          }
        }
        break;
    }
  };

  const UpdateNewPassWordDatas = (newValue: string) => {
    switch (datas.idField) {
      case 0:
        {
          const isValidPassWord = usePassword.CheckingPassword(newValue);
          // password
          setNewPwdData({
            ...NewPwdData,
            newPassword: newValue,
          });

          if (NewPwdData.confirmPassWord != '') {
            if (newValue != NewPwdData.confirmPassWord) {
              setErrorValues({
                ...ErrorsValues,
                pswdAndCofirmResetPswd: true,
                RegisterInvalidStrongPswd: !isValidPassWord,
              });
            } else {
              setErrorValues({
                ...ErrorsValues,
                pswdAndCofirmResetPswd: false,
                RegisterInvalidStrongPswd: !isValidPassWord,
              });
            }
          } else {
            setErrorValues({
              ...ErrorsValues,
              RegisterInvalidStrongPswd: !isValidPassWord,
            });
          }
        }
        break;
      case 1:
        {
          // Confirme passWord
          setNewPwdData({
            ...NewPwdData,
            confirmPassWord: newValue,
          });
          if (newValue != NewPwdData.newPassword) {
            setErrorValues({
              ...ErrorsValues,
              pswdAndCofirmResetPswd: true,
            });
          } else {
            setErrorValues({
              ...ErrorsValues,
              pswdAndCofirmResetPswd: false,
            });
          }
        }
        break;
    }
  };
  const HandleChangeValue = (valueChanged: string) => {
    switch (datas.fromPage) {
      case 'Login':
        UpdateLoginDatas(valueChanged);
        break;
      case 'Register':
        UpdateRegisterDatas(valueChanged);
        break;

      case 'ForgotPwd': {
        setNewPwdData({
          ...NewPwdData,
          email: valueChanged,
        });
        break;
      }
      case 'Reset': {
        UpdateNewPassWordDatas(valueChanged);
        break;
      }
    }
  };

  useEffect(() => {
    setPlatformInfos(navigator.userAgent);
  }, []);
  return (
    <div className="FieldsContainer">
      <label className="InputLabel" htmlFor={datas.label}>
        {datas.label}
      </label>
      <div className="inputContainer">
        <input
          id={datas.label}
          className={
            platformInfos.match(/iPhone/) ? 'AppleAdjust' : 'inputField'
          }
          placeholder={datas.placehold}
          type={datas.secure && !secureState ? 'text' : datas.type}
          onChange={(datas) => {
            const CaptionValue = datas.target.value;
            HandleChangeValue(CaptionValue);
          }}
        />
        <>
          {datas.secure && (
            <div
              className="EyesIcone"
              onClick={() => {
                // change state of Value
                setSecureState((lastValue) => !lastValue);
              }}
            >
              {secureState ? (
                <EyeSlashIcon color="#b6b5bc" width={28} height={28} />
              ) : (
                <EyeIcon color="#b6b5bc" width={28} height={28} />
              )}
            </div>
          )}
        </>
      </div>
      <>
        {datas.checked && ErroFieldState && (
          <div className="ErrorMsg">{MessageError}</div>
        )}
      </>
    </div>
  );
};
export default InputField;
