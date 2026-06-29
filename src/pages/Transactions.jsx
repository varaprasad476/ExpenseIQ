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
                <h1 className="text-4xl font-bold">
                    📋 Transactions
                </h1>

                <p className="text-gray-500">
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

            <div className="flex justify-end">
                <button
                    onClick={() => exportTransactions(filteredTransactions)}
                    className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
                >
                    📥 Export to Excel
                </button>
            </div>

            <div className="flex gap-3 justify-end">

                <button
                    onClick={() => exportTransactions(filteredTransactions)}
                    className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
                >
                    📥 Excel
                </button>

                <button
                    onClick={() =>
                        exportTransactionsPDF(filteredTransactions)
                    }
                    className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700"
                >
                    📄 PDF
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