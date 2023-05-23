// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKCfYrWCcbUZ9Qs7jkFeHxk0HpsaVHeeI",
  authDomain: "vanlife-dfb17.firebaseapp.com",
  projectId: "vanlife-dfb17",
  storageBucket: "vanlife-dfb17.appspot.com",
  messagingSenderId: "355390799301",
  appId: "1:355390799301:web:56af2390e328963fac5fac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create database, gets data from firestore, connects to app created above
const db = getFirestore(app);

// Create variable to get all vans in collection
const vansCollectionRef = collection(db, "vans");

// Firestore getVans
export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // console.log(dataArr);
  return dataArr;
}

// Get individual vans by id from Firestore
export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

// MirageJS getVans
// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

// Firestore function to get all vans for specific host (hard coded 123 host)
// export async function getHostVans() {
//   // like select * from ... where id = ... in mysql
//   // 123 is hard coded here, but you could put a variable there based on the information given at login
//   const q = query(vansCollectionRef, where("hostId", "==", "456"));
//   const querySnapshot = await getDocs(q);
//   const dataArr = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return dataArr;
// }

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", 123));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log("FIREBASE!");
  console.log(dataArr); //empty array
  return dataArr;
}

// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

// OLD GET VANS FUNCTION
// export async function getVans() {
//   const res = await fetch("/api/vans");
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

// OLD FETCH FROM USEEFFECT
// fetch("/api/vans")
//   .then((res) => res.json())
//   .then((data) => setVans(data.vans));
