import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8Wxi_dHFT46gc5_kvKavGb_SFwb6zc-o",
  authDomain: "appcripto2024-2fc89.firebaseapp.com",
  projectId: "appcripto2024-2fc89",
  storageBucket: "appcripto2024-2fc89.appspot.com",
  messagingSenderId: "310697803863",
  appId: "1:310697803863:web:0f09b2769e1fa008bee312"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);