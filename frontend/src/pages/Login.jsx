import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            login(response.data.user, response.data.token);

            toast.success(`Welcome, ${response.data.user.name}!`);

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-96"
            >
                <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
                    🔐 Login
                </h1>

                <input
                    className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3 mb-6 dark:bg-slate-700 dark:text-white"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="text-center mt-5 dark:text-gray-300">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;