import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { addUserListener, updateUserAcc, deleteUserAcc } from '../DB';
import { loginState, LOGIN_ENUM, uidState } from '../Login/state';
import { masterPasswordState } from './state';
import { calcPassword } from '../crypto/encrypt';

export const useList = () => {
  const [masterPassword, setMasterPassword] = useRecoilState(masterPasswordState);
  const login = useRecoilValue(loginState);
  const uid = useRecoilValue(uidState);
  const [hide, setHide] = useState(true);
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    if (login === LOGIN_ENUM['in']) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [login]);

  useEffect(() => {
    if (uid) {
      const cb = s => {
        const newAccs = s.docs.map(d => (
          { ...d.data(), id: d.id }
        ));
        setAccs(newAccs);
      };
      return addUserListener({ uid, cb });
    }
  }, [uid]);

  const addNewAcc = (data) => {
    const uuid = uuidv4()
    updateUserAcc({ uid, accId: uuid, data });
    return uuid;
  }

  const updateAccs = (data) => {
    data.forEach(({ id, ...rest }) => updateUserAcc({ uid, accId: id, data: rest }));
  }

  const deleteAccs = (data) => {
    data.forEach(accId => deleteUserAcc({ uid, accId }));
  }

  const genPassword = async (profile) => {
    const password = await calcPassword({ profile, masterPassword });
    return password;
  }

  return {
    hide,
    setMasterPassword,
    accs,
    addNewAcc,
    updateAccs,
    deleteAccs,
    genPassword
  };
}