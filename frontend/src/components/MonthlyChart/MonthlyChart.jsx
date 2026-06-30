import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

function MonthlyChart({ transactions }) {
    const { darkMode } = useTheme();

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
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 transition-all">

            <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">
                Monthly Expenses
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#475569" : "#d1d5db"}
                    />

                    <XAxis
                        dataKey="month"
                        stroke={darkMode ? "#e2e8f0" : "#374151"}
                    />

                    <YAxis
                        stroke={darkMode ? "#e2e8f0" : "#374151"}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                            border: "none",
                            borderRadius: "12px",
                            color: darkMode ? "#ffffff" : "#111827",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,.15)",
                        }}
                        labelStyle={{
                            color: darkMode ? "#ffffff" : "#111827",
                        }}
                    />

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