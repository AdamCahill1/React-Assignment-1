import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlJt0-Af_cOQk5xuNSkzCeS1jseHXMLUE",
  authDomain: "react-assignment-ab83d.firebaseapp.com",
  projectId: "react-assignment-ab83d",
  storageBucket: "react-assignment-ab83d.appspot.com",
  messagingSenderId: "280073180052",
  appId: "1:280073180052:web:ae846e48d89bc4c57b7581"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);