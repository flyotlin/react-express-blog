import { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
    const [text, setText] = useState("");
    const fetchSetText = async() => {
        const res = await axios.get('/api');
        setText(res.data);
    }
    useEffect(() => {
        fetchSetText();
    }, []);
    return (
        <div style={{marginTop: 70}}>
            <p>A blog system uses react as front end, and uses express+mongodb as back end api. <br/>I use react-router to achieve the multipage/router functionality.</p>
            <h3>from back-end API: {text}</h3> 
        </div>
    );
};

export default About;