import React, { useState } from "react";

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editDetails, setEditDetails] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleEditClick = (expense) => {
    setIsEditing(expense.id);
    setEditDetails({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleUpdate = (e, expenseId) => {
    e.preventDefault();
    onEditExpense(expenseId, editDetails);
    setIsEditing(null);
    setEditDetails({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <div className="mt-6">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-600">No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
            >
              {isEditing === expense.id ? (
                <form
                  onSubmit={(e) => handleUpdate(e, expense.id)}
                  className="flex flex-col space-y-2 w-full"
                >
                  <input
                    type="text"
                    value={editDetails.title}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, title: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="number"
                    value={editDetails.amount}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        amount: Number(e.target.value),
                      })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="text"
                    value={editDetails.category}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        category: e.target.value,
                      })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="date"
                    value={editDetails.date}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, date: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(null)}
                    className="bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold">{expense.title}</h3>
                    <p>${expense.amount}</p>
                    <p>{expense.category}</p>
                    <p>{expense.date}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
