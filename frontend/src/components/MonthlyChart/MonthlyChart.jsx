import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function MonthlyChart({ transactions }) {
    const monthlyData = {};

    transactions.forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", {
            month: "short",
        });

        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }

        if (t.type === "expense") {
            monthlyData[month] += t.amount;
        }
    });

    const data = Object.keys(monthlyData).map((month) => ({
        month,
        expense: monthlyData[month],
    }));

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-5">
                Monthly Expenses
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="expense"
                        fill="#ef4444"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyChart;