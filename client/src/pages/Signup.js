import React, { useState } from 'react';

export const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
        }

    return (
    <div className='auth-form-container'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Full name</label>
            <input value={name} name='name' id='name' placeholder='Full name' />
            <label htmlfor='email'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type='email' placeholder='youremail@example.com' />
            <label htmlfor='password'>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)}type='password' placeholder='******' id='password' name='password' />
            <button type='submit'>Login</button>
        </form>
    <button onClick={() => props.onFormSwitch('login')}>If you already have an account, Log in Here</button>
    </div>
    )
}
