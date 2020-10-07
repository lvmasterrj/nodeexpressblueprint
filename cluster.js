/**
 *	 @desc Módulo de cluster para aproveitar todos os núcleos do sistema
 */

const cluster = require('cluster');
const os = require('os');
const cpus = os.cpus();

console.log('executando thread');

/**
 * @desc Cria os parametros da thread master e clona ela para as thread slaves
 * @param {*} iniciaSistema - Instância do sistema
 */
module.exports = (iniciaSistema) => {
	if(cluster.isMaster){
		console.log('thread master');

		// Clona o master em cada núcleo
		cpus.forEach(function(){
			cluster.fork();
		});

		// Evento de escuta dos clusters
		cluster.on('listening', function(worker){
			console.log('cluster conectado ' + worker.process.pid );
		});

		// Evento de saida dos clusters (reconeta)
		cluster.on('exit', worker => {
			console.log('cluster %d desconectado', worker.process.pid);
			cluster.fork();
		})

	} else {
		console.log('thread slave');
		iniciaSistema();
	}
}
