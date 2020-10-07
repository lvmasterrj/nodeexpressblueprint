/**
 * Módulo de instanciamento e configuração do express
 */

const path = require('path');

// Instancia o consign
const consign = require('consign');

// Inicia o Express e instancia em app
const express = require('express');
const app = express();

// MW para a chamada dos arquivos estáticos
app.use('/public', express.static('src/public'));

// Instancia os outros MWs
require('./middlewares')(express, app);

// Instancia as rotas
consign({ cwd: 'src' })
    .include('routes')
    .into(app);

// Caso não tenha encontrado nenhuma rota, devolve status 404
app.use(function (req, res, next) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log('***** 404 *****', fullUrl );
	let page404 = path.join(__dirname, '../views/pages/error/') + 'page404.html';
    return res.sendFile(page404)
});

// Caso tenha algum erro na resposta, devolve status 500
app.use(function (erro, req, res, next) {
    console.log('***** 500 *****');
	console.log(erro);
	let page500 = path.join(__dirname, '../views/pages/error/') + 'page500.html';
	return res.sendFile(page500)
	//return res.sendStatus(500);
});

// Exporta o app
module.exports = app;