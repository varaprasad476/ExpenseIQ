import { motion } from "framer-motion";
import TransactionForm from "../components/TransactionForm/TransactionForm";

function AddTransaction() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
        >
            {/* Header */}
            <div className="mb-8">

                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    💸 Add Transaction
                </h1>

                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Record your income or expenses to keep your finances up to date.
                </p>

            </div>

            {/* Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border dark:border-slate-800">

                <TransactionForm />

            </div>

        </motion.div>
    );
}

export default AddTransaction;