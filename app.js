const express = require('express');
const http = require('http');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');
const config = require('./config/config')[env];
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session); // create DB, PostgreSQL DB Session
const pgPool = new pg.Pool({
    user :      config.db.pg.user,
    password :  config.db.pg.password,
    host :      config.db.pg.host,
    port :      config.db.pg.port,
    database :  config.db.pg.database
});

var env = process.env.NODE_ENV || 'development';

console.log('Using configuration', config);

require('./config/passport')(passport, config);

var app = express();

app.set('port', config.app.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(
  {
    store: new pgSession({ // configure express-session statefull using DB PostgreSQL
        pool : pgPool,
        schemaName : 'pg_schema_name',
        tableName :  'user_sessions'
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'this shit hits',
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 } // 2 days
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, config, passport);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
