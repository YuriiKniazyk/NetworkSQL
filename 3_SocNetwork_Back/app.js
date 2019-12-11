const express = require('express');
const app = express();
const path = require('path');
const opn = require('opn');
const cors = require('cors');
const dataBase = require('./db/index').getInstance();
dataBase.setModels();
const config = require('./constant/config');
const error404 = require('./controllers/error404');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const friendRouter = require('./routes/friendRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let whitelist = ['http://localhost:3000', 'http://localhost:3300'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.use('/user', cors(corsOptions), userRouter);
app.use('/login', cors(corsOptions), authRouter);
app.use('/friend', cors(corsOptions), friendRouter);
app.use('*', cors(corsOptions), error404);

app.listen(config.port, err => {
  console.log('Server listen on port ' + config.port + '...');

  // if (config.itsStartupServer) {
  //   opn('http://localhost:' + config.port);
  // }
});
