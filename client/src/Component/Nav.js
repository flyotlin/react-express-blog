import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
    const handleLogout = async() => {
        try {
            await axios.post('logout');
            const res = await axios.get('/session');
            props.setSession(res.data);
        } catch (err) {

        }
    };

    if (props.isLoggedin === true) {
        return (
            <ul>
                <li>
                    <Link to="/home">Index</Link>
                </li>
                <li>
                    <Link to="/home/addarticle">Add Article</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Log out</button>
                </li>
            </ul>
        );
    }
    
    return (
        <ul>
            <li>
                <Link to="/home">Index</Link>
            </li>
            <li>
                <Link to="/home/register">Register</Link>
            </li>
            <li>
                <Link to="/home/login">Log in</Link>
            </li> 
        </ul>
    );
}

export default Nav;