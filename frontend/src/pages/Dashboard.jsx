import { motion } from "framer-motion";
import { useTransactions } from "../context/TransactionContext";

import SummaryCard from "../components/SummaryCard/SummaryCard";
import Charts from "../components/Charts/Charts";
import TransactionList from "../components/TransactionList/TransactionList";

function Dashboard() {
    const {
        transactions,
        setTransactions,
        fetchTransactions,
    } = useTransactions();

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    const recentTransactions = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 5);

    const biggestExpense = transactions
        .filter((t) => t.type === "expense")
        .sort((a, b) => b.amount - a.amount)[0];

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Hero */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">

                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    👋 Welcome back!
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                    Here's your financial overview.
                </p>

                <div className="mt-6">
                    <h2 className="text-5xl font-bold">
                        ₹{balance.toLocaleString("en-IN")}
                    </h2>

                    <p className="text-blue-100">
                        Current Balance
                    </p>
                </div>

            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <SummaryCard
                    title="Total Balance"
                    amount={`₹${balance.toLocaleString("en-IN")}`}
                />

                <SummaryCard
                    title="Income"
                    amount={`₹${income.toLocaleString("en-IN")}`}
                />

                <SummaryCard
                    title="Expense"
                    amount={`₹${expense.toLocaleString("en-IN")}`}
                />

                <SummaryCard
                    title="Biggest Expense"
                    amount={
                        biggestExpense
                            ? `₹${biggestExpense.amount.toLocaleString("en-IN")}`
                            : "₹0"
                    }
                />

            </div>

            {/* Chart + Recent */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-5 dark:text-white">
                        📊 Income vs Expense
                    </h2>

                    <Charts
                        income={income}
                        expense={expense}
                    />

                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">

                    <div className="flex justify-between items-center mb-5">

                        <h2 className="text-2xl font-bold dark:text-white">
                            🧾 Recent Transactions
                        </h2>

                        <span className="text-sm text-gray-500">
                            {recentTransactions.length} Items
                        </span>

                    </div>

                    <TransactionList
                        transactions={recentTransactions}
                        setTransactions={setTransactions}
                        fetchTransactions={fetchTransactions}
                    />

                </div>

            </div>

        </motion.div>
    );
}

export default Dashboard;