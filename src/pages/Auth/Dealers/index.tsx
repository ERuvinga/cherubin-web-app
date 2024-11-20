import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Components
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';
import HomeMenu from '@/Components/Auth/Menu';
import BtnTypePost from '@/Components/Auth/TypeContentButton';
import AsideInfosDatasUser from '@/Components/Auth/AsideInfos';
import LoadingComponent from '@/Components/LoadingComponent';
import ToastComponent from '@/Components/Toast';

//Customs Hooks
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import useToken from '@/hooks/useToken';
import { useCustomQuery } from '@/hooks/useFetch';

//Atoms and states
import { DealersUses, HomeFilterSelected } from '@/state/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';
import { API } from '@/state/Api';
import { MsgServerState } from '@/state/SignInUpDatas';

//Style and Constants
import AuthStyle from '@/pages/Auth/Dealers/Dealers.module.css';
import {
  FILTERACCOUNTS,
  MessageServerType,
  REQUEST_KEYS,
  UserRole,
} from '@/Constants/Type';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import SessionUser from '@/utils/Session';
import UserCard from '@/Components/Auth/Cards/CardOfUserDatas';

const AuthHome = () => {
  //states
  const [ReloadingList, setReloadingList] = useState(false);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [LoadingUsers, setLoadingUser] = useState(true);

  //Atoms
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);
  const setitemMenuSelctedValue = useSetRecoilState(itemMenuSelected);
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
  const Api = useRecoilValue(API);
  const [Users, setUser] = useRecoilState(DealersUses);

  //Handles

  const ReloadDatas = () => {
    //fuction to reloading datas
    setReloadingList((lastValue) => !lastValue);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = (Error: any) => {
    console.log(Error.response);
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: 'Erreur de chargement',
      messageType: MessageServerType.ERROR,
    });
    setLoadingUser(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingSuccess = (datas: any) => {
    console.log(datas.AllUsers);
    setUser(datas.AllUsers);
    setLoadingUser(false);
  };

  //Filter datas
  const [FilterPost, setFilterPost] = useRecoilState(HomeFilterSelected);
  const FiltersTab = [
    {
      label: 'Tout',
      value: FILTERACCOUNTS.ALL,
    },
    {
      label: 'Active',
      value: FILTERACCOUNTS.ACTIVE,
    },
    {
      label: 'Desactive',
      value: FILTERACCOUNTS.DESACTIVE,
    },
  ];

  //Hooks
  const navigation = useRouter();
  const useFeching = useCustomQuery({
    key: REQUEST_KEYS.HOME_DEALER,
    link: `${Api.LINK}${Api.GET_USERS}/${UserRole.DEALER}/${FilterPost}`,
    hangleError: handleFecthingError,
    handleSucces: handleFecthingSuccess,
  });

  // checking datas of User
  useEffect(() => {
    // item selected
    setitemMenuSelctedValue(1);
    setStorage(useLocalStorage);

    // Checking if User have a valid Session
    SessionUser(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToken().LogInState().isLogin,
      setCheckUserSessionloading,
      navigation
    );

    //valid session
    setLoadingUser(true);
    useFeching.refetch(); // get users datas
  }, []);

  useEffect(() => {
    //Reloading list
    setLoadingUser(true);
    useFeching.refetch(); // get users datas
  }, [ReloadingList, FilterPost]);

  return (
    <>
      <HeadDatas title="Home" description="Home, smart meter DashBoard" />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <>
          <main className={`${AuthStyle.HomeContainer}`}>
            <section className={`${AuthStyle.ContainerApp}`}>
              <HomeMenu />
              <section className={`${AuthStyle.ContentDatas}`}>
                <ToastComponent />
                <div className={`${AuthStyle.NavTitle}`}>
                  <h1>Vendeurs</h1>
                </div>
                <section className={`${AuthStyle.ContainerDatasApp}`}>
                  <aside className={`${AuthStyle.FilterList}`}>
                    <span className={`${AuthStyle.Title}`}>
                      Filtrage des données sur bas du status des comptes, (All,
                      Actif et non actif)
                    </span>
                    <div className={`${AuthStyle.Buttons}`}>
                      <div className={`${AuthStyle.containerItems}`}>
                        {FiltersTab.map((item, index) => (
                          <BtnTypePost
                            value={item.value}
                            label={item.label}
                            action={() => setFilterPost(item.value)}
                            key={`${item.label}_${index}`}
                            Selected={FilterPost}
                          />
                        ))}
                      </div>
                      <div
                        className={`${AuthStyle.ReloadingBtn}`}
                        onClick={ReloadDatas}
                      >
                        <ArrowPathIcon width={25} height={25} color="#ebf1ff" />
                      </div>
                    </div>
                  </aside>
                  <section className={`${AuthStyle.CardContainer}`}>
                    <>
                      {LoadingUsers ? (
                        <LoadingComponent
                          hiddenText={false}
                          contenteText="Chargement"
                        />
                      ) : (
                        <>
                          {useFeching.isSuccess ? (
                            <>
                              {Users.length > 0 ? (
                                <div className={`${AuthStyle.UserList}`}>
                                  {Users.map((item, index) => (
                                    <UserCard
                                      key={index}
                                      User={item}
                                      ReloadingListFuction={ReloadDatas}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className={`${AuthStyle.Error}`}>
                                  <UserGroupIcon
                                    width={50}
                                    height={50}
                                    color="#9ba1a6"
                                  />

                                  <p className={`${AuthStyle.ErrorText}`}>
                                    Aucun Client trouvé
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className={`${AuthStyle.Error}`}>
                              <CloudArrowUpIcon
                                width={50}
                                height={50}
                                color="#9ba1a6"
                              />

                              <p className={`${AuthStyle.ErrorText}`}>
                                Une Erreur s&apos;est produite
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  </section>
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
