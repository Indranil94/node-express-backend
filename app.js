const express = require('express');
const bodyParser = require('body-parser');

const PlaceRouter = require('./routes/place-routes');
const UsersRouter = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json())

app.use('/api/places',PlaceRouter);
app.use('/api/users',UsersRouter);

app.use((req,res,next)=>{
    const error = new HttpError(`Could not find this specific route`, 404);
    next(error);
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }

    res.status(500 || error.message );
    res.json({message: error.message || "An unknown error occured!"})

})

app.listen(process.env.PORT || 3000);