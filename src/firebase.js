import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import required Firestore functions
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6MMuGO_N1-TmSUMvukiVUz5gMv6KDUYs",
  authDomain: "signup-de50b.firebaseapp.com",
  projectId: "signup-de50b",
  storageBucket: "signup-de50b.appspot.com",
  messagingSenderId: "336921161672",
  appId: "1:336921161672:web:4bfbd068152825b1b81afd",
  measurementId: "G-4TF37M1QSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

// Function to add an expense to Firestore
const addExpenseToFirestore = async (expense) => {
  try {
    const expensesCollection = collection(firestore, "expenses"); // Reference to the 'expenses' collection
    const docRef = await addDoc(expensesCollection, expense); // Add document to the collection
    console.log("Expense added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding expense: ", error);
  }
};

// Exporting the necessary functions and instances
export { auth, firestore, addExpenseToFirestore }; // Export the function along with auth and firestore
