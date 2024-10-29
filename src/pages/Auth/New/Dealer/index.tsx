import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Components
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';
import HomeMenu from '@/Components/Auth/Menu';
import AsideInfosDatasUser from '@/Components/Auth/AsideInfos';
import ToastComponent from '@/Components/Toast';
import InputField from '@/Components/InputField';
import ButtonForm from '@/Components/BtnForm';

//Customs Hooks
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import useToken from '@/hooks/useToken';
import { useMutate } from '@/hooks/useFetch';

//Atoms and states
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';
import {
  errorLogRegisterForm,
  MsgServerState,
  RegisterDataStore,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//Style and Constants
import Style from '@/pages/Auth/New/New.module.css';
import SessionUser from '@/utils/Session';
import { RegTabValue } from '@/Constants/TabListDatas';
import { MessageServerType, UserRole } from '@/Constants/Type';

const AuthHome = () => {
  //Atoms
  const RegisterDatas = useRecoilValue(RegisterDataStore);
  const setitemMenuSelctedValue = useSetRecoilState(itemMenuSelected);
  const RegisterErrorsStates = useRecoilValue(errorLogRegisterForm);
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
  const Api = useRecoilValue(API);

  //states
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);

  //Reset States
  const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

  //Hooks
  const navigation = useRouter();
  const useFetchingMutation = useMutate();

  //Hanldes
  //handle manage response after request to Api
  const ResetAllState = () => {
    // Resets All States
    SetResetErrosField();
    SetResetMsgOfServerStates();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = (Error: any) => {
    //Error Global State Chaged to True
    console.log(Error.response);
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: Error.response.data.msg,
      messageType: MessageServerType.ERROR,
    });
  };

  const handleFecthingSuccess = () => {
    console.log('Requette reussie');

    ResetAllState(); // Reset All States
    //Go to Dealer List
    navigation.push('/Auth/Dealers');
  };

  const handleRegister = () => {
    // create New Dealer
    useFetchingMutation.mutate({
      methode: 'POST',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.SIGN_UP}`,
      dataToSending: {
        fname: RegisterDatas.fName,
        lname: RegisterDatas.lName,
        email: RegisterDatas.email,
        tel: RegisterDatas.tel,
        useRole: UserRole.DEALER,
      },
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };

  // checking datas of User
  useEffect(() => {
    //Items selected
    setitemMenuSelctedValue(3);
    setStorage(useLocalStorage);

    // Checking if User have a valid Session
    SessionUser(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToken().LogInState().isLogin,
      setCheckUserSessionloading,
      navigation
    );
  }, []);

  return (
    <>
      <HeadDatas
        title="New Dealer"
        description="smart meter, create new dealer user"
      />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <>
          <main className={`${Style.ContainerPage}`}>
            <section className={`${Style.ContainerApp}`}>
              <HomeMenu />
              <section className={`${Style.ContentDatas}`}>
                <ToastComponent />
                <div className={`${Style.NavTitle}`}>
                  <h1>Création des nouveaux comptes revendeur</h1>
                  <span className={`${Style.Title}`}>
                    Ajouter des comptes Utilisateur revendeurs.
                  </span>
                </div>
                <section className={`${Style.CardContainer}`}>
                  <div className={`${Style.formulaire}`}>
                    <div className={`${Style.InputsContainer}`}>
                      <>
                        {RegTabValue.map((value, index) => (
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
                      label="Créer"
                      OnPressAction={handleRegister}
                      disabled={
                        RegisterErrorsStates.InvalidName ||
                        RegisterErrorsStates.RegisterInvalidEmail ||
                        RegisterErrorsStates.invalidPhoneNumber ||
                        RegisterDatas.email == '' ||
                        RegisterDatas.fName == '' ||
                        RegisterDatas.lName == '' ||
                        RegisterDatas.tel == ''
                      }
                      loading={useFetchingMutation.isLoading}
                    />
                  </div>
                </section>
              </section>
              <AsideInfosDatasUser userDatas={Storage.getAllDatas()} />
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default AuthHome;
