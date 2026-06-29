import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

import SearchBar from "../components/SearchBar/SearchBar";
import FilterBar from "../components/FilterBar/FilterBar";
import TransactionList from "../components/TransactionList/TransactionList";

function Transactions() {
    const { transactions, setTransactions, fetchTransactions } = useTransactions();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || transaction.type === filter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <h1>📋 Transactions</h1>

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
        </>
    );
}

export default Transactions;