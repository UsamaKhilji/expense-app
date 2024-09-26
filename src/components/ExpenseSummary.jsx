const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const breakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  return (
    <div>
      <h2>Total Expenses: {total}</h2>
      <ul>
        {Object.keys(breakdown).map((category) => (
          <li key={category}>
            {category}: {breakdown[category]}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ExpenseSummary;
