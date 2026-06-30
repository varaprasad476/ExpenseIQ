import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "../../api/api";
import { useState } from "react";
import "./TransactionCard.css";

function TransactionCard({
    transaction,
    fetchTransactions,
    openDeleteModal,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(transaction.title);
    const [amount, setAmount] = useState(transaction.amount);
    const [type, setType] = useState(
        transaction.type.charAt(0).toUpperCase() +
        transaction.type.slice(1)
    );
    const [category, setCategory] = useState(transaction.category);

    async function saveTransaction() {
        try {
            await api.put(`/transactions/${transaction._id}`, {
                title,
                amount: Number(amount),
                type: type.toLowerCase(),
                category,
            });

            await fetchTransactions();

            toast.success("Transaction updated successfully");

            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update transaction");
        }
    }

    function cancelEdit() {
        setTitle(transaction.title);
        setAmount(transaction.amount);
        setType(
            transaction.type.charAt(0).toUpperCase() +
            transaction.type.slice(1)
        );
        setCategory(transaction.category);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <motion.div
                className="transaction-item"
                layout
                whileHover={{ y: -5 }}
            >

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    value={type}
                    onChange={(e) => {
                        const newType = e.target.value;
                        setType(newType);

                        if (newType === "Income") {
                            setCategory("Salary");
                        } else {
                            setCategory("Food");
                        }
                    }}
                >
                    <option>Income</option>
                    <option>Expense</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {type === "Income" ? (
                        <>
                            <option>Salary</option>
                            <option>Freelance</option>
                            <option>Bonus</option>
                            <option>Investment</option>
                        </>
                    ) : (
                        <>
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Entertainment</option>
                            <option>Health</option>
                            <option>Education</option>
                        </>
                    )}
                </select>

                <div className="transaction-actions">

                    <button
                        className="edit-btn"
                        onClick={saveTransaction}
                    >
                        💾 Save
                    </button>

                    <button
                        className="delete-btn"
                        onClick={cancelEdit}
                    >
                        ❌ Cancel
                    </button>

                </div>

            </motion.div>
        );
    }

    return (
        <motion.div
            className="transaction-item"
            whileHover={{
                y: -5,
                scale: 1.01,
            }}
            layout
        >

            <div className="transaction-header">

                <div>

                    <div className="transaction-title">
                        💰 {transaction.title}
                    </div>

                    <div className="transaction-type">
                        {transaction.type === "income"
                            ? "🟢 Income"
                            : "🔴 Expense"}
                    </div>

                    <div className="transaction-category">
                        🏷️ {transaction.category}
                    </div>

                    <small className="transaction-date">
                        🕒{" "}
                        {new Date(transaction.date).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </small>

                </div>

                <div
                    className="transaction-amount"
                    style={{
                        color:
                            transaction.type === "income"
                                ? "green"
                                : "red",
                    }}
                >
                    ₹{new Intl.NumberFormat("en-IN").format(
                        transaction.amount
                    )}
                </div>

            </div>

            <div className="transaction-actions">

                <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                >
                    ✏️ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() =>
                        openDeleteModal(
                            transaction._id,
                            transaction.title
                        )
                    }
                >
                    🗑 Delete
                </button>

            </div>

        </motion.div>
    );
}

export default TransactionCard;