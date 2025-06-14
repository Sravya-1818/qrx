// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBD4_ylSmK8jwlUuCr1eAI8Jf3-mrS5g_c",
  authDomain: "qrx-health.firebaseapp.com",
  projectId: "qrx-health",
  storageBucket: "qrx-health.appspot.com",
  messagingSenderId: "263513943",
  appId: "1:263513943:web:6484423a57eb7103658012",
  measurementId: "G-C4X0D3TX7H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
