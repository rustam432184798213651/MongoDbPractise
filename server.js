const express = require('express');
const fs = require('fs');
const multer = require('multer');
var path = require('path');
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/new').
  catch(error => console.log(error));
mongoose.connection.on('connected', () => console.log('connected'));
const app = express();
const PORT = 443;
const PersonSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String
});



app.use(express.json());
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname.split('.')[0] + "__" + Date.now() + "." + file.originalname.split('.')[1])
    }
  })
  
  const upload = multer({storage: storage})
app.get('/NikitaIsTheBest', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Nikita is the the best');
})
app.get('/:fname', (req, res) => {
  
  const human = mongoose.model('human', PersonSchema);
  human.findOne({ 'FirstName': req.params.fname}).then((docs)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({FirstName: docs.FirstName, LastName: docs.LastName}));
  })
  .catch((err)=>{
      res.setHeader('Content-Type', 'text/html');
      res.sendFile(__dirname + '/does_not_exist.html');
  });

  //res.sendFile(__dirname + '/index.html'); 
});


app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(__dirname + '/index.html');
})
function return_response(fileName, res){
    fs.readFile("uploads\\" + fileName, 'utf8', function(err, data) {
        if (err) throw err;
        result = {};
        text = data.split(";\r\n");
        // Delete last character from last string
        text[text.length - 1] = text[text.length - 1].slice(0, text[text.length - 1].length - 1);
        for(let i = 0; i < text.length; i++)
        {
            line = text[i].split(' is ');
            result[line[0]] =  line[1];
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        res.end();
      });
}



app.post('/api/upload',  (req, res) => {
    // const pathToFile = "uploads/" + req.file.filename;
    // res.setHeader('Content-Type', "application/json");
    // res.send(JSON.stringify(get_dictionary(pathToFile)));
    //mongoose.users.findOne({"username" : {$regex : "son"}});

    const human = mongoose.model('People', PersonSchema);
    
});

// Integration with server
app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
});

function insertDataToMongoDB(){
    const data = document.getElementById('SubmitData')
}

app.post("/", (req, res) => {
  const first_name = req.body.fname;
  const  last_name = req.body.textarea;
  console.log("First name: " + first_name);
  console.log("Last name: " + last_name);
  const human = mongoose.model('human', PersonSchema);
  const current = new human({ FirstName: first_name, LastName: last_name});
  current.save();
  res.send("Data received");
})