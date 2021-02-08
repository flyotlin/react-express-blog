import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Articles from './Articles';
import ArticleLayout from './ArticleLayout';
import AddArticle from './AddArticle';
import PageNotFound from './PageNotFound';
import User from './User';
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'; 
// import WaitHolder from './WaitHolder';

const Index = () => {
    const [text, setText] = useState("");
    const [session, setSession] = useState({});
    const { path, url } = useRouteMatch();

    const fetchSetText = async() => {
        const res = await axios.get('/api');
        setText(res.data);
    }

    const fetchIsLoggedIn = async() => {
        const res = await axios.get('/session');
        setSession(res.data);
    }

    useEffect(() => {
        fetchSetText();
        fetchIsLoggedIn();
    }, []);

    let Greeting;
    if (session.isLoggedin)
        Greeting = <p>Welcome, {session.username}!</p>;
    else
        Greeting = <p>Hello, guest!</p>


    let article_set = [
        {
            title: "Covid-19 horrifying",
            author: "flyotlin",
            content: "We have been threatened by the virus for around 2 years worldwide. We've bear huge economic loss globally.",
        }, 
        {
            title: "花に亡霊 / ヨルシカ 【りかこ】 弾き語り",
            author: "りかこ",
            content: "本家: https://youtu.be/9lVPAWLWtWc​ すごくすごく素敵な曲です、、、Twitterは @rkk_tomakichi ( https://twitter.com/rkk_tomakichi​ ) で、 Instagramは ri_reeee ( https://www.instagram.com/ri_reeee/​ )だよ",
        }
    ];

    return (
        <div>
            <h1>React-express Blog</h1>
            <p>A blog system uses react as front end, and uses express+mongodb as back end api. <br/>I use react-router to achieve the multipage/router functionality.</p>
            <h3>from back-end API: {text}</h3>
            <Nav 
                isLoggedin={session.isLoggedin} 
                setSession={setSession}
            />
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
                <Route path="">
                    {Greeting}
                    <ArticleLayout />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;