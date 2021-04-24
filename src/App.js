import { RecoilRoot } from 'recoil';

import { connect } from './components/DB';
import { Login } from './components/Login';
import { List } from './components/List';

import './App.scss';

function App() {
  connect();

  return (
    <RecoilRoot>
      <div className="container my-5">
        <List />
        <Login />
      </div>
    </RecoilRoot>
  );
}

export default App;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBSR0d-BPHVVGdlCJcjaDNZhFSt9CH_7vU",
    authDomain: "lesser-pass.firebaseapp.com",
    projectId: "lesser-pass",
    storageBucket: "lesser-pass.appspot.com",
    messagingSenderId: "386351610572",
    appId: "1:386351610572:web:0a5032f9797b7f4f452069",
    measurementId: "G-C7WK4HJ5EJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/
