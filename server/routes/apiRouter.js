const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/User');
require('../model/Article');
const User = mongoose.model('UserModel');
const Article = mongoose.model('ArticleModel');

router.get('/', (req, res, next) => {
    res.send('hello there');
});

// Test router
router.get('/api', (req, res) => {
    res.send('你好，歡迎光臨');
});

// Get the current user status session
router.get('/session', (req, res) => {
    const session = {
        isLoggedin: (req.session.isLoggedin === undefined ? false : req.session.isLoggedin),
        username: (req.session.username === undefined ? '' : req.session.username),
        email: (req.session.email === undefined ? '' : req.session.email),
        time: (req.session.time === undefined ? 0 : req.session.time)
    };
    res.send(session);
});

router.get('/getAllArticle', async(req, res) => {
    let result = await Article.find({});
    // console.log(result);
    res.send(result);
    return;
});

// Registration router
router.post('/register', async (req, res) => {
    let user = await User.findOne({
        username: req.body.username, 
        email: req.body.email,
    }).exec();

    if (user == null) {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.isLoggedin = true;
        req.session.username = req.body.username;
        req.session.email = req.body.email;
        req.session.time = 1;
        return res.sendStatus(200);
    }
    else
        return res.sendStatus(403);
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,
    }).exec();

    if (user == null) {
        return res.sendStatus(403);
    }
    else {
        req.session.isLoggedin = true;
        req.session.username = req.body.username;
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        req.session.time = 1;   
        return res.sendStatus(200);
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
});

router.post('/addArticle', async(req, res) => {
    await Article.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });
    return res.sendStatus(200);
});

router.post('/deletePosts', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.body.id);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(403);
    }
});

router.post('/editPosts', async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
        });
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(403);
    }
});

module.exports = router;