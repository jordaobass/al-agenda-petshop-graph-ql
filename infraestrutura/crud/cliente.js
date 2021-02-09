const executaQuery = require('../database/queries')

class Cliente {

  lista() {
    const sql = 'SELECT * FROM Clientes ;' +
                'SELECT * FROM Pets ';
    return  executaQuery(sql).then(dados =>
    {
        const clientes = dados[0];
        const pets = dados[1];
       return  clientes.map(cliente => {
           const petsCliente = pets.filter(pet => pet.donoId === cliente.id)
         return({
             ...cliente,
             pets: petsCliente
         })
       })
    });
  }

  buscaPorId( id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}`

   return executaQuery( sql).then( clientes => clientes[0])
  }

  adiciona( item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

   executaQuery(sql).then
    ( r =>({
          id: r.insertId,
          nome,
          cpf
         })
    );

    //executaQuery( sql).then(resposta =>
   // {
   //   console.log(resposta)
   //   return
   // })
  }

  atualiza( novoItem)
  {
    const { nome, cpf , id} = novoItem;
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`;

    return  executaQuery(sql).then(() => novoItem);
  }

  deleta(id)
  {
    const sql = `DELETE FROM Clientes WHERE id=${id}`;

    return  executaQuery(sql).then(()=>id);
  }
}

module.exports = new Cliente
