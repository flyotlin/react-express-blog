import React, { useState, useEffect } from 'react';
import './style_wait.sass';
import { Toolbar, Button, AppBar, IconButton, Typography, makeStyles, Card, CardContent, CardHeader, Box, Collapse, CardActions, Icon } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const cardStyles = makeStyles((theme) => ({
    root: {
        margin: '10px 80px'
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
        console.log("Deltete! " + props._id);
        try {
            await axios.post('/deletePosts', {
                id: props._id,
            });
            props.getArticles();

            // history.push('/home');
        } catch (err) {

        }
    };

    const handleEdit = () => {
        history.push({
            pathname: '/home/addarticle',
            state: {
                _id: props._id,
                title: title,
                author: author,
                date: date,
                content: content,
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
                <Typography variant="subtitle1" color="textSecondary">Date: {date}</Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph={true}>Author: {author}</Typography>
                <Typography>{content}</Typography>
            </CardContent>
            <CardActions>
                {
                    (props.session.isLoggedin === true) ? (
                        <React.Fragment>
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                        </React.Fragment>
                    ) : null
                }
                {
                    (props.session.isLoggedin === true && props.session.username === author) ? (
                    <React.Fragment>
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
                    </React.Fragment>

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
                    <Typography variant="h6" style={{fontWeight: 'bolder'}}>Comments:</Typography>
                    your post is really fun
                </CardContent>
            </Collapse>
        </Card>
    )
};

export default Articles;