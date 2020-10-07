const sistema = function iniciaSistema(){
	// Inicia a conexão com o BD
	//process.env.SHOW_MODULE_COMPLAINS=1
	require("./src/config/database").conectaBD()
		.then(iniciaServidor())
		.catch(erro => console.log(erro));

	function iniciaServidor(){
		const app = require("./src/config/custom-express");
		const appPorta = process.env.APP_PORTA;

		// Inicia a escuta do servidor
		app.listen(appPorta, function(){ 
			console.log(`Servidor escutando na porta ${appPorta}.`);
		});
	}
};

// Roda o sistema em um só núcelo
sistema();

// Roda o sistema em todos os núcleos disponíveis
//require('./cluster')(sistema);