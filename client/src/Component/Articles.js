import { useState, useEffect } from 'react';

const Articles = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setTitle(props.title);
        setAuthor(props.author);
        setDate(props.date);
        setContent(props.content);
    }, []);

    return (
        <div>
            <h4>Title: {title}</h4>
            <h5>Author: {author}</h5>
            <h6>Date: {date}</h6>
            <p>{content}</p>
            {/* <h4>Covid-19 horrifying</h4>
            <p>We have been threatened by the virus for around 2 years worldwide. We've bear huge economic loss globally.</p> */}
        </div>
    )
};

export default Articles;