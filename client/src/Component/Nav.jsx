import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Nav = ({ isLoggedin, setSession }) => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      const res = await axios.get('/session');
      setSession(res.data);
      history.push('/home');
    } catch (err) {
      history.push('/home');
    }
  };

  const handleAddArticle = () => {
    history.push({
      pathname: '/home/addarticle',
      state: {
        isEdit: false,
      },
    });
  };

  // href="/home/addarticle"

  if (isLoggedin === true) {
    return (
      <>
        <Button onClick={handleAddArticle} color="inherit">Add Article</Button>
        <Button onClick={handleLogout} color="inherit">Log out</Button>
        <Button href="/home/about" color="inherit">About</Button>
      </>
    );
  }

  return (
    <>
      <Button href="/home/login" color="inherit">Login</Button>
      <Button href="/home/register" color="inherit">Register</Button>
      <Button href="/home/about" color="inherit">About</Button>
    </>
  );
};

Nav.propTypes = {
  setSession: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
};

export default Nav;
