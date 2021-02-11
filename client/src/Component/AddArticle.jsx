import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TextField, makeStyles, Typography, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 * Add article, and Edit article
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '80%',
    marginTop: '70px',
  },
  header: {
    margin: '0 auto',
    fontWeight: 'bolder',
    marginTop: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    margin: '0 auto',
  },
  formComp: {
    margin: '10px',
  },
}));

const AddArticle = (props) => {
  const { session } = props;
  const { isLoggedin } = session;
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const articleTmp = article;
      articleTmp.author = props.session.username;
      setArticle(articleTmp);
      await axios.post('/addArticle', article);
      history.push('/home');
    } catch (err) {
      history.push('/home/addarticle');
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const articleTmp = article;
      articleTmp.author = location.state.author;
      articleTmp.id = location.state.id;
      articleTmp.date = location.state.date;
      setArticle(articleTmp);
      await axios.post('/editPosts', article);
      history.push('/home');
    } catch (err) {
      history.push('/home/addarticle');
      // console.err(err);
    }
  };

  const handleInputChange = (event) => {
    const articleTmp = article;
    articleTmp[event.target.name] = event.target.value;
    setArticle(articleTmp);
  };

  if (isLoggedin === false) return <Redirect to="/home" />;

  if (location.state.isEdit === true) {
    return (
      <div className={classes.root}>
        <Typography
          className={classes.header}
          variant="h4"
        >
          Edit Article
        </Typography>
        <form onSubmit={handleEditFormSubmit} className={classes.form}>
          <TextField
            defaultValue={location.state.title}
            name="title"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={handleInputChange}
            className={classes.formComp}
          />
          <TextField
            defaultValue={location.state.content}
            name="content"
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={10}
            placeholder="Type in your content here!"
            variant="outlined"
            onChange={handleInputChange}
            className={classes.formComp}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formComp}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography
        className={classes.header}
        variant="h4"
      >
        Add Article
      </Typography>
      <form onSubmit={handleAddFormSubmit} className={classes.form}>
        <TextField
          name="title"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={handleInputChange}
          className={classes.formComp}
        />
        <TextField
          name="content"
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={10}
          placeholder="Type in your content here!"
          variant="outlined"
          onChange={handleInputChange}
          className={classes.formComp}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.formComp}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

AddArticle.propTypes = {
  session: PropTypes.shape({
    isLoggedin: PropTypes.bool,
    username: PropTypes.string,
    email: PropTypes.string,
    time: PropTypes.number,
  }),
};

AddArticle.defaultProps = {
  session: {
    isLoggedin: false,
    username: '',
    email: '',
    time: 0,
  },
};

export default AddArticle;
