import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SummaryCard from "./components/SummaryCard/SummaryCard";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });



  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  return (
    <div className="app">
      <Navbar />

      <div className="dashboard">
        <h2>Dashboard</h2>

        <div className="cards">
          <SummaryCard
            title="Total Balance"
            amount={`₹${balance}`}
            color="black"
          />

          <SummaryCard
            title="Income"
            amount={`₹${income}`}
            color="green"
          />

          <SummaryCard
            title="Expense"
            amount={`₹${expense}`}
            color="red"
          />
        </div>

        <TransactionForm
          transactions={transactions}
          setTransactions={setTransactions}
        />

        <TransactionList
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
}

export default App;