const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const messages = require('./db/messages');

const app = express();
//midle
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

//route
app.get('/', (req,res)=>{
   res.json({
    message: "ok lets go"
   });
})

app.get('/messages',(req,res)=>{
messages.getAll()
.then((messages) => {
    res.json(messages)
}).catch((error)=>{
    res.status(500);
    res.json(error);
})
})

app.post('/messages',(req,res)=>{
    console.log(req.body)
    messages.create(req.body).then((message)=>{
        res.json(message)
    }).catch((error) => {
        res.status(500);
        res.json(error);
  });
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})


//!!!!!!!!!!!!!!!!!!!
// app.post('/messages',(req,res)=>{
//     console.log(req.body)
// })