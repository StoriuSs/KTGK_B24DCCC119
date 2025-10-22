import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-logo">
					<span className="logo-text">Blog Pro</span>
				</Link>
				<div className="navbar-menu">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "nav-link active" : "nav-link"
						}>
						Trang chủ
					</NavLink>
					<NavLink
						to="/create"
						className={({ isActive }) =>
							isActive ? "nav-link active" : "nav-link"
						}>
						Viết bài
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
