const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


// db config
const db = require('./config/keys').MongoURI;

// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

const app = express();
// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server is running on port ${PORT}`));