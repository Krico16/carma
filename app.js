var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('firebase-admin');

const config = {
  "type": process.env.FIREBASE_TYPE, //
  "project_id": "carma-web-75ffe", //
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID, //
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRorg0Hg1w0aDc\nYfpwCX18CEgIOlA0317NQD4eIrgjOK0Fi+siZSrOMHvJeCKj5IfaNcCo9ZL2ZIzE\ngy1i9LHbVLbzhXfVe23bI9Ls+jqak+0Uyg9OPWUoF/aIwm4QNF1zUAAdAGfOszG3\n/72SbX/pnyZW6qhHYHuOx1Vr6Oir0tfDPSOclwTV1NVth7gKrWQW3KNq9WTC34/8\n0KgGY2VLOQokFzAxhmuhBU3isWiy8dr4jY2tkOK84zvECAFo/gHsD0KAmLppa+0f\nWNvXM+vXiZqAA9m0xd3Ctx/lnONEmqBCURpSH4zZfTFbJ+e+uuKQnSWfUotPOdar\nFjlx42GHAgMBAAECggEAAKYYcYTZoCHt9bCnRfB+6cLcIjZiqCnm0Qt5WxOFbrUk\nB/KHvvABjWjQq+4fa/1u6YnQDQB8PMn74OHSYqOE52ZgOJRkVg356Ds4pxDGh1Ly\nNrsXXV51m9r9zCzkiqVMLWlaeWcrwGkv5rS3wVEYcRXT2GIFNPoDTTeoYoXyg7xJ\nDEL+pNbGHcL0hnQN1L5w1huKF2UaDkFTtRNzYbD10FrBog08QTPreY4cW0cZNmMt\n1va+5J3MD2xEXNuh5+ELfTLtPOV2xnMhMFFmXMMzOCQ2G5d7/L/uzrUs1McBsDjF\ne9pVlwpuG84iWmksGdGJOmP8PriMMT6zK08454SkyQKBgQD5KjydzvrBg1WfRzDN\n30bc8JaoLkRhR7yxFKolgXnG8wIiFGCfmKrvSEUroSvHbIH/HLvwnVqEdlB60i1L\nk+dImfuW3dLA1lrqxZXyoFv7Z0ys3NO9yoQOK63du9zmB2j+fQyCWeNvdZb1znd4\nxB0NxLy7z3rxqbfG22SqYWmWbwKBgQDXYuMxPZ9Dsr+jcEisKPQ0a20Q/IAQSGD4\n5xwLs2PTzD2nTe75OIFwzxJIeHsf7PaedymC8Xid8gTTTE/3BwE5VBOKM99r57+j\nVkitsI8uD8X5dJVmS4qFXkNEU5rMx6g425Wm2iEARlqRhvpAtn/m+rn1OelhHOoV\nsHzpNn0yaQKBgDDqS9AnTC8lW2/TiA9CoCTLzqfhvWbjsHWLOwP18TRPjMGoAngS\nfqxPIdU45OFXugWdXIAWRCjxGUejb2UA+kzUfgHWNoPJETw54gAp3yTx2KmvCJqf\n4WDuzklTkkBOgBxF7GjCwNWm3iYPjIDW72U+lFbCmr5KtVuCwrZ4PURdAoGAbn3Y\nNuZ50WzdSqbLYSYRQOLrLI+b0r6OoKFOjeIVEA3yguVD9q26GXjg1DSaVSJm0Zwn\nu3jMe5owR4UacIszYYl0DK3Xq69TbCNTXWb5zJNi6DmaesO95/UXZPHOs8ao0aIz\n/0hfLZjp1UX9Ez2MF53/z4FJ6/u9SisjqS++wiECgYAW9L7QR7tklwMT9B1U0PFu\nsUzMwKjTtD3TNUFb8ZuXXik5VHdhgHSz2pubOPza7SEBKyEE1ThnQmMqoZbwWVlJ\ndf5xKRj9uRf3WZpAoH+x1XnFJE4ANHdqFbvp0+IHuNgwp82Se7GkZ0acukX1bFfv\ngze+Zb+fyFdoJU8iAz1ZOw==\n-----END PRIVATE KEY-----\n",//process.env.FIREBASE_PRIVATE_KEY,
  "client_email": "firebase-adminsdk-48mwt@carma-web-75ffe.iam.gserviceaccount.com", //process.env.FIREBASE_CLIENT_EMAIL  ,
  "client_id": process.env.FIREBASE_CLIENT_ID, //
  "auth_uri": process.env.FIREBASE_AUTH_URI, //
  "token_uri": process.env.FIREBASE_TOKEN_URI, //
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL, //
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL //
};

db.initializeApp({
  credential: db.credential.cert(config),
  databaseURL: "https://carma-web-75ffe.firebaseio.com"
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var detailRouter = require('./routes/detail');
var app = express();


//  Set manifest file
/*
app.use(manifest({
  manifest: path.join(__dirname, 'public') + '/rev-manifest.json',
  prepend: path.join(__dirname, 'public'),
  reqPathFind: /^(\/?)/,
  reqPathReplace: '',
  debug: true
}));
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/detail', detailRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.db = db.database();
//module.exports.storage = db.storage();