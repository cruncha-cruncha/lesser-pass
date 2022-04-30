import React, { useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import { createUserProfile } from '../DB';
import { LOGIN_ENUM } from './state';
import { useLogin } from './useLogin';

export const Login = () => {
  const { login, setLogin, setUid } = useLogin();

  const handleLogin = () => {
    setLogin(LOGIN_ENUM['temptIn']);
    firebase.auth().useDeviceLanguage();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  const handleLogout = () => {
    setLogin(LOGIN_ENUM['temptOut']);
    firebase.auth().signOut().then(() => {
      setLogin(LOGIN_ENUM['out']);
    });
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        setLogin(LOGIN_ENUM["in"]);
        createUserProfile({ uid: user.uid });
      } else {
        setLogin(LOGIN_ENUM['out']);
      }
    });
  }, [setUid, setLogin]);

  return (
    <Row>
      <Col className="d-flex justify-content-end">
        {login === LOGIN_ENUM['unknown'] &&
          <span>loading</span>}
        {(login === LOGIN_ENUM['out'] || login === LOGIN_ENUM['temptIn']) && 
          <Button
            onClick={handleLogin}
            disabled={login !== LOGIN_ENUM['out']}
          >
            Login
          </Button>}
        {(login === LOGIN_ENUM['in'] || login === LOGIN_ENUM['temptOut']) &&
          <Button
            variant="secondary"
            onClick={handleLogout}
            disabled={login !== LOGIN_ENUM['in']}
          >
            Logout
          </Button>}
      </Col>
    </Row>
  )
}