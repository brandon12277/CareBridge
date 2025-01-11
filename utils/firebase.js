
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCR5U3I4PHZ4pwcBMR4moFZKFLMpbJYezk",
  authDomain: "bitmatch-472ef.firebaseapp.com",
  projectId: "bitmatch-472ef",
  storageBucket: "bitmatch-472ef.appspot.com",
  messagingSenderId: "359706768754",
  appId: "1:359706768754:web:2993746db234c39436d9eb",
  measurementId: "G-QJS6DC9JWJ"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp