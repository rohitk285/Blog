const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/BookLog')
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log('Error', err);
    });

const registerSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const reviewSchema = new mongoose.Schema({
    username: {type: String, required: true},
    bookName: {type: String, required: true},
    rating: {type: Number, required: true},
    review: {type: String, required: true}
})

const Register = mongoose.model('Register', registerSchema);
const Review = mongoose.model('Review', reviewSchema);

app.use(cors({
    origin: 'http://localhost:5173', // will accept requests only from react app URL
    credentials: true  //allows cookies and other credentials to be sent with the requests
}));

/* bodyParser is middleware that parses incoming requests in JSON format
makes the request bodies available on req.body */
app.use(bodyParser.json());

let sessionOptions = {
    secret: 'secretKey', // a string used to sign the session ID cookie.
    resave: false,  //since we don't want new session for every browser refresh
    saveUninitialized: true, //it will save if we modify the session
    cookie: {secure: true} // contains the sessionID cookie
};

//allows handling and maintaining user sessions across different sessions
app.use(session(sessionOptions));

app.get('/', (req, res) => {
    res.send('DTunes - backend');
});

app.post('/register', async (req,res) => {
    const {username, password} = req.body;

    try{
        const existingUser = await Register.findOne({username: username});
        if(existingUser) 
            return res.status(409).send('Username already taken');

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hi');
        await Register.create({username: username, password: hashedPassword});
        res.status(201).send('User registered');
    }
    catch(err){
        res.status(500).send('Unable to register');
    }
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try{
        const userDetails = await Register.findOne({username});
        if(userDetails && await bcrypt.compare(password, userDetails.password)){
            res.status(200).send('Logged in');
        }
        else{
            res.status(404).send('Incorrect credentials');
        }
    }
    catch(err){
        res.status(500).send('Login Error');
    }
});

app.post('/logout', (req, res) => {
    console.log('hi');
    req.session.destroy(err => {
        if (err) 
          return res.send('error');
        res.send('success');
      });
});

app.post('/postReview', async (req, res) => {
    const {authUser, bookName, rating, review} = req.body;
    const data = {username: authUser, bookName: bookName, rating: rating, review: review};

    try{
        await Review.create(data)
        res.status(201).send("Uploaded review");
    }
    catch(err){
        res.status(500).send("Cannot upload review");
    }
});

app.get('/search', async (req, res) => {
    const {authUser, searchInput} = req.query;

    try{
        let response = await Review.find({bookName: {$regex: searchInput, $options: 'i'}});
        res.status(201).json(response);
    }
    catch(err){
        res.status(500).send("Unable to fetch results");
    }
});

app.get('/selfReview', async (req, res) => {
    const {authUser} = req.query;

    try{
        let response = await Review.find({username: authUser});
        res.status(201).json(response);
    }
    catch(err){
        res.status(500).send("Unable to fetch data");
    }
});

app.listen(port, () => {
    console.log('Server Listening');
});