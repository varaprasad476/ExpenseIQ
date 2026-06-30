import { toast } from "sonner";
import api from "../../api/api";
import { useState } from "react";

import "./TransactionList.css";

import ConfirmModal from "../ConfirmModal/ConfirmModal";
import TransactionCard from "../TransactionCard/TransactionCard";
import { useTransactions } from "../../context/TransactionContext";

function TransactionList({
    transactions,
    setTransactions,
    fetchTransactions,
}) {
    const { loading } = useTransactions();

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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="transaction-list">

                {transactions.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-6xl mb-4">📭</h2>

                        <h3 className="text-2xl font-bold dark:text-white">
                            No Transactions Yet
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Start by adding your first transaction.
                        </p>
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