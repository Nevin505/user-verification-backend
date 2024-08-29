require('dotenv').config();

const express=require('express');

const mongodb=require('mongoose');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const cors=require('cors')

const app=express();

// app.use(cookieParser())


app.use(express.json())

app.use(cors({  
    origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Allow cookies to be sent along with requests
}))

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge:  5* 60 * 1000 
    }
}));


const registration=require('./routes/registration')

app.use('/registration',registration)


mongodb.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(3001,()=>{
        console.log("Server Connected");
    });
}).catch(error=>{
    console.log(error);
})
