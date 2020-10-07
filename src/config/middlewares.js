/**
 * Módulo que consentra os middlewares do express
 */

const methodOverride = require('method-override');

module.exports = (express, app) => {

	// MW - para parsear as requisições
	app.use(express.urlencoded({ extended: true }));

	// MW - Auxilia ao passar os métodos PUT, DELETE, etc.
	app.use(methodOverride('_method'));

	// MW - Autenticação dos usuários
	//require('./sessao-autenticacao')(app);





}