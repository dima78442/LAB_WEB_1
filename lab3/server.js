const express = require("express");
const app     = express();
const path    = require("path");
const bodyParser = require('body-parser');


let pageDump = null;

const words = {
    "Лодзь":"Лодзь - місто",
    "CD Project":"CD Project - компанія",
    "Пригоди Відьмака":"Пригоди Відьмака - легендарна сага",
    "університет": "шарага"
};

app.use(express.static('docs'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.sendFile(path.resolve('./docs/main.html'));

});

app.all('/api', function (req, res) {
   if(req.query['meaning']) {
       words[req.query['word']] = req.query['meaning'];
       pageDump = req.body.page;
   }
   else
       res.write(words[req.query['word']] || 'error');
   res.end();
});

app.all('/init', function (req, res) {
    res.write(encodeURIComponent(pageDump) || 'none');
    res.end();
});



app.listen(1489);

console.log("Running at localhost:1488");