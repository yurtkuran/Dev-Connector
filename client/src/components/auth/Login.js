import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    // init local state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // destructure
    const { email, password } = formData;

    // on change handler
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // on submit handlers
    const onSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            // setAlert('Please enter all fields', 'danger');
            console.log('fields are required');
        } else {
            console.log('success');
            console.log(formData);
        }
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign into your account
            </p>

            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} />
                </div>

                <div className='form-group'>
                    <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} minLength='6' />
                </div>

                <input type='submit' value='Register' className='btn btn-primary' />
            </form>

            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

export default Login;
