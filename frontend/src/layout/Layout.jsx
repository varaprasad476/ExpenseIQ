import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout() {
    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
            <Sidebar />

            <main className="flex-1 p-4 md:p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;