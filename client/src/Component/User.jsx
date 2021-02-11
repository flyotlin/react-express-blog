import React, { useState } from 'react';
import {
  useHistory,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import {
  TextField, makeStyles, Typography, Button, Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';

/**
 * @param title:
 * @param postUrl:
 * @param
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '0 auto',
    marginTop: '70px',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    marginTop: '15px',
  },
  topHeader: {
    margin: '0 auto',
    marginTop: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    margin: '0 auto',
    marginTop: '15px',
  },
  formComp: {
    margin: '10px',
  },
}));

const User = ({
  postUrl, setSession, isLoggedin, title,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const userTmp = user;
    userTmp[event.target.name] = event.target.value;
    setUser(userTmp);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(postUrl, user);
      const res = await axios.get('/session');
      setSession(res.data);
      history.push('/home');
    } catch (err) {
      history.push(`/home${postUrl}`);
    }
  };

  if (isLoggedin === true) return <Redirect to="/home" />;

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" className={classes.topHeader}>
        {title}
      </Typography>
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          required
          onChange={handleInputChange}
          className={classes.formComp}
        />
        <TextField
          name="email"
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          required
          onChange={handleInputChange}
          className={classes.formComp}
        />
        <TextField
          name="password"
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          required
          onChange={handleInputChange}
          className={classes.formComp}
        />
        <Button
          type="submit"
          variant="contained"
          color="#00fe1a"
          className={classes.formComp}
        >
          {title}
        </Button>
      </form>
    </div>
  );
};

User.propTypes = {
  postUrl: PropTypes.string.isRequired,
  setSession: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default User;
