import { useState } from 'react';

export const useMasterPassword = () => {
    const [hidden, setHidden] = useState(true);

    const toggleHide = () => {
        setHidden(oldVal => !oldVal);
    }

    return {
        hidden,
        toggleHide
    }
}