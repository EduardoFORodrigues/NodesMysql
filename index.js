var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var conexao = require("./conexaoBanco");
var app = express();
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(methodOverride('_method'));
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
 
    //Conexão ao banco de dados uma vez no inicio
    conexao.connect(function(error){
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(); //encerrar o servidor caso a conexão falhe
    }
    });
 
app.get('/', function(req, res){
    res.sendFile(__dirname+'/cadastro.html')
});
 
app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
 
    
    //prevenindo SQL Injection
        var sql ="INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
        conexao.query(sql, [nomecompleto, email, senha], function(error, result){
            if(error) throw error;
 
            //res.send("Estudante cadastrado com sucesso!" + result.insertId);
 
            res.redirect('/estudantes');
        });
    });
 
 
//Leitura do banco de dados
app.get('/estudantes', function(req, res){
var sql = "select * from estudante";
conexao.query(sql, function(error, result){
    if(error) console.log(error);
    //console.log(result);
    res.render('estudantes', {estudante:result});
        });
    });
 
 
//Rota de Delete
app.delete('/delete-estudante', function(req, res){
    const id = req.body.id;
 
    conexao.query('DELETE FROM estudante WHERE id = ?', [id], (err) => {
    if(err) {
        console.error(err);
        return res.status(500).send('Erro ao deletar estudante');
    }
    res.redirect('/estudantes')
   });
});
 
//Rota update
 
app.get('/update-estudante', function(req, res){
    const id = req.query.id;

    conexao.query("SELECT * FROM estudante WHERE id = ?",[id], (err, results)=>{
     
        if(err)return res.status(500).send("Erro ao buscar estudantes");
        res.render('alterarestudantes', {estudante: results[0]})
    });

});
 

app.put('/update-estudante', function(req, res){

    const {id, nomecompleto, email, senha} = req.body;

    conexao.query('UPDATE estudante SET nomecompleto=?, email=?, senha=? WHERE id=?',
        [nomecompleto, email, senha, id], (err)=> {
            if(err) return res.status(500).send('Erro ao atualizar estudante');
            res.redirect('/estudantes');
        });
    

});
/*app.put('/update-estudante', function(req, res) {
    const { id, nomecompleto, email, senha } = req.body;

    if (senha && senha.trim() !== '') {
        // Atualiza nome, email e senha
        conexao.query(
            'UPDATE estudante SET nomecompleto = ?, email = ?, senha = ? WHERE id = ?',
            [nomecompleto, email, senha, id],
            (err) => {
                if (err) return res.status(500).send('Erro ao atualizar estudante');
                res.redirect('/estudantes');
            }
        );
    } else {
        // Atualiza nome e email, mantém senha atual
        conexao.query(
            'UPDATE estudante SET nomecompleto = ?, email = ? WHERE id = ?',
            [nomecompleto, email, id],
            (err) => {
                if (err) return res.status(500).send('Erro ao atualizar estudante');
                res.redirect('/estudantes');
            }
        );
    }
});

Exemplo

Como implementar validação de senha?
1. Validação no Frontend (HTML + JS):

Exemplo básico usando JavaScript para validar:

function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    // Explicação da regex:
    // (?=.*[a-z])  --> ao menos uma letra minúscula
    // (?=.*[A-Z])  --> ao menos uma letra maiúscula
    // (?=.*\d)     --> ao menos um número
    // (?=.*[\W_])  --> ao menos um caractere especial
    // .{8,}        --> pelo menos 8 caracteres no total

    return regex.test(senha);
}

// Exemplo uso:
const senha = 'MinhaSenha@123';
if (!validarSenha(senha)) {
    alert('Senha inválida: use ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
}

2. Validação no Backend (Node.js):

No backend, faça a mesma validação para garantir segurança — nunca confie somente no frontend.

Exemplo usando express-validator:

const { body, validationResult } = require('express-validator');

app.put('/update-estudante', [
  body('senha')
    .optional({ checkFalsy: true }) // senha é opcional, só valida se preenchida
    .isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
    .matches(/[a-z]/).withMessage('A senha deve conter letra minúscula')
    .matches(/[A-Z]/).withMessage('A senha deve conter letra maiúscula')
    .matches(/\d/).withMessage('A senha deve conter número')
    .matches(/[\W_]/).withMessage('A senha deve conter caractere especial'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Trate o erro, retorne mensagem para o usuário
    return res.status(400).json({ errors: errors.array() });
  }

  // Código de atualização de estudante aqui...
});




*/

 
app.listen(7000);
 
/*
 
 
 
//console.log("O banco de dados foi conectado!");
 
conexao.query("select * from estudante", function(error, result){
if(error) throw error;
//console.log(result);
console.log(result[0]);
console.log(result[0].nomecompleto);   
});
 
 
*/