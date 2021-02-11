import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Articles from './Articles';
import './style_wait.sass';

const ArticleLayout = (props) => {
  const [articles, setArticles] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getArticles = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get('/getAllArticle');
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

  if (isFetched === false) {
    return (
      <div id="spinner" className="container">
        <div className="loading" />
      </div>
    );
  }
  return (
    <div style={{ marginTop: 69 }}>
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

ArticleLayout.propTypes = {
  session: PropTypes.shape({
    isLoggedin: PropTypes.bool,
    username: PropTypes.string,
    email: PropTypes.string,
    time: PropTypes.number,
  }),
};

ArticleLayout.defaultProps = {
  session: {
    isLoggedin: false,
    username: '',
    email: '',
    time: 0,
  },
};

export default ArticleLayout;
