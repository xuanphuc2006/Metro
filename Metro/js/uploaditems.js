import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { doc, getFirestore, collection, getDocs, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDsbnvT30rajihtSFpl3NTK64Qt3JzOWA",
  authDomain: "metro-6c5b7.firebaseapp.com",
  projectId: "metro-6c5b7",
  storageBucket: "metro-6c5b7.appspot.com",
  messagingSenderId: "35846079387",
  appId: "1:35846079387:web:ccdce0733ae1624673173e",
  measurementId: "G-WZM8824LT0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
async function getProduct(db) {
  const usersCol = collection(db, 'products'); // Lấy thông tin của collection users
  const userSnapshot = await getDocs(usersCol); // Lấy document của collection users
  const userList = userSnapshot.docs.map(doc => doc.data()); // 
  return userList;
}
async function addProduct(db, product) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function updateProduct(db, document, newValue) {
  await setDoc(doc(db, 'products', document.id), newValue);
}
const form = document.getElementById("myForm")

function displaySuccessMessage(title) {
  Swal.fire({
    title,
    icon: 'success',
    showConfirmButton: false
  })
}

async function handleSubmitForm(e) {
  e.preventDefault()

  const name = form['Name'].value

  const price = form['Price'].value

  const itemShop =
  {
    name: name,
    price: price
  }

  await addProduct(db, itemShop)
  displaySuccessMessage("Upload item successfully!")
  window.location.href = './index.html'
}
form.onsubmit = await handleSubmitForm