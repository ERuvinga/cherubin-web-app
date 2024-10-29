import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Components
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';
import HomeMenu from '@/Components/Auth/Menu';
import BtnTypePost from '@/Components/Auth/TypeContentButton';
import AsideInfosDatasUser from '@/Components/Auth/AsideInfos';
import LoadingComponent from '@/Components/LoadingComponent';

//Customs Hooks
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import useToken from '@/hooks/useToken';

//Atoms and states
import { HomeFilterSelected } from '@/state/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';

//Style and Constants
import AuthStyle from '@/pages/Auth/Home/Home.module.css';
import { FILTERACCOUNTS } from '@/Constants/Type';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import SessionUser from '@/utils/Session';

const AuthHome = () => {
  //states
  const setitemMenuSelctedValue = useSetRecoilState(itemMenuSelected);
  const [ReloadingList, setReloadingList] = useState(false);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);

  //Hooks
  const navigation = useRouter();

  // checking datas of User
  useEffect(() => {
    console.log(ReloadingList);
    // item selected defined
    setitemMenuSelctedValue(1);
    setStorage(useLocalStorage);
    // Checking if User have a valid Session
    SessionUser(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToken().LogInState().isLogin,
      setCheckUserSessionloading,
      navigation
    );
  }, []);

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

  return (
    <>
      <HeadDatas title="Dealers list" description="Dealers list Users" />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <>
          <main className={`${AuthStyle.HomeContainer}`}>
            <section className={`${AuthStyle.ContainerApp}`}>
              <HomeMenu />
              <section className={`${AuthStyle.ContentDatas}`}>
                <div className={`${AuthStyle.NavTitle}`}>
                  <h1>Clients</h1>
                </div>
                <section className={`${AuthStyle.ContainerDatasApp}`}>
                  <aside className={`${AuthStyle.FilterList}`}>
                    <span className={`${AuthStyle.Title}`}>
                      Filtrage des données sur bas du status des comptes, (All,
                      Actif et non actif)
                    </span>
                    <div className={`${AuthStyle.ReloadingBtn}`}>
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
                        onClick={() =>
                          setReloadingList((lastValue) => !lastValue)
                        }
                      >
                        <ArrowPathIcon width={23} height={23} color="#ebf1ff" />
                      </div>
                    </div>
                  </aside>
                  <section className={`${AuthStyle.CardContainer}`}>
                    <LoadingComponent
                      hiddenText={false}
                      contenteText="Chargement"
                    />
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
