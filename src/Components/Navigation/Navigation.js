import { NavLink } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import './Navigation.css'
const Navigation = () => {
    const { cart } = useCart();
    const userData = useAuth();
    return (
        <header className="mainNavigation">
            <nav>
                <ul>
                    <div>
                        ali shop
                    </div>
                    <li>
                        <NavLink to="/" activeClassName="activeLink" exact >home</NavLink>
                    </li>
                </ul>
                <ul>
                    <li className="cartLink">
                        <NavLink to="/cart" activeClassName="activeLink">
                            cart
                        </NavLink>
                        <span>{cart.length}</span>
                    </li>
                    <li>
                        <NavLink to={userData ? "/profile" : "/login"} activeClassName="activeLink" exact >
                            {userData ? "profile" : "login/signup"}
                        </NavLink>
                    </li>
                </ul>

            </nav>

        </header>
    );
}

export default Navigation;