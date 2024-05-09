// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdlbGs--gbmaJbFYkCQI_JqODXNKIgU5E",
  authDomain: "instagram-carousel-c16b6.firebaseapp.com",
  projectId: "instagram-carousel-c16b6",
  storageBucket: "instagram-carousel-c16b6.appspot.com",
  messagingSenderId: "237676932464",
  appId: "1:237676932464:web:e0f8b6a50a23be8c8e33b5",
  measurementId: "G-8BEH3LSWN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
