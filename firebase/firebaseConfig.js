import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBogqBx_4Ui4qtgGNJJt_bOZtxpsdmddPs",
    authDomain: "incomecalculator-1b65e.firebaseapp.com",
    databaseURL:
        "https://incomecalculator-1b65e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "incomecalculator-1b65e",
    storageBucket: "incomecalculator-1b65e.firebasestorage.app",
    messagingSenderId: "996719360587",
    appId: "1:996719360587:web:e8f91c89612c5f24292bce",
};

console.log("Api Key", firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
