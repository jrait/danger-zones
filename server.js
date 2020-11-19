var express = require('express');
var app =(express());
var fileUpload = require('express-fileupload');
const cors = require('cors')
const port = 8000;
require('./server/config/mongoose.config')
app.use(cors())
app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Routes = require("./server/routes/counties.routes")
Routes(app)
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );