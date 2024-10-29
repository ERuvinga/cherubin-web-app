import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Components
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';
import HomeMenu from '@/Components/Auth/Menu';
import AsideInfosDatasUser from '@/Components/Auth/AsideInfos';
import CreateUserCard from '@/Components/Auth/Cards/CreateUserCards';

//Customs Hooks
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import useToken from '@/hooks/useToken';

//Atoms and states
import { useSetRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';

//Style and Constants
import Style from '@/pages/Auth/New/New.module.css';
import SessionUser from '@/utils/Session';
import { NewUserTab } from '@/Constants/TabListDatas';

const AuthHome = () => {
  //states
  const setitemMenuSelctedValue = useSetRecoilState(itemMenuSelected);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);

  //Hooks
  const navigation = useRouter();

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
        title="New User"
        description="smart meter, create new User page"
      />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <>
          <main className={`${Style.ContainerPage}`}>
            <section className={`${Style.ContainerApp}`}>
              <HomeMenu />
              <section className={`${Style.ContentDatas}`}>
                <div className={`${Style.NavTitle}`}>
                  <h1>Création des nouveaux comptes utilisateurs</h1>
                  <span className={`${Style.Title}`}>
                    Ajouter des comptes Utilisateur, selectionner un compte
                    client pour créer des utilisateurs simples et comptes
                    revendeurs pour celui des points de ventes...
                  </span>
                </div>
                <section className={`${Style.CardContainer}`}>
                  {NewUserTab.map((item, index) => (
                    <CreateUserCard
                      key={`${item.link}_${index}`}
                      OnClickFunction={() => navigation.push(item.link)}
                      title={item.title}
                      description={item.description}
                      illustration={item.illustration}
                    />
                  ))}
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
