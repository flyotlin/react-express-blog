import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

const AddArticle = (props) => {
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState(props.session.username);
    // const [content, setContent] = useState('');
    const history = useHistory();
    const [article, setArticle] = useState({
        title: '',
        author: props.session.username,
        content: ''
    });

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        try {
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
        <div>
            <h1>Add Article</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Content:</label>
                    <input type="text" name="content" onChange={handleInputChange}></input>
                </div>
                <div>
                    <input type="submit"></input>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;