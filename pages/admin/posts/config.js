export function config (){
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAMXuF7n_5lWaRI4M51Mb9aqLAMwjSOxY",
  authDomain: "admin-demo-7d3c5.firebaseapp.com",
  projectId: "admin-demo-7d3c5",
  storageBucket: "admin-demo-7d3c5.appspot.com",
  messagingSenderId: "961539757601",
  appId: "1:961539757601:web:99007960d258cac90bf560"
};

// Initialize Firebas
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const ref = collection(db,"admin-page")
}