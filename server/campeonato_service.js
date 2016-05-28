var mongoose = require('mongoose');

module.exports = {
    cadastraCampeonato: function (id, nome, quantidadeGrupo, idaVolta, classPorGrupo, res) {
        var model;
        var campeonato;
        if (id) {
            model = this.getModel();
            model.update({ _id: id },
                { $set: { nome: nome, quantidadeGrupo: quantidadeGrupo, idaVolta: idaVolta, classPorGrupo: classPorGrupo } },
                function (err, entity) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(entity);
                        console.log(entity);
                    }
                });
        } else {
            model = this.getModel();
            var generatedId = mongoose.Types.ObjectId();
            campeonato = new model({ _id: generatedId, nome: nome, quantidadeGrupo: quantidadeGrupo, idaVolta: idaVolta, classPorGrupo: classPorGrupo });
            campeonato.save(function (err, entity) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(entity);
                    console.log(entity);
                }
            });
        }

    },

    buscaCampeonatos: function (res) {
        var model = this.getModel();
        var consulta = model.find().select("_id nome quantidadeGrupo idaVolta classPorGrupo").exec();
        consulta.then(function (campeonatosConsulta) {
            res.send(campeonatosConsulta);
        });
    },

    deletar: function (id, res) {
        var model = this.getModel();
        var consulta = model.find({ _id: id }).remove(function (err) {
            if (err) {
                console.log(err);
            }
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
                idaVolta: Boolean,
                classPorGrupo: Number
            });
        }
    }
}