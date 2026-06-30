import BudgetCard from "../components/BudgetCard/BudgetCard";
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
        .reverse()
        .slice(0, 5);

    const biggestExpense = transactions
        .filter((t) => t.type === "expense")
        .sort((a, b) => b.amount - a.amount)[0];

    return (
        <div className="space-y-8">

            {/* Heading */}
            <div>
                <h1 className="text-4xl font-bold text-black dark:text-white">
                    👋 Welcome back!
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                    Here's your financial overview.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <SummaryCard
                    title="Total Balance"
                    amount={`₹${balance}`}
                    color="#2563eb"
                />

                <SummaryCard
                    title="Income"
                    amount={`₹${income}`}
                    color="#16a34a"
                />

                <SummaryCard
                    title="Expense"
                    amount={`₹${expense}`}
                    color="#dc2626"
                />

                <SummaryCard
                    title="Biggest Expense"
                    amount={
                        biggestExpense
                            ? `₹${biggestExpense.amount}`
                            : "₹0"
                    }
                    color="#ea580c"
                />

                <BudgetCard
                    expense={expense}
                />

            </div>

            {/* Chart + Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <Charts
                    income={income}
                    expense={expense}
                />

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-2xl font-bold mb-4">
                        Recent Transactions
                    </h2>

                    <TransactionList
                        transactions={recentTransactions}
                        setTransactions={setTransactions}
                        fetchTransactions={fetchTransactions}
                    />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;