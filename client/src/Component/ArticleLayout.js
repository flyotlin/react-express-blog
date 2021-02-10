import { useState, useEffect } from 'react';
import Articles from './Articles';
import axios from 'axios';
import './style_wait.sass';

const ArticleLayout = (props) => {
    const [articles, setArticles] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const getArticles = async() => {
        setIsFetched(false);
        try {
            let res = await axios.get('/getAllArticle');
            setTimeout(() => {
                setArticles(res.data.reverse());
                setIsFetched(true);
            }, 1000);
        } catch (err) {
            setIsFetched(false);
        }
    };

    useEffect(() => {
        getArticles();
    }, []);

    if (isFetched === false)
        return ( 
            <div id="spinner" className="container">
                <div className="loading"></div>
            </div>
        );
    return (
        <div style={{marginTop: 69}}>
            {
                articles.map((posts) => (
                    <Articles 
                        key={posts._id}
                        _id={posts._id}
                        title={posts.title} 
                        author={posts.author} 
                        content={posts.content} 
                        date={posts.date}
                        session={props.session}
                        getArticles={getArticles}
                    />
                ))
            }
        </div>
    );
};

export default ArticleLayout;