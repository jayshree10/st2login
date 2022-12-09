var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/f",function(request,response){
     response.sendFile(__dirname+"/form.html")
})
app.post("/save",function(request,response)
{
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"login"})

 
    var user_email = request.body.user_email;

    var user_password = request.body.user_password;

   conn.connect(function(errror){
    if(errror) throw errror
    var sql ="insert into login_details(user_email,user_password) values('"+user_email+"','"+user_password+"')";
    conn.query(sql,function(errror){
        console.log('Data Save Sucssfully')
    })


   })
   
})
app.get("/show",function(request,response){
    conn.connect(function(errror)
    {
        if (errror) throw errror;
        conn.query("select * from data",function(errror,result)
        {
            console.log(result);
            response.render("show",{result:result})
        })
    })
})

var session=require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
