import Input from '../../Common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './SignupForm.css';
import '../../App.css';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { signupUser } from '../../Services/signupService';
import { useEffect, useState } from 'react';
import { useAuth, useAuthActions } from '../../Providers/AuthProvider';
import { useQuery } from '../../Hooks/useQuery';
const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
};

const validationSchema = yup.object({
    name: yup.string().required("required").min(6, 'must be at least 6 chars'),
    email: yup.string().email("invalid format").required("required"),
    phoneNumber: yup.string().required('required').matches(/^[0-9]{11}$/, 'invalid phoneNumber'),
    passwordConfirmation: yup.string().required('required').oneOf([yup.ref('password'), null], "must be match with password"),
    password: yup.string().required("required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
})

const SignupForm = ({ history }) => {
    const query = useQuery();
    const redirect = query.get("redirect") || "/";
    const setAuth = useAuthActions();
    const [error, setError] = useState(null);
    const auth = useAuth();
    useEffect(() => {
        if (auth) history.push(redirect)
    }, [auth, redirect])
    const onSubmit = async (values) => {
        const { name, email, phoneNumber, password, passwordConfirmation } = values;
        const userData = {
            name,
            email,
            phoneNumber,
            password,
        }
        try {
            const { data } = await signupUser(userData);
            setAuth(data);
            // localStorage.setItem("authState", JSON.stringify(data));
            console.log(data);
            history.push(redirect);
            setError(null);
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
                <Input className="inputField" label="name" name="name" formik={formik} />
                <Input className={"inputField"} label="email" name="email" formik={formik} type="email" />
                <Input className={"inputField"} label="phone Number" name="phoneNumber" formik={formik} type="tel" />
                <Input className={"inputField"} label="password" name="password" formik={formik} type="password" />
                <Input className={"inputField"} label="password confirmation" name="passwordConfirmation" formik={formik} type="password" />
                <button type='submit'
                    style={{ width: "100%" }}
                    onClick={formik.onSubmit}
                    disabled={!formik.isValid}
                    className="btn primary">
                    Signup
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Link to={`/login?redirect=${redirect}`}>
                    <p style={{ marginTop: "15px" }}>Already login?</p>
                </Link>
            </form>
        </div>
    );
}

export default withRouter(SignupForm);