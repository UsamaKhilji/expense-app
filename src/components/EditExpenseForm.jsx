// EditExpenseForm.jsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

const EditExpenseForm = () => {
  const location = useLocation();
  const { expense } = location.state; // Retrieve the expense from state
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    (updatedExpense) =>
      updateDoc(doc(firestore, "expenses", expense.id), updatedExpense),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses"]);
        navigate("/expenses"); // Navigate back to expenses page after editing
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      amount: parseFloat(amount),
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <button type="submit">Update Expense</button>
    </form>
  );
};

export default EditExpenseForm;
