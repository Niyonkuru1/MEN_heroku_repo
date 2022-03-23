
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
import {getFirestore, collection, 
  addDoc, deleteDoc, doc,
  query, where, onSnapshot, serverTimestamp
  , getDoc,getDocs
 } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCAMXuF7n_5lWaRI4M51Mb9aqLAMwjSOxY",
    authDomain: "admin-demo-7d3c5.firebaseapp.com",
    projectId: "admin-demo-7d3c5",
    storageBucket: "admin-demo-7d3c5.appspot.com",
    messagingSenderId: "961539757601",
    appId: "1:961539757601:web:c13ad8d2ecf4d1840bf560"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const refCom = collection(db,"comment_section")
   
  // ADDING the datas into database
  const addComment = document.querySelector("#contacti")
  addComment.addEventListener("submit", (e) => {
      e.preventDefault()
      addDoc(refCom, {
        Name: addComment.name.value,
        email: addComment.email.value,
        Phone:addComment.phone.value,
        Message: document.getElementById('message').value,
        MessageSentAt: serverTimestamp()
    })
    .then(() => {
        console.log("The message has been added SUCCESSFULLY");
        // alert("the message sent successfully!!!");
        addComment.reset()
    })
    .catch((err) => {
    console.log("The error has been occured: " + err);
    })
  })
