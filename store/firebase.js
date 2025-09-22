import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDT7N55z9cNtaI1aVcskVALCW9K09Q3iWQ',
  authDomain: 'chat-9aab3.firebaseapp.com',
  databaseURL: 'https://chat-9aab3-default-rtdb.firebaseio.com',
  projectId: 'chat-9aab3',
  storageBucket: 'chat-9aab3.appspot.com',
  messagingSenderId: '29454175828',
  appId: '1:29454175828:web:f76997b096c1802106a7c1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
