var conexao = require("./conexaoBanco")

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

//Conexão ao banco de dados

  conexao.connect(function(error){
            if(error){
            console.error("Erro ao conectar ao banco de dados", error);
            process.exit();
}
});

app.get('/',function(req,res){
    res.sendFile(__dirname+ '/cadastro.html')
});
//app.post('/', function(req,res){
    //console.log(req.body);
//});

app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;





 
var sql ="INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
conexao.query(sql, [nomecompleto, email, senha], function(error, result){
    if(error)throw error;

    //res.send("Estudante cadastrado com sucesso" + result.insertId);
    res.redirect('/estudantes')
  });

 });
     

app.get('/estudantes', function(req, res){

 
    var sql = "select * from estudante";
    conexao.query(sql, function(error, result){
        if(error) console.log(error);
       // console.log(result);
       res.render(__dirname+"/estudantes", {estudante:result});
        });
    });

app.get('/delete-estudante', function(req,res){

    var sql = "delete from estudante where id=?";


    var id = req.query.id;

    conexao.query(sql,[id], function(error, result){
        
        if(error) console.log(error);
        res.redirect('/estudantes');

    })
})

//Rota update
app.get('/update-estudante', function(req, res){

    var sql = "select * from estudante where id=?";

    var id = req.query.id;

    conexao.query(sql,[id], function(error,result){

        if(error) console.log(error);
        res.render(__dirname + '/alterarestudantes',{estudante:result})


    });

})
app.post('/update-estudante', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    var id = req.body.id;
    var sql = "UPDATE estudante set nomecompleto=?, email=?, senha=? where id=?";

    var id = req.query.id;

    conexao.query(sql,[nomecompleto,email,senha,id],function(error,  result){
        if(error)console.log(error);
        res.render(__dirname+ '/alterarestudantes',{estudante:result});
        res.redirect('/estudantes');
    })
})

app.listen(7000);

