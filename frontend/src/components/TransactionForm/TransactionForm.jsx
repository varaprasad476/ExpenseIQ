import { useState } from "react";
import "./TransactionForm.css";

function TransactionForm({ transactions, setTransactions }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Income");

    function addTransaction() {
        if (title === "" || amount === "") {
            alert("Please fill all fields!");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            title,
            amount: Number(amount),
            type,
            date: new Intl.DateTimeFormat("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date()),
        };

        setTransactions([...transactions, newTransaction]);

        setTitle("");
        setAmount("");
        setType("Income");
    }

    return (
        <div className="transaction-form">
            <h2>Add Transaction</h2>

            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option>Income</option>
                <option>Expense</option>
            </select>

            <button onClick={addTransaction}>
                Add Transaction
            </button>
        </div>
    );
}

export default TransactionForm;