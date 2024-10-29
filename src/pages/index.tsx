import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//states and Recoil functions
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  errorLogRegisterForm,
  LoginDataStore,
  MsgServerState,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//Customs Hooks
import useToken, { Token } from '@/hooks/useToken';
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import { useMutate } from '@/hooks/useFetch';

// components
import ButtonForm from '@/Components/BtnForm';
import HeadDatas from '@/Components/Header';
import InputField from '@/Components/InputField';
import ToastComponent from '@/Components/Toast';

//Constants and Types
import { LoginTabFieldDatas } from '@/Constants/TabListDatas';
import { MessageServerType, UserData } from '@/Constants/Type';

const Login = () => {
  // states
  const LoginDatasValue = useRecoilValue(LoginDataStore);
  const Api = useRecoilValue(API);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [MyToken, setMyToken] = useState({} as Token);

  //States Errors Servers
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  //Reset States
  const SetResetLogDatas = useResetRecoilState(LoginDataStore);
  const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

  //Input Field Errors States
  const LoginErrors = useRecoilValue(errorLogRegisterForm);

  //hooks To fetching datas
  const useFetchingMutation = useMutate();
  const navigation = useRouter();

  //HANDLES, manage response after request to Api
  const ResetAllState = () => {
    // Resets All States
    SetResetLogDatas();
    SetResetErrosField();
    SetResetMsgOfServerStates();
  };

  useEffect(() => {
    ResetAllState();
    setStorage(useLocalStorage);
    setMyToken(useToken);
  }, []);

  //Handles manager Login datas
  const Login = (NewToken: string) => {
    // update token
    MyToken.LogIn(NewToken); // save in Secure store a new User token

    //Local storage datas
    console.log('Login User');
    //Go To Authentification Home
    navigation.push('/Auth/Home');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = (ErrorDatas: any) => {
    //Error Global State Chaged to True
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: ErrorDatas.response.data.msg,
      messageType: MessageServerType.ERROR,
    });
    console.log(ErrorDatas.response.data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingSuccess = (successDatas: any) => {
    const OwnerUser: UserData = successDatas.DataUser;
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: successDatas.msg,
      messageType: MessageServerType.SUCCESS,
    });

    // Reset States in App
    console.log(successDatas);
    ResetAllState();

    // Storage Local datas
    console.log('Storage datas in Local...');
    Storage.setAllDatas({
      email: OwnerUser.email,
      fName: OwnerUser.name,
      lName: OwnerUser.name,
      isActive: `${OwnerUser.isActive}`,
      cover: OwnerUser.cover,
      idUser: OwnerUser._id,
    });
    Login(successDatas.Token);
  };

  //send Data function
  const SingInClick = () => {
    console.log(LoginDatasValue);
    //sending Datas
    useFetchingMutation.mutate({
      //Login
      methode: 'POST',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.SIGN_IN}`,
      dataToSending: LoginDatasValue,
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };

  return (
    <>
      <HeadDatas
        title="Smart meter App"
        description="Adminstration smart Water meter app "
      />

      <ToastComponent />
      <main className="LoginPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <div className="TilteForm">
              <Image
                width={500}
                height={500}
                alt="logo"
                src={'/logo.png'}
                placeholder="blur"
                blurDataURL="/Wshimer.svg"
                className="LogoImg"
              />
              <h1 className="PageTitle">SMART METER</h1>
            </div>
            <div className="InputsContainer">
              <>
                {LoginTabFieldDatas.map((value, index) => (
                  <InputField
                    placehold={value.placeholder}
                    label={value.label}
                    fromPage={value.from}
                    type={value.type}
                    key={`${index}_${value.id}`}
                    idField={index}
                    secure={value.secure}
                    checked={value.checked}
                    ErrorType={value.errorType}
                  />
                ))}
              </>
            </div>
            <ButtonForm
              label="Connexion"
              OnPressAction={SingInClick}
              disabled={
                LoginErrors.LoginInvalidEmail ||
                LoginDatasValue.email == '' ||
                LoginDatasValue.password == ''
              }
              loading={useFetchingMutation.isLoading}
            />
          </div>
        </section>
      </main>
    </>
  );
};
export default Login;
