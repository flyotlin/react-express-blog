import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Articles from './Articles';
import ArticleLayout from './ArticleLayout';
import AddArticle from './AddArticle';
import PageNotFound from './PageNotFound';
import User from './User';
import About from './About';
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'; 
import { Toolbar, Button, AppBar, IconButton, Typography, makeStyles, Card, CardContent, CardHeader, Box, Modal } from '@material-ui/core';
// import WaitHolder from './WaitHolder';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Index = () => {
    const classes = useStyles();
    const [text, setText] = useState("");
    const [session, setSession] = useState({});
    const { path, url } = useRouteMatch();
    const [open, setOpen] = useState(false);

    const fetchSetText = async() => {
        const res = await axios.get('/api');
        setText(res.data);
    }

    const fetchIsLoggedIn = async() => {
        const res = await axios.get('/session');
        setSession(res.data);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchSetText();
        fetchIsLoggedIn();
    }, []);

    let Greeting;
    if (session.isLoggedin)
        Greeting = <p>Welcome, {session.username}!</p>;
    else
        Greeting = <p>Please log in!</p>

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        <Link to="/home" style={{textDecoration: 'none', color: 'white', fontWeight: 'bolder'}}>React-express blog</Link>
                    </Typography>
                    {Greeting}
                    <Nav 
                        isLoggedin={session.isLoggedin} 
                        setSession={setSession}
                    />
                </Toolbar>
            </AppBar>
            {/* <Button onClick={handleOpen}>open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    Welcome open this modal!
                </div>
            </Modal> */}

            <Switch>
                <Route path="/home/register">
                    <User
                        isLoggedin={session.isLoggedin}
                        title="Register"
                        postUrl="/register"
                        setSession={setSession}
                    />
                </Route>
                <Route path="/home/login">
                    <User
                        isLoggedin={session.isLoggedin}
                        title="Log in"
                        postUrl="/login"
                        setSession={setSession}
                    />
                </Route>
                <Route path="/home/addarticle">
                    <AddArticle session={session} />
                </Route>
                <Route path="/home/about">
                    <About />
                </Route>
                <Route path="">
                    <ArticleLayout session={session} />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;