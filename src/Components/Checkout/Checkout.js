import { Link } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import './Checkout.css';
const Checkout = () => {
    const auth = useAuth();
    const { cart, total } = useCart();
    if (!cart.length) {
        return <main className="container">
            <Link to="/">go to shopping</Link>
        </main>
    }
    return (
        <main className="container">
            <section className="cartCenter">
                {auth ? (
                    <>
                        <section className="cartItemList">
                            <h3>checkout detail</h3>
                            <p>name: {auth.name}</p>
                            <p>email: {auth.email}</p>
                            <p>phoneNumber: {auth.phoneNumber}</p>
                        </section>
                    </>) : (
                    <p>please login !</p>
                )}
                <section className="cartSummary">
                    {cart && cart.map((c) => {
                        return <div>
                            {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                        </div>
                    })}
                    <hr />
                    <p>total price: {total}</p>
                </section>
            </section>
        </main>
    );
}

export default Checkout;