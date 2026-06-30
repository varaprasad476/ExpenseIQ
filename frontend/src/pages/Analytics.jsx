import MonthlyChart from "../components/MonthlyChart/MonthlyChart";
import { useTransactions } from "../context/TransactionContext";
import Charts from "../components/Charts/Charts";

function Analytics() {
    const { transactions } = useTransactions();

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    📊 Analytics
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                    Visualize your financial data.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <Charts
                    income={income}
                    expense={expense}
                />

                <MonthlyChart
                    transactions={transactions}
                />

            </div>

        </div>
    );
}

export default Analytics;