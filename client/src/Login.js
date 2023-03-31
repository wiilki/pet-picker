import React, { useState } from 'react';

<<<<<<< HEAD:client/src/components/Login.js

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
=======
import { useMutation } from '@apollo/client'; 
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';
>>>>>>> 9948f7459e55c3fee4991b89f28663af720ed7ff:client/src/components/Login/Login.js

    const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(email);
    }


    return (
        <>
    <form onSubmit={handleSubmit}>
        <label for='email'>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}type='email' placeholder='youremail@example.com' />
        <label for='password'>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)}type='password' placeholder='******' id='password' name='password' />
        <button>Login</button>
    </form>
    <button>Dont have an account? Sign up here.</button>
    </>
    )
}
