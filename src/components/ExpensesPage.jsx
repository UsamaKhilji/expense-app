// ExpensesPage.jsx
import React, { useState } from "react";
import ExpenseList from "./ExpenseList";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);

  const handleEdit = (id) => {
    console.log(`Editing expense with ID: ${id}`);
    // Logic for editing the expense, perhaps opening a modal
  };

  const handleDelete = (id) => {
    console.log(`Deleting expense with ID: ${id}`);
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
    // Logic to delete the expense
  };

  return (
    <div>
      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Other components like AddExpenseForm */}
    </div>
  );
};

export default ExpensesPage;
