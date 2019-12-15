const express = require('express');
const app = express();
const {resolve: resolvePath} = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const chalk = require('chalk');
const dataBase = require('./db/index').getInstance();
dataBase.setModels();
const config = require('./constant/config');
const error404 = require('./controllers/error404');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const friendRouter = require('./routes/friendRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolvePath(__dirname, 'public')));
app.use(fileUpload());
global.appRoot = __dirname;

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

app.get('/', (req, res) => { res.sendFile(resolvePath(__dirname, 'index.html')); });
app.use('/user', cors(corsOptions), userRouter);
app.use('/login', cors(corsOptions), authRouter);
app.use('/friend', cors(corsOptions), friendRouter);
app.use('*', cors(corsOptions), error404);
app.use((err, req, res, next) => {
  res
      .status(err.status || 500)
      .json({
        success: false,
        message: err.message || 'Unknown Error',
        controller: err.controller
      });
});

app.listen(config.port, err => {
    console.log('Server listen on port ' + config.port + '...');
    console.log(chalk.magenta(`                                                                                                         
   SSSSSSSSSSSSSSS      OOOOOOOOO             CCCCCCCCCCCCCIIIIIIIIII               AAA               LLLLLLLLLLL             
 SS:::::::::::::::S   OO:::::::::OO        CCC::::::::::::CI::::::::I              A:::A              L:::::::::L             
S:::::SSSSSS::::::S OO:::::::::::::OO    CC:::::::::::::::CI::::::::I             A:::::A             L:::::::::L             
S:::::S     SSSSSSSO:::::::OOO:::::::O  C:::::CCCCCCCC::::CII::::::II            A:::::::A            LL:::::::LL             
S:::::S            O::::::O   O::::::O C:::::C       CCCCCC  I::::I             A:::::::::A             L:::::L               
S:::::S            O:::::O     O:::::OC:::::C                I::::I            A:::::A:::::A            L:::::L               
 S::::SSSS         O:::::O     O:::::OC:::::C                I::::I           A:::::A A:::::A           L:::::L               
  SS::::::SSSSS    O:::::O     O:::::OC:::::C                I::::I          A:::::A   A:::::A          L:::::L               
    SSS::::::::SS  O:::::O     O:::::OC:::::C                I::::I         A:::::A     A:::::A         L:::::L               
       SSSSSS::::S O:::::O     O:::::OC:::::C                I::::I        A:::::AAAAAAAAA:::::A        L:::::L               
            S:::::SO:::::O     O:::::OC:::::C                I::::I       A:::::::::::::::::::::A       L:::::L               
            S:::::SO::::::O   O::::::O C:::::C       CCCCCC  I::::I      A:::::AAAAAAAAAAAAA:::::A      L:::::L         LLLLLL
SSSSSSS     S:::::SO:::::::OOO:::::::O  C:::::CCCCCCCC::::CII::::::II   A:::::A             A:::::A   LL:::::::LLLLLLLLL:::::L
S::::::SSSSSS:::::S OO:::::::::::::OO    CC:::::::::::::::CI::::::::I  A:::::A               A:::::A  L::::::::::::::::::::::L
S:::::::::::::::SS    OO:::::::::OO        CCC::::::::::::CI::::::::I A:::::A                 A:::::A L::::::::::::::::::::::L
 SSSSSSSSSSSSSSS        OOOOOOOOO             CCCCCCCCCCCCCIIIIIIIIIIAAAAAAA                   AAAAAAALLLLLLLLLLLLLLLLLLLLLLLL`));
});
