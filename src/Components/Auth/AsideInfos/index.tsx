import Image from 'next/image';
import { useRouter } from 'next/router';
//components
import {
  ArrowLeftEndOnRectangleIcon,
  SquaresPlusIcon as SolidSquarePlusIcon,
} from '@heroicons/react/24/solid';

//Types and styles
import Styles from '@/Components/Auth/AsideInfos/AsideInfos.module.css';
import { LocalUserData } from '@/Constants/Type';

interface MenuUserDatas {
  userDatas: LocalUserData;
}

const AsideInfosDatasUser = (datas: MenuUserDatas) => {
  const navigation = useRouter();
  return (
    <div className={`${Styles.ContainerMenu}`}>
      <section className={`${Styles.BetwenneContainer}`}>
        <div className={`${Styles.LogoutBtn}`}>
          <button className={`${Styles.Btn}`}>
            <ArrowLeftEndOnRectangleIcon
              width={24}
              height={24}
              color="#001B2E"
            />
          </button>
        </div>
        <div className={`${Styles.AuthUserDatas}`}>
          <Image
            className={Styles.MenuProfileImage}
            src={'/Placeholders/profile.png'}
            width={500}
            height={500}
            alt="profilImage"
          />
          <div className={`${Styles.EmailAndName}`}>
            <span
              className={`${Styles.Name}`}
            >{`${datas.userDatas.name}`}</span>
            <span className={`${Styles.Email}`}>{datas.userDatas.email}</span>
          </div>
        </div>
        <div className={`${Styles.MenuList}`}>
          <></>
        </div>
      </section>
      <div className={`${Styles.ContainerFooterofMenu}`}>
        <button
          className={`${Styles.AddButon}`}
          onClick={() => navigation.push('/Auth/New')}
        >
          <SolidSquarePlusIcon width={30} height={30} color="#EEF6FC" />
          <span>Créer</span>
        </button>
      </div>
    </div>
  );
};

export default AsideInfosDatasUser;
