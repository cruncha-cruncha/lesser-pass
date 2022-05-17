import { ReactNode } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { Login } from './pages/Login';
import { useInit as authInit } from './auth';
import { useInit as databaseInit } from './database';
import { Accounts } from './pages/Accounts';
import { Loading } from './pages/Loading';
import {
  loginIsUnknownState,
  loginIsOutState,
  loginIsTemptInState,
  loginIsInState,
  loginIsTemptOutState
} from './state';

function App() {
  return (
    <RecoilRoot>
      <Initializer>
        <Components />
      </Initializer>
    </RecoilRoot>
  );
}

function Initializer({ children }: { children: ReactNode }) {
  authInit();
  databaseInit();

  return (
    <>
      {children}
    </>
  )
}

function Components() {
  const isIn = useRecoilValue(loginIsInState);
  const isOut = useRecoilValue(loginIsOutState);
  const isTemptIn = useRecoilValue(loginIsTemptInState);
  const isTemptOut = useRecoilValue(loginIsTemptOutState);
  const isUnknown = useRecoilValue(loginIsUnknownState);
  
  return (
    <>
      {(isIn || isTemptOut) && <>
        <Accounts />
      </>}
      {(isOut || isTemptIn) && <>
        <Login />
      </>}
      {isUnknown && <>
        <Loading />
      </>}
    </>
  )
}

export default App;
