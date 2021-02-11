import React, { useState, useEffect } from 'react';
import './style_wait.sass';
import {
  IconButton, Typography, makeStyles, Card, CardContent, Collapse, CardActions,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const cardStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 80px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Articles = (props) => {
  const history = useHistory();
  const cards = cardStyles();
  const { session } = props;
  const { isLoggedin } = session;
  const { username } = session;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTitle(props.title);
    setAuthor(props.author);
    setDate(props.date);
    setContent(props.content);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      await axios.post('/deletePosts', {
        id: props._id,
      });
      props.getArticles();

      // history.push('/home');
    } catch (err) {
      history.push('/home');
    }
  };

  const handleEdit = () => {
    history.push({
      pathname: '/home/addarticle',
      state: {
        id: props._id,
        title,
        author,
        date,
        content,
        isEdit: true,
      },
    });
  };

  return (
    <Card className={cards.root}>
      <CardContent>
        <Typography variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Date:
          {date}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Author:
          {author}
        </Typography>
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions>
        {
                    (isLoggedin === true) ? (
                      <>
                        <IconButton>
                          <FavoriteIcon />
                        </IconButton>
                      </>
                    ) : null
                }
        {
                    (isLoggedin === true && username === author) ? (
                      <>
                        <IconButton>
                          <EditIcon
                            onClick={handleEdit}
                          />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            onClick={handleDelete}
                          />
                        </IconButton>
                      </>

                    ) : null
                }
        <IconButton
          className={clsx(cards.expand, {
            [cards.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>Comments:</Typography>
          your post is really fun
        </CardContent>
      </Collapse>
    </Card>
  );
};

Articles.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  getArticles: PropTypes.func.isRequired,
  session: {
    isLoggedin: false,
    username: '',
    email: '',
    time: 0,
  }.isRequired,
};

export default Articles;
