var mongoose = require('mongoose');

module.exports = {
    cadastraCampeonato: function (id, nome, quantidadeGrupo, idaVolta) {
        var model;
        var campeonato;
        if (id) {
            model = this.getModel();
            campeonato = new model({ _id: id, nome: nome, quantidadeGrupo: quantidadeGrupo, idaVolta: idaVolta });
        } else {
            model = this.getNewModel();
            campeonato = new model({ nome: nome, quantidadeGrupo: quantidadeGrupo, idaVolta: idaVolta });
        }
        campeonato.save(function (err,entity) {
            if (err) {
                console.log(err);
            } else {
                console.log(entity);
            }
        });
    },

    buscaCampeonatos: function (res) {
        var model = this.getModel();
        var consulta = model.find().select("_id nome quantidadeGrupo idaVolta").exec();
        consulta.then(function (campeonatosConsulta) {
            res.send(campeonatosConsulta);
        });
    },

    getModel: function () {
        try {
            return mongoose.model('Campeonatos');
        } catch (err) {
            return mongoose.model('Campeonatos', {
                _id: String,
                nome: String,
                quantidadeGrupo: Number,
                idaVolta: Boolean
            });
        }
    },
    getNewModel: function () {
        try {
            return mongoose.model('Campeonatos');
        } catch (err) {
            return mongoose.model('Campeonatos', {
                nome: String,
                quantidadeGrupo: Number,
                idaVolta: Boolean
            });
        }
    }
}