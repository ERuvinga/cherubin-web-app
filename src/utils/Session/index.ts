import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

// Function Checking Session of User
const SessionUser = (
  isLogin: boolean,
  setCheckingSession: Dispatch<SetStateAction<boolean>>,
  navigation: NextRouter
) => {
  if (isLogin) {
    setCheckingSession(false); // Hidden Loading State
  } else {
    navigation.replace('/');
  }
};

export default SessionUser;
