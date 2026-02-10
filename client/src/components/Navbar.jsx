import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './navbar.css'; // Keep existing styles if desired, but we'll use tailwind classes too

const Navbar = () => {
    const { user, logout, token } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/">Expense Tracker</Link>
            </h1>
            <div className="flex gap-4">
                {token ? (
                    <>
                        <span className="self-center">Welcome</span>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
                        <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
