import { ReactNode } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { Login } from './pages/Login';
import { useInit as authInit } from './auth';
import { useInit as databaseInit } from './database';
import { Accounts } from './pages/Accounts';
import { Loading } from './pages/Loading';
import { BadIn } from './pages/BadIn';
import {
  loginIsUnknownState,
  loginIsOutState,
  loginIsTemptInState,
  loginIsInState,
  loginIsTemptOutState,
  loginIsBadInState
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
  const isBadIn = useRecoilValue(loginIsBadInState);
  
  return (
    <>
      {isIn && <>
        <Accounts />
      </>}
      {isOut && <>
        <Login />
      </>}
      {(isUnknown || isTemptOut || isTemptIn) && <>
        <Loading />
      </>}
      {isBadIn && <>
        <BadIn />
      </>}
    </>
  )
}

export default App;
