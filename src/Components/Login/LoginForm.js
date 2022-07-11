import Input from '../../Common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './LoginForm.css';
import '../../App.css';
import { Link, withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../Services/loginService';
import { useAuth, useAuthActions } from '../../Providers/AuthProvider';
import { useQuery } from '../../Hooks/useQuery';
const initialValues = {
    email: "",
    password: "",
};

const validationSchema = yup.object({
    email: yup.string().email("invalid format").required("required"),
    password: yup.string().required("required"),
})
const SignupForm = ({ history }) => {
    const query = useQuery();
    const redirect = query.get("redirect") || "/";
    const setAuth = useAuthActions();
    const auth = useAuth();
    useEffect(() => {
        if (auth) history.push(redirect);
    }, [redirect, auth])
    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        try {
            const { data } = await loginUser(values);
            setAuth(data);
            // localStorage.setItem("authState", JSON.stringify(data));
            console.log("data is :", data);
            setError(null);
            history.push(redirect);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    return (
        <div className='formContainer'>
            <form onSubmit={formik.handleSubmit}>
                <Input className={"inputField"} label="email" name="email" formik={formik} type="email" />
                <Input className={"inputField"} label="password" name="password" formik={formik} type="password" />
                <button type='submit'
                    style={{ width: "100%" }}
                    onClick={formik.onSubmit}
                    disabled={!formik.isValid}
                    className="btn primary">
                    Login
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Link to={`/signup?redirect=${redirect}`}>
                    <p style={{ marginTop: "15px" }}>Not signup yet?</p>
                </Link>
            </form>
        </div>
    );
}

export default withRouter(SignupForm);