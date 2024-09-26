import React from "react";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
      <span className="font-semibold">{expense.title}</span>
      <span className="text-gray-600">${expense.amount}</span>
      <div>
        <button
          onClick={() => onEdit(expense)} // Pass the expense for editing
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)} // Call onDelete with expense id
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
