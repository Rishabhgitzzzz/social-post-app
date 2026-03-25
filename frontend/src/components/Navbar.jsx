import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { setIsAuth } = useContext(AuthContext);
    const nav = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        nav("/login");
    };

    return (
        <div className="navbar">
            <div className="nav-inner">

                <h3>Social</h3>

                <div className="nav-right">
                    <span className="coin">105 ⭐</span>
                    <span className="wallet">$0.00</span>
                    <img
                        src="https://i.pravatar.cc/40"
                        className="avatar"
                        alt="user"
                    />
                    <button onClick={logout}>Logout</button>
                </div>

            </div>
        </div>
    );
}