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
import { ResultSearchDatas, SearchUserTypeSelected } from '@/state/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';
import { API } from '@/state/Api';
import { MsgServerState } from '@/state/SignInUpDatas';

//Style and Constants
import SearchStyle from '@/pages/Auth/Search/Search.module.css';
import {
  FILTERACCOUNTS,
  MessageServerType,
  REQUEST_KEYS,
  UserRole,
} from '@/Constants/Type';
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import SessionUser from '@/utils/Session';
import UserCard from '@/Components/Auth/Cards/CardOfUserDatas';

const AuthHome = () => {
  //states
  const [ReloadingList, setReloadingList] = useState(false);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [LoadingUsers, setLoadingUser] = useState(true);
  const [keywordSerching, setKeyWordSearching] = useState('');

  //Atoms
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);
  const setitemMenuSelctedValue = useSetRecoilState(itemMenuSelected);
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
  const Api = useRecoilValue(API);
  const [Users, setUser] = useRecoilState(ResultSearchDatas);

  //Handles

  const onchageKeyWord = (value: string) => {
    setKeyWordSearching(value);
  };

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
  const [FilterUser, setFilterUser] = useRecoilState(SearchUserTypeSelected);
  const FiltersTab = [
    {
      label: 'Clients',
      value: UserRole.ADMIN_PARC,
    },
    {
      label: 'Vendeurs',
      value: UserRole.DEALER,
    },
  ];

  //Hooks
  const navigation = useRouter();
  const useFeching = useCustomQuery({
    key: REQUEST_KEYS.SEARCH,
    link: `${Api.LINK}${Api.GET_USERS}/${FilterUser}/${FILTERACCOUNTS.ALL}?keyword=${keywordSerching}`,
    hangleError: handleFecthingError,
    handleSucces: handleFecthingSuccess,
  });

  // checking datas of User
  useEffect(() => {
    // item selected
    setitemMenuSelctedValue(2);
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
    console.log(FilterUser);
    setLoadingUser(true);
    useFeching.refetch(); // get users datas
  }, [ReloadingList]);

  useEffect(() => {
    if (keywordSerching.length > 4) {
      useFeching.refetch(); // get users datas
    }
  }, [keywordSerching]);

  return (
    <>
      <HeadDatas title="Home" description="Home, smart meter DashBoard" />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <>
          <main className={`${SearchStyle.HomeContainer}`}>
            <section className={`${SearchStyle.ContainerApp}`}>
              <HomeMenu />
              <section className={`${SearchStyle.ContentDatas}`}>
                <ToastComponent />
                <div className={`${SearchStyle.NavTitle}`}>
                  <h1>Recherche</h1>
                </div>
                <section className={`${SearchStyle.ContainerDatasApp}`}>
                  <aside className={`${SearchStyle.FilterList}`}>
                    <div className={`${SearchStyle.Buttons}`}>
                      <div className={`${SearchStyle.containerItems}`}>
                        {FiltersTab.map((item, index) => (
                          <BtnTypePost
                            value={item.value}
                            label={item.label}
                            action={() => setFilterUser(item.value)}
                            key={`${item.label}_${index}`}
                            Selected={FilterUser}
                          />
                        ))}
                      </div>
                      <section
                        className={`${SearchStyle.searchSection} border`}
                      >
                        <input
                          onChange={(datas) => {
                            const TextValue = datas.target.value;
                            onchageKeyWord(TextValue);
                          }}
                          type="text"
                          className={`${SearchStyle.SearchInput}`}
                          placeholder="search"
                        />
                        <div
                          className={`${SearchStyle.ReloadingBtn}`}
                          onClick={ReloadDatas}
                        >
                          <MagnifyingGlassIcon
                            width={25}
                            height={25}
                            color="#ebf1ff"
                          />
                        </div>
                      </section>
                    </div>
                  </aside>
                  <section className={`${SearchStyle.CardContainer}`}>
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
                                <div className={`${SearchStyle.UserList}`}>
                                  {Users.map((item, index) => (
                                    <UserCard
                                      key={index}
                                      User={item}
                                      ReloadingListFuction={ReloadDatas}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className={`${SearchStyle.Error}`}>
                                  <UserGroupIcon
                                    width={50}
                                    height={50}
                                    color="#9ba1a6"
                                  />

                                  <p className={`${SearchStyle.ErrorText}`}>
                                    Aucun Element trouvé
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className={`${SearchStyle.Error}`}>
                              <CloudArrowUpIcon
                                width={50}
                                height={50}
                                color="#9ba1a6"
                              />

                              <p className={`${SearchStyle.ErrorText}`}>
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
