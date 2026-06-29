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

function Sidebar() {
    const navigate = useNavigate();

    const { logout, user } = useAuth();
    const { darkMode, setDarkMode } = useTheme();

    const [open, setOpen] = useState(false);

    const linkStyle =
        "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-700 transition-all";

    function handleLogout() {
        toast.success("Logged out successfully");
        logout();
        navigate("/login");
    }

    return (
        <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 shadow-lg p-6 flex flex-col">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-blue-600">
                    ExpenseIQ
                </h1>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Smart Finance Dashboard
                </p>
            </div>

            <nav className="flex flex-col gap-3">

                <NavLink className={linkStyle} to="/">
                    🏠 Dashboard
                </NavLink>

                <NavLink className={linkStyle} to="/add">
                    ➕ Add Transaction
                </NavLink>

                <NavLink className={linkStyle} to="/transactions">
                    📋 Transactions
                </NavLink>

                <NavLink className={linkStyle} to="/analytics">
                    📊 Analytics
                </NavLink>

                <NavLink className={linkStyle} to="/profile">
                    👤 Profile
                </NavLink>

            </nav>

            <div className="mt-auto border-t dark:border-slate-700 pt-5">

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Logged in as
                </p>

                <h3 className="font-semibold dark:text-white mb-5">
                    {user?.name}
                </h3>

                <Button
                    className="w-full mb-3"
                    variant="secondary"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </Button>

                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setOpen(true)}
                >
                    🚪 Logout
                </Button>

            </div>

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

        </aside>
    );
}

export default Sidebar;