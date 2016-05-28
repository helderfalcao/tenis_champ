var express = require('express');
var cors = require('cors');
var jogadorService = require('./jogadores_service');
var campeonatoService = require('./campeonato_service');
var grupoService = require('./grupo_service');
var dbService = require('./db_connection');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.listen(8080);

dbService.getConnecton();

app.use(cors());

app.get('/jogador', function (req, res, next) {
  jogadorService.buscaJogador(res);
});

app.put('/jogador', function (req, res, next) {
  if ("/jogador" != req.originalUrl) {
    var jogador = jogadorService.cadastraJogador(
      req.query.id,
      req.query.nome,
      req.query.apelido,
      req.query.email,
      req.query.foto, 
      res);
  }
});

app.get('/campeonato', function (req, res, next) {
  campeonatoService.buscaCampeonatos(res);
});

app.put('/campeonato', function (req, res, next) {
  var campeonato = campeonatoService.cadastraCampeonato(
    req.query.id,
    req.query.nome,
    req.query.quantidadeGrupo,
    req.query.idaVolta,
    req.query.classPorGrupo,
    res);

});

app.delete('/campeonato/:id?', function (req, res, next) {
  var campeonato = campeonatoService.deletar(req.params.id, res);
  res.send(200);
});

app.get('/grupo', function (req, res, next) {
  grupoService.buscarGrupos(res, req.query.campeonato);
});

app.post('/grupo', function (req, res) {
  var grupos = req.body;
  var grupo = grupoService.salvarGrupos(req.body[0], req.body[1]);
  res.send(200);
});

app.post('/grupoUpdate', function (req, res) {
  var grupo = grupoService.atualizarGrupo(req.body);
  res.send(200);
});