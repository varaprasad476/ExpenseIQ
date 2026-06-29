import { useState } from "react";
import "./TransactionList.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function TransactionList({
    transactions,
    setTransactions,
    setEditingTransaction,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");

    function openDeleteModal(id, title) {
        setSelectedId(id);
        setSelectedTitle(title);
        setIsModalOpen(true);
    }

    function confirmDelete() {
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== selectedId
        );

        setTransactions(updatedTransactions);
        setIsModalOpen(false);
        setSelectedId(null);
        setSelectedTitle("");
    }

    function cancelDelete() {
        setIsModalOpen(false);
        setSelectedId(null);
        setSelectedTitle("");
    }

    function editTransaction(transaction) {
        setEditingTransaction(transaction);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            <div className="transaction-list">
                <h2>Recent Transactions</h2>

                {transactions.length === 0 ? (
                    <p>No transactions yet.</p>
                ) : (
                    transactions.map((transaction) => (
                        <div className="transaction-item" key={transaction.id}>
                            <div className="transaction-header">
                                <div>
                                    <div className="transaction-title">
                                        💰 {transaction.title}
                                    </div>

                                    <div className="transaction-type">
                                        {transaction.type === "Income" ? "🟢 Income" : "🔴 Expense"}
                                    </div>

                                    <small className="transaction-date">
                                        🕒 {transaction.date}
                                    </small>
                                </div>

                                <div
                                    className="transaction-amount"
                                    style={{
                                        color:
                                            transaction.type === "Income"
                                                ? "green"
                                                : "red",
                                    }}
                                >
                                    ₹{transaction.amount}
                                </div>
                            </div>

                            <div className="transaction-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => editTransaction(transaction)}
                                >
                                    ✏ Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        openDeleteModal(
                                            transaction.id,
                                            transaction.title
                                        )
                                    }
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                transactionTitle={selectedTitle}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    );
}

export default TransactionList;