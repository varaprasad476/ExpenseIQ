import { exportTransactionsPDF } from "../utils/exportToPDF";
import { exportTransactions } from "../utils/exportToExcel";
import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

import SearchBar from "../components/SearchBar/SearchBar";
import FilterBar from "../components/FilterBar/FilterBar";
import TransactionList from "../components/TransactionList/TransactionList";

function Transactions() {
    const {
        transactions,
        setTransactions,
        fetchTransactions,
    } = useTransactions();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            transaction.type === filter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">

            {/* Heading */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    📋 Transactions
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                    Search, filter, edit and manage all your transactions.
                </p>
            </div>

            {/* Search */}
            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            {/* Filter */}
            <FilterBar
                filter={filter}
                setFilter={setFilter}
            />

            {/* Export Buttons */}
            <div className="flex justify-end gap-3">

                <button
                    onClick={() => exportTransactions(filteredTransactions)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition-all"
                >
                    📊 Export Excel
                </button>

                <button
                    onClick={() =>
                        exportTransactionsPDF(filteredTransactions)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition-all"
                >
                    📄 Export PDF
                </button>

            </div>

            {/* Transactions */}
            <TransactionList
                transactions={filteredTransactions}
                setTransactions={setTransactions}
                fetchTransactions={fetchTransactions}
            />

        </div>
    );
}

export default Transactions;