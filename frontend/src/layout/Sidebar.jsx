import { NavLink } from "react-router-dom";

function Sidebar() {
    const linkStyle =
        "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-100 transition-all";

    return (
        <aside className="w-64 min-h-screen bg-white shadow-lg p-6">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-blue-600">
                    ExpenseIQ
                </h1>

                <p className="text-gray-500 text-sm">
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

            <div className="mt-12 border-t pt-5">

                <button className="w-full bg-red-500 text-white rounded-xl py-3 hover:bg-red-600 transition">
                    🚪 Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;