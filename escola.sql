 --CREAÇÃO DO DATA BASE
 CREATE DATABASE escola;
 

 ----CREAÇÃO DA TABELA COM COLUNAS

 CREATE TABLE estudante(
 id INT(10)AUTO_INCREMENT PRIMARY KEY,
 nomecompleto varchar(60) NOT NULL,
 email VARCHAR(50) UNIQUE NOT NULL,
 senha VARCHAR(50) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

 );

 --inserir dados no banco de dados via código SQL (CREATE)

 INSERT INTO estudante(nomecompleto, email, senha)
 VALUES("Eduardo frança","dudacritivo@gmail.com",'123'),
 ("Ana claudia cunha","ana@gmail.com","456"),
 ("quezia Santos","quezia@gmail.com","455"),

 ---SELECIONANDO TODOS OS DADOS DA TABELA ESTUDATES(READ)

 SELECT * FROM estudantes