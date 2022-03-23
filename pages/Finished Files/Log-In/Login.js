//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   import {getFirestore, collection, 
//     addDoc, deleteDoc, doc,
//     query, where, onSnapshot,
//     orderBy, getDoc,getDocs
//    } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
// import{getAuth, createUserWithEmailAndPassword, signOut,
//     signInWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js"
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCAMXuF7n_5lWaRI4M51Mb9aqLAMwjSOxY",
//     authDomain: "admin-demo-7d3c5.firebaseapp.com",
//     projectId: "admin-demo-7d3c5",
//     storageBucket: "admin-demo-7d3c5.appspot.com",
//     messagingSenderId: "961539757601",
//     appId: "1:961539757601:web:dcaae4af7ba93b5e0bf560"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app)
//   const auth = getAuth(app)
export function double(n){
  return n*2;
 }
// login
const loginForm = document.querySelector("#login")
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.email.value;
  const password = loginForm.password.value

  // signInWithEmailAndPassword(auth, email, password)
  // .then((cred)=> {
  //     console.log("User loged in: ", cred.user)
  //     // generate_table();
  //     startAdminPage();
  // })
  // .catch((err)=> {
  //     console.log(err.message)
  // })

  let loginCredentials = {
    email: email,
    password: password
  }

  fetch('https://my-brand-men-heroku.herokuapp.com/auth/login', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginCredentials)
  })
    .then(response => response.json())  
.then( res => {
  let response = `Bearer ${res.token}`;
    localStorage.setItem('token', response);
    if (loginCredentials.email == res.userCred.email){
               startAdminPage();
    }
    else {
      console.log(res.response);
    }
    // localStorage.removeItem("token");
} );
} );
function startAdminPage() {
  window.location.href = '../../admin/posts/index.html';
  // window.location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload')
}

  // ------ This is what you have to add --------

  // -------------------------------------------







  








