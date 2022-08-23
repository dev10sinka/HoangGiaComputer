require('./models/database');
const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 3319
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser')
var expressLayouts = require('express-ejs-layouts');

var app = express();


const server = require('http').createServer(app)

// back-end Controller
const dashboardController = require('./controllers/backend/dashboardController');
const categoryController = require('./controllers/backend/categoryController');
const productController = require('./controllers/backend/productController');
const loginController = require('./controllers/backend/loginController');




// front-end Controller
const homePageController = require('./controllers/fontend/homePageController');
const allProductController = require('./controllers/fontend/allProductController');
const detailProductController = require('./controllers/fontend/detailProductController');
const middleware = require('./middleware');
const userController = require('./controllers/fontend/userController');


// admin service



app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extend: true }));
app.use(express.static(__dirname + '/public/'));
app.use(expressLayouts)
app.set('layout', './layouts/container')
app.set('view engine', 'ejs')


server.listen(port, () => {
    console.log('Express server started http://localhost:' + port);
});
app.use('/', loginController);
app.use('/', middleware);
app.use('/', homePageController);
app.use('/', dashboardController);
app.use('/', categoryController);
app.use('/', productController);
app.use('/', allProductController);
app.use('/', detailProductController);
app.use('/', userController);

