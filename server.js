const api = require('./server/routes/api');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser=require('body-parser');
const { urlencoded } = require('express');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'dist/finalproject')));

app.use('/api', api);

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname,'dist/finalproject/index.html'));
})
app.listen(3001,()=>{
    console.log("server is listening at port 3001");
});
