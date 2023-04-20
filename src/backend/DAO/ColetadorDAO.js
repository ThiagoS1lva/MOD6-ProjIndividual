// Importa o db.js para poder usar o banco de dados simulado
import db from "../infra/db.js" ;



// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class ColetadorDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM Coletadores";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM Coletadores WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // POST
  static inserir(coletador) {
    const query = "INSERT INTO Coletadores (nome, email, cpf, data_nascimento) VALUES(?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [coletador.nome, coletador.email, coletador.cpf, coletador.data_nascimento], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o coletador",
            error: err,
          });
        }
        resolve(coletador);
      });
    });
  }

  // PUT  --  
  static atualizar(id, coletador) {
    const query =
      "UPDATE Coletadores SET nome = ?, email = ?, cpf = ?, data_nascimento = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [coletador.nome, coletador.email, coletador.cpf, coletador.data_nascimento, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o coletador",
              erro: err,
            });
          }
          resolve({
            mensagem: "Coletador atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM Coletadores WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o coletador",
            erro: err,
          });
        }
        resolve({ mensagem: "Coletador deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
export default ColetadorDAO;