import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { loginState, uidState, LOGIN_ENUM } from './state';

export const useLogin = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [uid, setUid] = useRecoilState(uidState);

  useEffect(() => {
    if (login === LOGIN_ENUM['out']) {
      setUid('');
    }
  }, [login, setUid]);

  return {
    login,
    setLogin,
    setUid
  };
}