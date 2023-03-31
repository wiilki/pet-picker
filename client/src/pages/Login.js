import React, { useState } from 'react';


export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(email);
    }


    return (
        <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
            <label htmlfor='email'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type='email' placeholder='youremail@example.com' />
            <label htmlfor='password'>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)}type='password' placeholder='******' id='password' name='password' />
            <button>Login</button>
        </form>
    <button onClick={() => props.onFormSwitch('signup')}>Dont have an account? Sign up here.</button>
    </div>
    
    )
}
