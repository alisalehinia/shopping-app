import Layout from '../Layout/Layout'
import { useCart, useCartActions } from '../Providers/CartProvider';
import '../App.css';
import './CartPage.css'
import { Link } from 'react-router-dom';
const CartPage = () => {
    const { cart, total } = useCart();
    const dispatch = useCartActions();
    if (!cart.length) return (
        <Layout>
            <main>
                <h2>cart is empty</h2>
            </main>
        </Layout>
    )
    const incHandler = (cartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
    const decHandler = (cartItem) => {
        dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
    }
    return (
        <Layout>
            <main className='container'>
                <section className='CartCenter'>
                    <section className='cartItemList'>
                        {cart.map(item => {
                            return (
                                <div className='cartItem'>
                                    <div className='itemImg'>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div>
                                        {item.name}
                                    </div>
                                    <div>
                                        {item.offPrice * item.quantity}
                                    </div>
                                    <div className='btnGroup'>
                                        <button onClick={() => decHandler(item)}>remove</button>
                                        <button>{item.quantity}</button>
                                        <button onClick={() => incHandler(item)}>add</button>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <CartSummary total={total} cart={cart} />
                </section>
            </main>
        </Layout>
    );
}

export default CartPage;
const CartSummary = ({ total, cart }) => {

    const originalTotalPrice = cart.length ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) : 0;

    return (
        <section className='CartSummary'>
            <h2 style={{ marginBottom: "30px" }}>cart summary</h2>
            <div className='summaryItem'>
                <p>original total price</p>
                <p>{originalTotalPrice}$</p>
            </div>
            <div className='summaryItem'>
                <p>cart discount</p>
                <p>{originalTotalPrice - total}$</p>
            </div>

            <div className='summaryItem net'>
                <p>net price</p>
                <p>{total}$</p>
            </div>
            <Link to="/signup?redirect=checkout">
                <button className='btn primary' style={{ marginTop: "20px 0", width: "100%" }}>go to checkout</button>
            </Link>
        </section>
    )
}