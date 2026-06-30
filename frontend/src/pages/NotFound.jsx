import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";
import { User, Mail, Wallet, TrendingUp, TrendingDown } from "lucide-react";

function Profile() {
    const { user } = useAuth();
    const { transactions } = useTransactions();

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-8"
        >
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                <div className="flex flex-col md:flex-row items-center gap-8">

                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                        <User size={60} />
                    </div>

                    <div className="flex-1">

                        <h1 className="text-4xl font-bold dark:text-white">
                            {user?.name}
                        </h1>

                        <p className="flex items-center gap-2 text-gray-500 mt-3">
                            <Mail size={18} />
                            {user?.email}
                        </p>

                        <p className="mt-5 text-gray-500">
                            Welcome to <span className="font-semibold text-blue-600">ExpenseIQ</span>.
                            Track your finances with confidence.
                        </p>

                    </div>

                </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-green-50 dark:bg-green-950 rounded-3xl p-6 shadow">

                    <TrendingUp
                        className="text-green-600 mb-4"
                        size={34}
                    />

                    <h2 className="text-gray-500">
                        Total Income
                    </h2>

                    <h1 className="text-3xl font-bold text-green-600 mt-2">
                        ₹{income.toLocaleString("en-IN")}
                    </h1>

                </div>

                <div className="bg-red-50 dark:bg-red-950 rounded-3xl p-6 shadow">

                    <TrendingDown
                        className="text-red-600 mb-4"
                        size={34}
                    />

                    <h2 className="text-gray-500">
                        Total Expense
                    </h2>

                    <h1 className="text-3xl font-bold text-red-600 mt-2">
                        ₹{expense.toLocaleString("en-IN")}
                    </h1>

                </div>

                <div className="bg-blue-50 dark:bg-blue-950 rounded-3xl p-6 shadow">

                    <Wallet
                        className="text-blue-600 mb-4"
                        size={34}
                    />

                    <h2 className="text-gray-500">
                        Transactions
                    </h2>

                    <h1 className="text-3xl font-bold text-blue-600 mt-2">
                        {transactions.length}
                    </h1>

                </div>

            </div>
        </motion.div>
    );
}

export default Profile;