const express         = require('express'); 
const favicon         = require('serve-favicon');
const load            = require('express-load');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const port            = 3002;

var app = express();

load('models').then("dao").then('middleware').then("service").into(app);

var mongodb = app.middleware.mongodb; 
var sentimental = app.service.sentimental;
var dao         = app.dao.tweet;

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

mongodb.connect();

sentimental.analysis();
sentimental.rankCongressista();

app.listen(port, () => { 
    console.log("Servidor rodando na porta "+port);
});
