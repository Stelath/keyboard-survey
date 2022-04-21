import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfZVSJ-DrP-u1wuiZOnxXEKPIe-3hEypA",
  authDomain: "keys-place.firebaseapp.com",
  projectId: "keys-place",
  storageBucket: "keys-place.appspot.com",
  messagingSenderId: "1090981446886",
  appId: "1:1090981446886:web:6451e96fe41376b3672727"
};

const app = initializeApp(firebaseConfig);
export default app;