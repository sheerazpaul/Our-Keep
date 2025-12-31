import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL1OUoyItUsLDO66nN7SPhSPpzAsXFJOI",
  authDomain: "keep-notes-70fd2.firebaseapp.com",
  projectId: "keep-notes-70fd2",
  storageBucket: "keep-notes-70fd2.appspot.com",
  messagingSenderId: "1076679639750",
  appId: "1:1076679639750:web:bd5ac58c725a8d0a014dc7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
