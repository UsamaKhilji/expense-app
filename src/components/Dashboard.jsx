import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchExpenses = async () => {
    if (auth.currentUser) {
      const expensesCollection = collection(firestore, "expenses");
      const expensesSnapshot = await getDocs(expensesCollection);
      const expensesList = expensesSnapshot.docs
        .filter((doc) => doc.data().userId === auth.currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setExpenses(expensesList);
      calculateTotal(expensesList);
    }
  };

  const calculateTotal = (expensesList) => {
    const total = expensesList.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setTotalExpenses(total);
  };

  useEffect(() => {
    fetchExpenses();
  }, [auth.currentUser]);

  const handleAddExpense = async (expense) => {
    try {
      await addDoc(collection(firestore, "expenses"), {
        ...expense,
        userId: auth.currentUser.uid,
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(firestore, "expenses", expenseId);
      await deleteDoc(expenseRef);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = async (expenseId, updatedExpense) => {
    try {
      const expenseRef = doc(firestore, "expenses", expenseId);
      await updateDoc(expenseRef, {
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        date: updatedExpense.date,
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to login or handle logout UI
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-300 to-blue-300">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Expense Management</h1>
        <h2 className="text-xl mb-4">Total Expenses: ${totalExpenses}</h2>
        <AddExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
