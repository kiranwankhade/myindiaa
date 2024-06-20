import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithRedirect,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIMGn6r_EBqKpIJOuvcTVGW3CFowiFeK0",
  authDomain: "myindiaa-98b8b.firebaseapp.com",
  projectId: "myindiaa-98b8b",
  storageBucket: "myindiaa-98b8b.appspot.com",
  messagingSenderId: "414854686194",
  appId: "1:414854686194:web:727dd83a4bfeb1058c376b",
  measurementId: "G-TNF00MSNGT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res =  await signInWithRedirect(auth, googleProvider);; // Changed to signInWithPopup
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
    return user; // Return user
  } catch (err) {
    console.error('Error signing in with Google:', err.message);
    throw err; // Throw the error to be caught in the action
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user
  } catch (err) {
    console.error(err.message);
    throw err; // Throw the error to be caught in the action
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user; // Return user
  } catch (err) {
    console.error(err.message);
    throw err; // Throw the error to be caught in the action
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err.message);
    throw err; // Throw the error to be caught in the action
  }
};

const logOut = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
};
