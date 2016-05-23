var mongoose = require('mongoose');

module.exports = {
    cadastraJogador: function cadastraJogador(nome, apelido, email, foto) {
        var model = this.getModel();
        var Jogador = new model({ nome: nome, apelido: apelido, email: email, foto: foto });
        Jogador.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok');
            }
        });
    },

    buscaJogador: function buscaJogadores(res) {
        var model = this.getModel();
        var consulta = model.find().select("nome apelido email foto").exec();
        var jogadores = new Array();
        var done = false;
        consulta.then(function (jogadoresConsulta) {
            for (i in jogadoresConsulta) {
                jogadores.push(jogadoresConsulta[i]);
            }
            res.send(jogadores);
        });
    },

    getModel: function () {
        try {
            return mongoose.model('Jogadores');
        } catch (err) {
            return mongoose.model('Jogadores', {
                id: String,
                nome: String,
                apelido: String,
                email: String,
                foto: String
            });
        }
    }
}