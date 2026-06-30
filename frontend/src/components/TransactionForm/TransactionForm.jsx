import { useTransactions } from "../../context/TransactionContext";
import { toast } from "sonner";
import api from "../../api/api";
import { useState } from "react";
import "./TransactionForm.css";

function TransactionForm() {
    const { fetchTransactions } = useTransactions();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Income");
    const [category, setCategory] = useState("Salary");

    async function addTransaction() {
        if (!title.trim() || !amount) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            await api.post("/transactions", {
                title,
                amount: Number(amount),
                type: type.toLowerCase(),
                category,
            });



            toast.success("Transaction added successfully");

            setTitle("");
            setAmount("");
            setType("Income");
            setCategory("Salary");

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add transaction"
            );
        }
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

            <button onClick={addTransaction}>
                Add Transaction
            </button>

        </div>
    );
}

export default TransactionForm;