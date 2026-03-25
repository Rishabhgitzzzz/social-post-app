import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const nav = useNavigate();
    const { setIsAuth } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const res = await API.post("/user/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setIsAuth(true);
            nav("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Welcome Back 👋</h2>
                <p>Login to continue</p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button onClick={handleLogin}>Login</button>

                <span>
                    Don’t have an account?{" "}
                    <b onClick={() => nav("/signup")}>Signup</b>
                </span>

            </div>
        </div>
    );
}