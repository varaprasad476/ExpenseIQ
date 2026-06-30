import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {
        setLoading(true);

        try {
            const response = await api.get("/transactions");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
                fetchTransactions,
                loading,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}