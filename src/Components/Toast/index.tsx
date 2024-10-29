import { useEffect } from 'react';

//Atoms and Recoil
import { MsgServerState } from '@/state/SignInUpDatas';
import { useRecoilState } from 'recoil';

//style and Constatnts
import styles from '@/styles/Components/Toast.module.css';
import { MessageServerType } from '@/Constants/Type';

const ToastComponent = () => {
  const [MessageServerState, setMessageServerState] =
    useRecoilState(MsgServerState);

  useEffect(() => {
    // manager Time To show Toast
    if (!MessageServerState.hidden) {
      setTimeout(() => {
        console.log('Hidden Toast');
        setMessageServerState((lastValue) => ({
          ...lastValue,
          hidden: true,
        }));
      }, 6000);
    }
  }, [MessageServerState]);

  return (
    <>
      {!MessageServerState.hidden && (
        <div className={styles.ContainerToast}>
          <div
            className={
              MessageServerState.messageType == MessageServerType.SUCCESS
                ? `${styles.Toast} ${styles.SuccessMessage}`
                : `${styles.Toast} ${styles.FailedMessage}`
            }
          >
            <span className={styles.Message}>{MessageServerState.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastComponent;
