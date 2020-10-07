/**
 * Arquivo que pega as rotas de base do controlador e chama a função correspondente
 */

const BaseController = require('../controllers/baseController');
const baseController = new BaseController();

module.exports = (app) => {
    const rotas = BaseController.rotas();
    
    app.get(rotas.home, baseController.home());
	app.get(rotas.pages, baseController.pagina());

}