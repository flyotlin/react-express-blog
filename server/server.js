const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// mongoose
const mongoose = require('mongoose');
const mongoDBUrl = 'mongodb://localhost:27017/react-express-blog';
mongoose.connect(mongoDBUrl);

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// express session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: "react-express-blog",
    store: new MongoStore({ url: 'mongodb://localhost:27017/react-express-blog' }),
    cookie: { maxAge: 60 * 2000 },
}));

// api router
const apiRouter = require('./routes/apiRouter');
app.use('/', apiRouter);


app.listen(5000);

module.exports = app;