let express = require('express');
let bodyParser = require('body-parser');
let ExpressBrute = require('express-brute');
let crypto = require('crypto');

let arr = require('./util/compilers');
let sandBox = require('./util/DockerSandbox');

let app = express();
let store = new ExpressBrute.MemoryStore();
let bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

app.use(bodyParser());
app.use(express.static(__dirname));

//allow CORS
app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

//generate randow file name
function random(size) 
{
  return crypto.randomBytes(size).toString('hex');
}

app.post('/compile',bruteforce.prevent,function(req, res) 
{

    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;
   
    var folder= 'temp/' + random(10); 
    var path=__dirname+"/"; 
    var vm_name='virtual_machine';
    var timeout_value=20;

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data, exec_time, err)
    {
    	res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
    });
   
});

app.get('/', function(req, res) 
{
    res.sendfile("./index.html");
});


const PORT = 8080;

app.listen(PORT, (err)=>{
  if(!err)
  console.log(`Listening on port ${PORT}`);
  else
  console.log(err);
});