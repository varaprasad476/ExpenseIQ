import { useState } from "react";

function BudgetCard({ expense }) {
    const [budget, setBudget] = useState(10000);

    const percentage = Math.min(
        (expense / budget) * 100,
        100
    );

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold">
                    Monthly Budget
                </h2>

                <input
                    type="number"
                    value={budget}
                    onChange={(e) =>
                        setBudget(Number(e.target.value))
                    }
                    className="border rounded-lg px-3 py-2 w-32"
                />

            </div>

            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

                <div
                    className={`h-full ${percentage > 90
                            ? "bg-red-500"
                            : percentage > 70
                                ? "bg-yellow-400"
                                : "bg-green-500"
                        }`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <div className="mt-4 flex justify-between">

                <span>
                    ₹{expense}
                </span>

                <span>
                    ₹{budget}
                </span>

            </div>

            {expense > budget && (
                <p className="text-red-500 mt-3 font-semibold">
                    ⚠ Budget Exceeded
                </p>
            )}

        </div>
    );
}

export default BudgetCard;