const { GraphQLServer } = require('graphql-yoga')
//const customExpress = require('./config/custom-express')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')
//const app = customExpress()

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})


const Clientes = new Operacoes('cliente')
const Pets = new Operacoes('pet')
//app.listen(4000, () => {
//  console.log('Servidor rodando na porta 4000')
//})


const resolvers = {
  Query:{
    status: () => "Servidor Rodando",
    clientes:() => Clientes.lista(),
    cliente: (root, {id}) => Clientes.buscaPorId(id),
    pets: () => Pets.lista(),
    pet:(root , {id}) => Pets.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => (Clientes.adiciona(params)),
    atualizarCliente: (root, params) => (Clientes.atualiza(params)),
    deletarCliente: (root, {id}) => (Clientes.deleta(id)),
    adicionarPet: (root, params) => Pets.adiciona(params),
    atualizarPet:(root, params) => Pets.atualiza(params)
}
};

const servidor = new GraphQLServer({
  typeDefs:'./schema.graphql',
  resolvers
})

servidor.start(() => console.log('servidor ouvindo'))
