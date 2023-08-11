require('dotenv').config()
const express = require("express")
const ConnectToMongodb = require("./database");
const bodyParser= require("body-parser")
const User = require('./modals/userSchema.js');
const passport = require("passport")
const session = require("express-session")
const cookieParser =require("cookie-parser")
const LocalStrategy = require('passport-local');
const cors = require('cors');
const Port = process.env.PORT
const app = express();
// for passing data 
app.use(express.json())
ConnectToMongodb();
app.use(cors({
    origin: ['http://localhost:5173' , 'https://listen-music.vercel.app'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials

  }));
app.use(bodyParser.urlencoded({extended:true}))

// session and passport initialize 
app.use(session({
    
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { SameSite: 'none',    secure:true
}
}))

// app.use(cookieParser('keyboard cat'))
app.use(passport.initialize());
app.use(passport.session());



// session start and end 


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// all routes 
app.use('/api/auth', require('./routes/api_auth.js'))


// app routes 
app.get("/", (req, res) => {
    res.send("Welcome to Music Web Server Api ")
})


app.listen(Port, () => {
    console.log("server starts")
})
