import Image from 'next/image';
import { useState } from 'react';

//Customs Hooks
import { useMutate } from '@/hooks/useFetch';

//Atoms and Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MsgServerState } from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//const, styles and Types
import { MessageServerType, MobileUserDatas } from '@/Constants/Type';
import Style from '@/Components/Auth/Cards/CardOfUserDatas/userCard.module.css';

interface userDatas {
  User: MobileUserDatas;
  ReloadingListFuction: () => void;
}

const UserCard = (datas: userDatas) => {
  //hooks
  const useFetchingMutation = useMutate();

  //States
  const [LoadingDeleteUser, setLoadingDeleteUser] = useState(false);
  //atoms
  const Api = useRecoilValue(API);
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  //Handles

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
    setLoadingDeleteUser(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingSuccess = (successDatas: any) => {
    console.log(successDatas);
    setLoadingDeleteUser(false);

    // Reloading List
    datas.ReloadingListFuction();
  };
  const deleteUser = (idUser: string) => {
    setLoadingDeleteUser(true);
    console.log(idUser);
    useFetchingMutation.mutate({
      //Login
      methode: 'DELETE',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.DELETE_USER}${idUser}`,
      dataToSending: {},
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };

  return (
    <div className={`${Style.Container}`}>
      <div className={`${Style.UserPub}`}>
        <Image
          className={`${Style.profilImg} }`}
          src={
            datas.User.cover ? datas.User.cover : '/Placeholders/profile.png'
          }
          width={500}
          height={500}
          alt="image user"
        />
        <div className={`${Style.EmailName}`}>
          <span
            className={Style.nameUser}
          >{`${datas.User.fname} ${datas.User.lname}`}</span>
          <span className={Style.email}>{datas.User.email}</span>
        </div>
      </div>
      <button
        onClick={() => deleteUser(datas.User._id)}
        className={`${Style.DeleteBtn} border`}
      >
        {LoadingDeleteUser ? 'En co....' : 'Effacer'}
      </button>
    </div>
  );
};

export default UserCard;
