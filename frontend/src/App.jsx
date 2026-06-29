import api from "./api/api";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SummaryCard from "./components/SummaryCard/SummaryCard";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from "./components/FilterBar/FilterBar";
import Charts from "./components/Charts/Charts";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");





  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const response = await api.get("/transactions");

      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });
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

        <Charts
          income={income}
          expense={expense}
        />

        <TransactionForm
          transactions={transactions}
          setTransactions={setTransactions}
          fetchTransactions={fetchTransactions}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />


        <TransactionList
          transactions={filteredTransactions}
          setTransactions={setTransactions}
          fetchTransactions={fetchTransactions}
        />
      </div>
    </div>
  );
}

export default App;