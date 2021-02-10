import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, makeStyles, Typography, Button, Avatar } from '@material-ui/core';

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
    const classes = useStyles();
    const history = useHistory();
    const [article, setArticle] = useState({
        title: '',
        content: ''
    });

    const handleFormSubmit = async(event) => {
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

    const handleInputChange = (event) => {
        let article_tmp = article;
        article_tmp[event.target.name] = event.target.value;
        // console.log(event.target.name + "  " + event.target.value);
        setArticle(article_tmp);
        // console.log(article);
    };

    if (props.session.isLoggedin === false)
        return <Redirect to="/home" />;

    return (
        <div className={classes.root}>
            <Typography
                className={classes.header}
                variant="h4"
            >
                Add Article
            </Typography>
            <form onSubmit={handleFormSubmit} className={classes.form}>
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