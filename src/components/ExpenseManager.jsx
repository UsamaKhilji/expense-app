import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const expensesCollection = collection(firestore, "expenses");
      const expensesSnapshot = await getDocs(expensesCollection);
      const expensesList = expensesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesList);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteDoc(doc(firestore, "expenses", id));
      // Update state to remove deleted expense
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    console.log("Editing expense:", expense);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Expense Manager
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <AddExpenseForm onAddExpense={fetchExpenses} />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
};

export default ExpenseManager;
