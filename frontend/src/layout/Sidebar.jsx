import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    LayoutDashboard,
    PlusCircle,
    Receipt,
    PieChart,
    User,
    Moon,
    Sun,
    LogOut,
    Wallet,
} from "lucide-react";

function Sidebar() {
    const navigate = useNavigate();

    const { logout, user } = useAuth();
    const { darkMode, setDarkMode } = useTheme();

    const [open, setOpen] = useState(false);

    function handleLogout() {
        toast.success("Logged out successfully");
        logout();
        navigate("/login");
    }

    const navStyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        }`;

    return (
        <>
            <motion.aside
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-72 min-h-screen bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl border-r dark:border-slate-800 shadow-xl flex flex-col p-6"
            >
                {/* Logo */}
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white rounded-2xl p-3">
                            <Wallet size={26} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-extrabold text-blue-600">
                                ExpenseIQ
                            </h1>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Smart Finance Dashboard
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    <NavLink to="/" className={navStyle}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/add" className={navStyle}>
                        <PlusCircle size={20} />
                        Add Transaction
                    </NavLink>

                    <NavLink to="/transactions" className={navStyle}>
                        <Receipt size={20} />
                        Transactions
                    </NavLink>

                    <NavLink to="/analytics" className={navStyle}>
                        <PieChart size={20} />
                        Analytics
                    </NavLink>

                    <NavLink to="/profile" className={navStyle}>
                        <User size={20} />
                        Profile
                    </NavLink>
                </nav>

                {/* Bottom */}
                <div className="mt-auto">
                    <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4 mb-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Logged in as
                        </p>

                        <h2 className="font-bold text-lg mt-2 dark:text-white">
                            {user?.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <Button
                        className="w-full mb-3 rounded-xl"
                        variant="secondary"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? (
                            <>
                                <Sun className="mr-2 h-5 w-5" />
                                Light Mode
                            </>
                        ) : (
                            <>
                                <Moon className="mr-2 h-5 w-5" />
                                Dark Mode
                            </>
                        )}
                    </Button>

                    <Button
                        variant="destructive"
                        className="w-full rounded-xl"
                        onClick={() => setOpen(true)}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </motion.aside>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Confirm Logout
                        </DialogTitle>

                        <DialogDescription>
                            Are you sure you want to logout from ExpenseIQ?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Sidebar;