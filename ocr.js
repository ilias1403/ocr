var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Tesseract = require('tesseract.js');
const { createWorker } = require('tesseract.js');
const isImageURL = require('image-url-validator').default;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/getRequest/:name', function(req, res) {
    res.send('Hello ' + req.params.name);
});

app.post('/postRequest', function(req, res) 
{
    if(req.body.resit_image)
    {
      var src = req.body.resit_image;

      isImageURL(src).then(is_image => {
          if(is_image)
          {
            const worker = createWorker({
              logger: m => console.log(m)
            });
            (async () => {
              await worker.load();
              await worker.loadLanguage('eng');
              await worker.initialize('eng');
              const { data: { text } } = await worker.recognize(src);
              console.log(text);
              res.send(text);
              await worker.terminate();
            })();
          }
          else
          {
            res.send("Not an image");
          }
      });

    //   Tesseract.recognize(req.body.resit_image,'eng')
    //   .then(({ data: { text } }) => {res.send(text)})

    //   .catch((err) => {
    //     res.send('Something went wrong');
    // });
      // Tesseract.recognize(req.body.resit_image,'eng').then(({ data: { text } }) => {res.send(text)})\
    }
    else
    {
      res.send('Invalid params');
    }

    
    

    // const worker = createWorker({
    //   logger: m => console.log(m), // Add logger here
    // });

    // (async () => {
    //   await worker.load();
    //   await worker.loadLanguage('eng');
    //   await worker.initialize('eng');
    //   const { data: { text } } = await worker.recognize(req.body.resit_image);
    //   console.log(text);
    //   await worker.terminate();
    // })();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
