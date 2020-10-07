/**
 * Controlador das páginas de base (Home e outras, que não utilizam dados do BD)
 */

const path = require('path');
const fs = require('fs');

/* Pasta raiz dos arquivos de base */
const views = path.join(__dirname, '../views/pages/');

class BaseController {

	// Função que serve as rotas do controlador Base
    static rotas() {
        return {
            home: '/',
			pages: '/page/:nome',
        };
    }

    // Retorna a página Home
    home(){
        return (req, res) => res.sendFile(views + 'home/index.html');
    }

    /**
     * PÁGINAS ESTÁTICAS 
     * Verifica se existe a página, senão devolve erro 404
     */
    pagina(){
        return (req, res) => {
			// Pega o caminho da página
			let page = views + req.params.nome + '/index.html';

			// Verifica se existe a página
			if (fs.existsSync(page)){
				res.sendFile(page);
			} else {
				//res.sendStatus(404)
				res.redirect('/404');
			}
        }
	}

}

module.exports = BaseController;