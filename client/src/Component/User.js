import { useState } from 'react';
import { 
    Link, 
    useHistory,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import axios from 'axios';

/**
 * @param title: 
 * @param postUrl:
 * @param 
 */

const User = (props) => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        event.preventDefault();
        let user_tmp = user;
        user_tmp[event.target.name] = event.target.value;
        setUser(user_tmp);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(props.postUrl, user);
            const res = await axios.get('/session');
            props.setSession(res.data);
            history.push('/home');
        } catch (err) {
            history.push("/home" + props.postUrl);
        }
    };

    if (props.isLoggedin === true)
        return <Redirect to="/home" />

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <Link to="/home">Index</Link>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label for="">Username: </label>
                    <input type="text" name="username" onChange={handleInputChange}></input>
                </div>
                <div>
                    <label for="">E-mail: </label>
                    <input type="text" name="email" onChange={handleInputChange}></input>
                </div>
                <div>
                    <label for="">Password: </label>
                    <input type="password" name="password" onChange={handleInputChange}></input>
                </div>
                <div>
                    <input type="submit"></input>
                </div>
            </form>
        </div>
    );
};

export default User;