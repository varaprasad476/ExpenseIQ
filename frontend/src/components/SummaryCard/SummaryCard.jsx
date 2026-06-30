import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CircleDollarSign,
} from "lucide-react";

function SummaryCard({ title, amount }) {
    const getCardStyle = () => {
        switch (title) {
            case "Income":
                return {
                    icon: <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />,
                    gradient:
                        "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
                    amount: "text-green-600 dark:text-green-400",
                };

            case "Expense":
                return {
                    icon: <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />,
                    gradient:
                        "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
                    amount: "text-red-600 dark:text-red-400",
                };

            case "Biggest Expense":
                return {
                    icon: <CircleDollarSign className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
                    gradient:
                        "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
                    amount: "text-orange-600 dark:text-orange-400",
                };

            default:
                return {
                    icon: <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                    gradient:
                        "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
                    amount: "text-blue-600 dark:text-blue-400",
                };
        }
    };

    const style = getCardStyle();

    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.03,
            }}
            whileTap={{
                scale: 0.97,
            }}
        >
            <Card

                className={`
                bg-gradient-to-br ${style.gradient}
                rounded-3xl
                border-0
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
            `}
            >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            {title}
                        </p>

                        <h2
                            className={`text-3xl font-extrabold mt-3 ${style.amount}`}
                        >
                            {amount}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-md">
                        {style.icon}
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="h-1 rounded-full bg-white/50 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full w-full rounded-full bg-current opacity-20"></div>
                    </div>

                    <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">
                        Updated just now
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SummaryCard;