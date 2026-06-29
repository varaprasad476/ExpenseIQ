import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {
        try {
            const response = await api.get("/transactions");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
                fetchTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}