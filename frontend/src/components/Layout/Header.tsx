import { Link, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../../config/constants';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    const user = userStr ? JSON.parse(userStr) : null;
    const isAdmin = user?.role === 'ADMIN';

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    🍬 Sweet Shop
                </Link>
                <nav className="nav">
                    {token ? (
                        <>
                            {isAdmin && (
                                <button onClick={() => navigate('/admin')} className="btn btn-admin">
                                    Admin Dashboard
                                </button>
                            )}
                            <span className="user-info">
                                Welcome, {user?.firstName || 'User'}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
