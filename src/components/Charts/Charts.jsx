import "./Charts.css";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function Charts({ income, expense }) {
    const data = [
        {
            name: "Income",
            value: income,
        },
        {
            name: "Expense",
            value: expense,
        },
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="charts-container">
            <h2>Income vs Expense</h2>

            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={120}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Charts;