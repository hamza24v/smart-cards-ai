// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_YIyBVg97XBnV-cLQ3w4X9Hl8aLreQEs",
  authDomain: "smart-cards-ai-35be6.firebaseapp.com",
  projectId: "smart-cards-ai-35be6",
  storageBucket: "smart-cards-ai-35be6.appspot.com",
  messagingSenderId: "917495405365",
  appId: "1:917495405365:web:06ecee44da124175da0a7c",
  measurementId: "G-0VR67RC25C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);