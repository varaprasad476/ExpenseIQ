import { toast } from "sonner";
import api from "../../api/api";
import { useState } from "react";

import "./TransactionList.css";

import ConfirmModal from "../ConfirmModal/ConfirmModal";
import TransactionCard from "../TransactionCard/TransactionCard";

function TransactionList({
    transactions,
    setTransactions,
    fetchTransactions,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");

    function openDeleteModal(id, title) {
        setSelectedId(id);
        setSelectedTitle(title);
        setIsModalOpen(true);
    }

    async function confirmDelete() {
        try {
            await api.delete(`/transactions/${selectedId}`);

            await fetchTransactions();

            toast.success("Transaction deleted successfully");

            setIsModalOpen(false);
            setSelectedId(null);
            setSelectedTitle("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete transaction");
        }
    }

    function cancelDelete() {
        setIsModalOpen(false);
        setSelectedId(null);
        setSelectedTitle("");
    }

    return (
        <>
            <div className="transaction-list">
                {transactions.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No transactions found.
                    </div>
                ) : (
                    transactions.map((transaction) => (
                        <TransactionCard
                            key={transaction._id}
                            transaction={transaction}
                            transactions={transactions}
                            setTransactions={setTransactions}
                            fetchTransactions={fetchTransactions}
                            openDeleteModal={openDeleteModal}
                        />
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