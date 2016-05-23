var mongoose = require('mongoose');

module.exports = {
    salvarGrupos: function (grupos,campeonato) {
        this.removerPorCampeonato(campeonato._id);
        var model = this.getModel();
        for (i in grupos) {
            var Grupo = new model(grupos[i]);
            Grupo.save(function (err, entity) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(entity);
                }
            });
        }
    },
    removerPorCampeonato : function (campeonato) {
        var model = this.getModel();
        model.remove({ campeonato: campeonato }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    atualizarGrupo: function (grupo) {
        var model = this.getModel();

        model.findOneAndUpdate({ _id: grupo._id }, {
            $set: {
                'partidas': grupo.partidas,

            }
        }, { new: true }, function (err, entity) {
            if (err) {
                console.log(err);
            } else {
                console.log(entity);
            }
        });


    },

    buscarGrupos: function (res, campeonato) {
        var model = this.getModel();
        var consulta = model.
            find({ campeonato: campeonato }).
            sort({ nome: +1 }).select("id nome campeonato partidas participantes").exec();
        consulta.then(function (gruposConsulta) {
            res.send(gruposConsulta);
        });
    },

    getModel: function () {
        try {
            return mongoose.model('Grupos');
        } catch (err) {
            return mongoose.model('Grupos', {
                campeonato: String,
                nome: String,
                partidas: Array,
                participantes: Array
            });
        }
    }
}