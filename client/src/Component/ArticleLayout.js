import { useState, useEffect } from 'react';
import Articles from './Articles';
import axios from 'axios';
import './style_wait.css';

const ArticleLayout = (props) => {
    const [articles, setArticles] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const getArticles = async() => {
        setIsFetched(false);
        try {
            let res = await axios.get('/getAllArticle');
            // console.log(res.data);
            setTimeout(() => {
                setArticles(res.data);
                setIsFetched(true);
            }, 2000);
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
        <div>
            {
                articles.map((posts) => (
                    <Articles 
                        key={posts.title}
                        title={posts.title} 
                        author={posts.author} 
                        content={posts.content} 
                        date={posts.date}
                    />
                ))
            }
        </div>
    );
};

export default ArticleLayout;