import { initializeApp } from "firebase/app"; 
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GithubAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";
import { useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCGZBEkPBfgJlTb6mBFtiKtwEX3gF6yT3c",
  authDomain: "auth-firebase-522b5.firebaseapp.com",
  projectId: "auth-firebase-522b5",
  storageBucket: "auth-firebase-522b5.appspot.com",
  messagingSenderId: "1058939722694",
  appId: "1:1058939722694:web:50afb785553a451e43b0c7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};


const facebookProvider = new FacebookAuthProvider();
        facebookProvider.addScope('email');

const logInWithFacebook =  async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const logInWithGithub =  async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email : string, password : string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name : string, email : string, password : string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email : string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  logInWithFacebook,
  logInWithGithub
};
