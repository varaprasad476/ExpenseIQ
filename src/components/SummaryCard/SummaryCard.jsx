import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

function SummaryCard({ title, amount, color }) {
    const getIcon = () => {
        if (title === "Income")
            return <TrendingUp className="h-7 w-7 text-green-500" />;

        if (title === "Expense")
            return <TrendingDown className="h-7 w-7 text-red-500" />;

        return <Wallet className="h-7 w-7 text-blue-500" />;
    };

    return (
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2
                        className="text-3xl font-bold mt-2"
                        style={{ color }}
                    >
                        {amount}
                    </h2>
                </div>

                {getIcon()}
            </CardHeader>

            <CardContent>
                <p className="text-xs text-gray-400">
                    Updated just now
                </p>
            </CardContent>
        </Card>
    );
}

export default SummaryCard;