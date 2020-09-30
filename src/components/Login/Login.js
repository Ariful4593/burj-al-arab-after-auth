import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
// import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCZB9Yc2vZ2R8qwtAwJXnrJ63QYKTcBEr0",
        authDomain: "burj-al-arabe.firebaseapp.com",
        databaseURL: "https://burj-al-arabe.firebaseio.com",
        projectId: "burj-al-arabe",
        storageBucket: "burj-al-arabe.appspot.com",
        messagingSenderId: "586187906882",
        appId: "1:586187906882:web:68439eff0e5cafe0d732db",
        measurementId: "G-1DKM3C0E57"
    };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            storeAuthToken();
            history.replace(from);
            // ...
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken)
        }).catch(function (error) {
            // Handle error
        });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;