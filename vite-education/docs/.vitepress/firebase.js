import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
        apiKey: "AIzaSyC1WfyhIqmL1n7ahPL-XVSAmBECWxMTUrg",
        authDomain: "gh-education.firebaseapp.com",
        projectId: "gh-education",
        storageBucket: "gh-education.appspot.com",
        messagingSenderId: "232266340667",
        appId: "1:232266340667:web:15dc478ab3ef65c66c7f1e",
        measurementId: "G-1N1LRJY9RP"
};	

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };


