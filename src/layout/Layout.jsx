import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout() {
    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;