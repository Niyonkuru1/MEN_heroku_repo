import { initializeApp } from "firebase/app"

import { 
    getFirestore, collection, 
    addDoc, deleteDoc, doc,
    query, where, onSnapshot,
    orderBy, getDoc,getDocs
} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAJidNeknwN1962M8OO3cbkpxoODsAnsao",
    authDomain: "ninja-tutorial-cae63.firebaseapp.com",
    projectId: "ninja-tutorial-cae63",
    storageBucket: "ninja-tutorial-cae63.appspot.com",
    messagingSenderId: "1084100793609",
    appId: "1:1084100793609:web:998cf83d79e345874c2fd8"
  }

//   initialize firebase app
  initializeApp(firebaseConfig)
// init services
const db = getFirestore()

// collection ref

// Real time  collection data
    /* onSnapshot(q, (snapshot) => {
    //     let books = [];
    //     snapshot.docs.forEach((book)=>{
            // books.push({ ...book.data(), id: book.id})
    //     })
    // }) */
    const colRef = collection (db, "admin")
getDocs(colRef)
.then((snapshot)=> {
    console.log(snapshot)
})



    // adding document
    const addBookForm = document.querySelector(".add")
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        addDoc(colRef, {
            title: addBookForm.title.value,
            author: addBookForm.author.value
        })
        .then(()=>{
            addBookForm.reset()
        })
    })

     // deleting document
     const deleteBookForm = document.querySelector(".delete")
     deleteBookForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const docRef = doc(db, "admin", deleteBookForm.id.value)
        console.log(docRef)
         deleteDoc(docRef).then(()=>{
            deleteBookForm.reset()
        })
     })

    //  fetching single document
     const docRef = doc(db, "admin", "3RGYBhZwruOVjLpCFHVT")
     getDoc(docRef)
     .then((doc) => {
         console.log(doc.data());
     })