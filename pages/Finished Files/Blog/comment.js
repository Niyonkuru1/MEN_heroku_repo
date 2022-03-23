  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import { getFirestore, arrayUnion, doc,
     collection, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCAMXuF7n_5lWaRI4M51Mb9aqLAMwjSOxY",
    authDomain: "admin-demo-7d3c5.firebaseapp.com",
    projectId: "admin-demo-7d3c5",
    storageBucket: "admin-demo-7d3c5.appspot.com",
    messagingSenderId: "961539757601",
    appId: "1:961539757601:web:d75a838e2d6bd1310bf560"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const comRef = doc(db, "comment", "custon_id");

setDoc(comRef, {
    name: ["Los angeles","Kigali", "Kigarama"]
})
.then(()=>{
    console.log("the server has sarted yet!!!!");
})

update(comRef, {
    name:["kigali", "gasabo"]
}).console.log("updated really")