import { useTransactions } from "../context/TransactionContext";

import Navbar from "../components/Navbar/Navbar";
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
        .reverse()
        .slice(0, 5);

    const biggestExpense = transactions
        .filter((t) => t.type === "expense")
        .sort((a, b) => b.amount - a.amount)[0];

    return (
        <div className="space-y-8">

            <Navbar />

            <div>
                <h1 className="text-4xl font-bold">
                    👋 Welcome back!
                </h1>

                <p className="text-gray-500 mt-2">
                    Here's your financial overview.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

            <div className="bg-white rounded-2xl shadow-md p-6">

                <h3 className="text-xl font-semibold mb-4">
                    🔥 Biggest Expense
                </h3>

                {biggestExpense ? (
                    <>
                        <h2 className="text-3xl font-bold text-red-500">
                            ₹{biggestExpense.amount}
                        </h2>

                        <p className="mt-2 font-medium">
                            {biggestExpense.title}
                        </p>

                        <p className="text-gray-500">
                            {biggestExpense.category}
                        </p>
                    </>
                ) : (
                    <p>No expenses yet.</p>
                )}

            </div>

            <Charts
                income={income}
                expense={expense}
            />

            <div>

                <h2 className="text-2xl font-semibold mb-5">
                    Recent Transactions
                </h2>

                <TransactionList
                    transactions={recentTransactions}
                    setTransactions={setTransactions}
                    fetchTransactions={fetchTransactions}
                />

            </div>

        </div>
    );
}

export default Dashboard;