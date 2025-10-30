const mysql = require("mysql2");
const concta = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Kssantana@11",
    database:"petshop"
})

concta.connect((error) =>{
    if(error){
        console.error("Erro ao conectar ao banco de dados:", error);
    } else {
        console.log("Conexão bem-sucedida ao banco de dados MySQL.");
    }
})
module.exports = concta;