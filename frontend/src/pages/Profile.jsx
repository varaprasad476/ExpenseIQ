import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import api from "../api/api";

import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";

import {
    User,
    Mail,
    Wallet,
    TrendingUp,
    TrendingDown,
    Calendar,
    Pencil,
    Lock,
} from "lucide-react";

function Profile() {
    const { user, updateUser } = useAuth();
    const { transactions } = useTransactions();

    const [name, setName] = useState(user?.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    const biggestExpense =
        transactions
            .filter((t) => t.type === "expense")
            .sort((a, b) => b.amount - a.amount)[0]?.amount || 0;

    async function handleUpdate() {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            const response = await api.put("/auth/profile", {
                name,
            });

            updateUser(response.data.user);

            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    }

    async function handlePasswordChange() {
        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            toast.error("Fill all password fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            await api.put("/auth/change-password", {
                currentPassword,
                newPassword,
            });

            toast.success("Password updated successfully");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update password"
            );
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8"
        >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                <div className="flex flex-col md:flex-row items-center gap-8">

                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            {user?.name}
                        </h1>

                        <p className="flex items-center gap-2 mt-3 text-gray-500 dark:text-gray-400">
                            <Mail size={18} />
                            {user?.email}
                        </p>

                        <p className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                            <Calendar size={18} />
                            ExpenseIQ Member
                        </p>

                    </div>

                </div>

            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                    <Pencil className="inline mr-2" />
                    Edit Profile
                </h2>

                <label className="block mb-2 font-semibold text-slate-900 dark:text-white">
                    Name
                </label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />

                <button
                    onClick={handleUpdate}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Save Changes
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-green-50 dark:bg-green-950 rounded-3xl p-6 shadow">

                    <TrendingUp
                        className="text-green-600 mb-3"
                        size={32}
                    />

                    <p className="text-gray-500 dark:text-gray-400">
                        Income
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        ₹{income.toLocaleString("en-IN")}
                    </h2>

                </div>

                <div className="bg-red-50 dark:bg-red-950 rounded-3xl p-6 shadow">

                    <TrendingDown
                        className="text-red-600 mb-3"
                        size={32}
                    />

                    <p className="text-gray-500 dark:text-gray-400">
                        Expense
                    </p>

                    <h2 className="text-3xl font-bold text-red-600 mt-2">
                        ₹{expense.toLocaleString("en-IN")}
                    </h2>

                </div>

                <div className="bg-blue-50 dark:bg-blue-950 rounded-3xl p-6 shadow">

                    <Wallet
                        className="text-blue-600 mb-3"
                        size={32}
                    />

                    <p className="text-gray-500 dark:text-gray-400">
                        Balance
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        ₹{balance.toLocaleString("en-IN")}
                    </h2>

                </div>

                <div className="bg-orange-50 dark:bg-orange-950 rounded-3xl p-6 shadow">

                    <User
                        className="text-orange-600 mb-3"
                        size={32}
                    />

                    <p className="text-gray-500 dark:text-gray-400">
                        Biggest Expense
                    </p>

                    <h2 className="text-3xl font-bold text-orange-600 mt-2">
                        ₹{biggestExpense.toLocaleString("en-IN")}
                    </h2>

                </div>

            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                    <Lock className="inline mr-2" />
                    Change Password
                </h2>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 rounded-xl border mb-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 rounded-xl border mb-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-4 rounded-xl border mb-6 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />

                <button
                    onClick={handlePasswordChange}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Update Password
                </button>

            </div>

        </motion.div>
    );
}

export default Profile;