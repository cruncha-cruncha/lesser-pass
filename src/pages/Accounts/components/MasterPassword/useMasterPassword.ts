import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { masterPasswordState } from '../../../../state';

export const useMasterPassword = () => {
    const [masterPassword, setMasterPassword] = useRecoilState(masterPasswordState);
    const [hidden, setHidden] = useState(true);

    const toggleHide = () => {
        setHidden(oldVal => !oldVal);
    }

    return {
        hidden,
        toggleHide,
        masterPassword,
        setMasterPassword
    }
}