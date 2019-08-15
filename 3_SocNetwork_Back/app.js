const express = require('express');
const app = express();
const path = require('path');
const opn = require('opn');
const cors = require('cors');
const config = require('./controllers/config');
/*const addTofriend = require('./controllers/users/addToFriend');
const addUserToMyFriend = require('./controllers/users/addUserToMyFriend');*/
const error404 = require('./controllers/error404');
const userRoute = require('./routes/userRoutes');
const dataBase = require('./db/index').getInstance();
dataBase.setModels();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let whitelist = ['http://localhost:4200', 'http://localhost:3000'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", '*');
  next();
});

app.set('views', 'views_pug');
app.set('view engine', 'pug');

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/user',cors(corsOptions), userRoute);
/*
app.get('/people',cors(corsOptions), addTofriend);
app.post('/friend/:id', cors(corsOptions), addUserToMyFriend);
app.get('/profile', cors(corsOptions), loginUser);
app.get('/logout', cors(corsOptions), function (req, res) {
    req.logout();
    res.redirect('/');
});*/
app.use('*',cors(corsOptions), error404);

app.listen(config.port, err => {
    console.log('Server listen on port ' + config.port + '...');

    if (config.itsStartupServer){
        opn('http://localhost:' + config.port);
    }
});
