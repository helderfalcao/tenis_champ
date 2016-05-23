var tenisChampApp = angular.module('tenisChampApp', ['restangular']);

tenisChampApp.controller('CampeonatoStatusController', function ($scope, Restangular) {

    $scope.selecionarCampeonato = function (campeonato) {
        $scope.campeonato = campeonato;
        Restangular.allUrl('Grupos',
            'http://192.168.1.21:8080/grupo').customGET("",
            { campeonato: $scope.campeonato._id }).then(function (grupos) {
                $scope.calcularPontuacao(grupos);
                $scope.grupos = grupos;
            });
    };
    $scope.campeonatos = [];
    $scope.jogadoresOp = [];
    $scope.jogadoresPart = [];
    $scope.grupos = [];

    $scope.startLoad = function () {
        Restangular.allUrl('Jogadores',
            'http://192.168.1.21:8080/jogador').getList().then(function (jogadoresLista) {
                $scope.jogadoresOp = jogadoresLista;
            });;
        Restangular.allUrl('Campeonatos',
            'http://192.168.1.21:8080/campeonato').getList().then(function (campeonatosLista) {
                $scope.campeonatos = campeonatosLista;
            });;


    };

    $scope.loadGrupos = function () {

    }

    $scope.loadCampeonatos = function () {
        Restangular.allUrl('Campeonatos',
            'http://192.168.1.21:8080/campeonato').getList().then(function (campeonatosLista) {
                $scope.campeonatos = campeonatosLista;
            });;
    };
    $scope.loadJogadores = function () {
        Restangular.allUrl('Jogadores',
            'http://192.168.1.21:8080/campeonato').getList().then(function (campeonatosLista) {
                $scope.campeonatos = campeonatosLista;
            });;
    };

    $scope.adicionarJogador = function (jogador) {
        var index = $scope.jogadoresOp.indexOf(jogador);
        $scope.jogadoresOp.splice(index, 1);
        $scope.jogadoresPart.push(jogador);
    };

    $scope.removerJogador = function (jogador) {
        var index = $scope.jogadoresPart.indexOf(jogador);
        $scope.jogadoresPart.splice(index, 1);
        $scope.jogadoresOp.push(jogador);
    }

    $scope.sortearJogadores = function () {

        var jogadoresSort = new Array().concat($scope.jogadoresPart);
        var jogadoresSortResult = new Array();
        while (jogadoresSort.length) {
            var jogador = jogadoresSort[Math.round(Math.random() * (jogadoresSort.length - 1))];
            var index = jogadoresSort.indexOf(jogador);
            jogadoresSortResult.push(jogador);
            jogadoresSort.splice(index, 1);
        }
        for (i in jogadoresSortResult) {
            console.log(jogadoresSortResult[i].nome);
        }

        var quantidadeJogadores = 0;
        var numeroDoGrupo = 1;
        var nomeGrupo = "Grupo ";
        var grupoAOrganizar = {
            id: "",
            nome: nomeGrupo + numeroDoGrupo,
            campeonato: $scope.campeonato._id,
            participantes: new Array(), partidas: new Array()
        };
        var grupos = new Array();

        while (jogadoresSortResult.length) {
            if (quantidadeJogadores == $scope.campeonato.quantidadeGrupo) {
                $scope.criarPartidas(grupoAOrganizar);
                grupos.push(grupoAOrganizar);
                numeroDoGrupo = numeroDoGrupo + 1;
                grupoAOrganizar = {
                    id: "",
                    nome: nomeGrupo + numeroDoGrupo,
                    campeonato: $scope.campeonato._id,
                    participantes: new Array(),
                    partidas: new Array()
                };
                quantidadeJogadores = 0;
            }
            grupoAOrganizar.participantes.push(jogadoresSortResult[0])
            jogadoresSortResult.splice(0, 1);
            quantidadeJogadores = quantidadeJogadores + 1;
        }
        if (grupoAOrganizar.participantes.length != 4) {
            $scope.criarPartidas(grupoAOrganizar);
            grupos.push(grupoAOrganizar);
        }
        $scope.grupos = grupos;
    }

    $scope.criarPartidas = function (grupo) {
        var participantes = new Array().concat(grupo.participantes);
        var partidas = new Array()
        while (participantes.length) {
            var participante = participantes[0];
            for (i in participantes) {
                if (i == 0) {
                    continue;
                }
                partidas.push({ casa: participante, visitante: participantes[i], scoreCasa: 0, scoreVisitante: 0, partidaFinalizada: false });
                if ($scope.campeonato.idaVolta) {
                    partidas.push({ casa: participantes[i], visitante: participante, scoreCasa: 0, scoreVisitante: 0, partidaFinalizada: false });
                }
            }
            participantes.splice(0, 1);
        }
        grupo.partidas = partidas;
    };

    $scope.calcularPontuacao = function (grupos) {
        for (groupCount = 0; groupCount < grupos.length; groupCount++) {
            var grupo = grupos[groupCount];
            for (i in grupo.participantes) {
                var participante = grupo.participantes[i];
                participante.pontos = 0;
                for (count in grupo.partidas) {
                    var partida = grupo.partidas[count];
                    if (partida.casa.nome == participante.nome) {
                        if (Number(partida.scoreCasa) == 2 && Number(partida.scoreVisitante) == 0) {
                            participante.pontos = participante.pontos + 3;
                        } else if (Number(partida.scoreCasa) == 2 && Number(partida.scoreVisitante) == 1) {
                            participante.pontos = participante.pontos + 2;
                        } else if (Number() == 1) {
                            participante.pontos = participante.pontos + 1;
                        }
                    } else if (partida.visitante.nome == participante.nome) {
                        if (Number(partida.scoreVisitante) == 2 && Number(partida.scoreCasa) == 0) {
                            participante.pontos = participante.pontos + 3;
                        } else if (Number(partida.scoreVisitante) == 2 && Number(partida.scoreCasa) == 1) {
                            participante.pontos = participante.pontos + 2;
                        } else if (Number(partida.scoreVisitante) == 1) {
                            participante.pontos = participante.pontos + 1;
                        }
                    }
                }
            }
        }
    };

    $scope.salvarGrupos = function () {
        var request = Restangular.allUrl('Grupos',
            'http://192.168.1.21:8080/grupo');
        request.post([$scope.grupos, $scope.campeonato]);
    }

    $scope.atualizarGrupo = function (grupo) {
        var request = Restangular.allUrl('Grupos',
            'http://192.168.1.21:8080/grupoUpdate');
        request.post(grupo);
    }
    $scope.chaves = [];
});