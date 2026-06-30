import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

function Charts({ income, expense }) {
    const { darkMode } = useTheme();

    const pieData = [
        {
            name: "Income",
            value: income,
        },
        {
            name: "Expense",
            value: expense,
        },
    ];

    const barData = [
        {
            name: "Finance",
            Income: income,
            Expense: expense,
        },
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    const tooltipStyle = {
        backgroundColor: darkMode ? "#1e293b" : "#ffffff",
        border: "none",
        borderRadius: "12px",
        color: darkMode ? "#ffffff" : "#111827",
        boxShadow: "0 8px 20px rgba(0,0,0,.15)",
    };

    return (
        <div className="space-y-8">

            {/* Pie Chart */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">
                    💰 Income vs Expense
                </h2>

                <ResponsiveContainer width="100%" height={350}>

                    <PieChart>

                        <Pie
                            data={pieData}
                            dataKey="value"
                            outerRadius={120}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={{
                                color: darkMode
                                    ? "#fff"
                                    : "#111827",
                            }}
                        />

                        <Legend
                            wrapperStyle={{
                                color: darkMode
                                    ? "#fff"
                                    : "#111827",
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Comparison */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-white">
                    📊 Comparison
                </h2>

                <ResponsiveContainer width="100%" height={320}>

                    <BarChart data={barData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={
                                darkMode
                                    ? "#475569"
                                    : "#d1d5db"
                            }
                        />

                        <XAxis
                            dataKey="name"
                            stroke={
                                darkMode
                                    ? "#e2e8f0"
                                    : "#374151"
                            }
                        />

                        <YAxis
                            stroke={
                                darkMode
                                    ? "#e2e8f0"
                                    : "#374151"
                            }
                        />

                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={{
                                color: darkMode
                                    ? "#fff"
                                    : "#111827",
                            }}
                        />

                        <Legend
                            wrapperStyle={{
                                color: darkMode
                                    ? "#fff"
                                    : "#111827",
                            }}
                        />

                        <Bar
                            dataKey="Income"
                            fill="#22c55e"
                            radius={[8, 8, 0, 0]}
                        />

                        <Bar
                            dataKey="Expense"
                            fill="#ef4444"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default Charts;