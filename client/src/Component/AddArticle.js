import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, makeStyles, Typography, Button, Avatar } from '@material-ui/core';

/**
 * Add article, and Edit article
 */

const useStyles = makeStyles((themes) => ({
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
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const [article, setArticle] = useState({
        title: '',
        content: ''
    });

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let article_tmp = article;
            article_tmp['author'] = props.session.username;
            setArticle(article_tmp);
            await axios.post('/addArticle', article);
            history.push('/home');
        } catch (err) {

        }
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let article_tmp = article;
            article_tmp['author'] = location.state.author;
            article_tmp['_id'] = location.state._id;
            article_tmp['date'] = location.state.date;
            setArticle(article_tmp);
            await axios.post('/editPosts', article);
            history.push('/home');
        } catch (err) {

        }
    };

    const handleInputChange = (event) => {
        let article_tmp = article;
        article_tmp[event.target.name] = event.target.value;
        setArticle(article_tmp);
    };

    if (props.session.isLoggedin === false)
        return <Redirect to="/home" />;

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

export default AddArticle;