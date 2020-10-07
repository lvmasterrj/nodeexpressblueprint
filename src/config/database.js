/**
 * Módulo de conexão ao banco de dados do Mongo DB
 * exporta as funções ConectaBD, pegaBD, pegaBDClient
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

let _bd;
let _bdClient;

/**
 * Função que conecta o Banco de dados
 * @returns _bd - instância do BD conectado
 */
async function conectaBD() {

	let _bdString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

	_bdClient = new MongoClient(_bdString, { 
		useNewUrlParser:true, 
		useUnifiedTopology: true
	});

	try {
        
		// Use connect method to connect to the Server
		await _bdClient.connect(); //config.db.connectionString, config.db.connectionOptions
        
		console.log("Conectado corretamente ao BD");

		// Set debug level
		// Logger.setLevel('debug');

		// Only log statements on 'Db' class
		///Logger.filter('class', ['Connection']);

		_bd = _bdClient.db();
		return _bd;

	} catch (err) {
		throw new Error(`Erro ao conectar ao BD:\n${err.stack}`)
	}
};

/**
 * Função que retorna o BD conectado
 */
function pegaBD() {
	if(!_bd){
		console.log('BD não foi iniciado!');
		//return conectaBD();
	}
	return _bd;
}

/**
 * Função que retorna o BD Client do driver do Mongo DB
 */
function pegaBDClient() {
	if(!_bdClient){
		console.log('BD não foi iniciado!');
		//return conectaBD();
	}
	return _bdClient;
}

module.exports = {
	conectaBD,
	pegaBD,
	pegaBDClient
};