import './App.css';
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import CartProvider from './Providers/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './Pages/CheckOutPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import AuthProvider from './Providers/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <CartProvider>
          <Switch>
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
