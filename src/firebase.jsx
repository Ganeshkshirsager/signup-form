import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCrkPiZIqIx_aLYh6b9bKkpBb7T2wQvFZE",
    authDomain: "signup-form-bb947.firebaseapp.com",
    projectId: "signup-form-bb947",
    storageBucket: "signup-form-bb947.appspot.com",
    messagingSenderId: "844721537600",
    appId: "1:844721537600:web:5f4842803fa8184e3095a5",
    measurementId: "G-KPYV3CXSMT"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;