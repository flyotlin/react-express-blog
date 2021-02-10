import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Nav = (props) => {
    const history = useHistory();
    const handleLogout = async() => {
        try {
            await axios.post('/logout');
            const res = await axios.get('/session');
            props.setSession(res.data);
            history.push("/home");
        } catch (err) {

        }
    };

    if (props.isLoggedin === true) {
        return (
            <React.Fragment>
                <Button href="/home/addarticle" color="inherit">Add Article</Button>
                <Button onClick={handleLogout} color="inherit">Log out</Button>
                <Button href="/home/about" color="inherit">About</Button>
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            <Button href="/home/login" color="inherit">Login</Button>
            <Button href="/home/register" color="inherit">Register</Button>
            <Button href="/home/about" color="inherit">About</Button>
        </React.Fragment>
    );
}

export default Nav;