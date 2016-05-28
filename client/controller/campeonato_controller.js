var tenisChampApp = angular.module('tenisChampApp', ['restangular']);

tenisChampApp.controller('CampeonatosController', function ($scope, Restangular) {

    $scope.selecionarCampeonato = function (campeonato) {
        $scope.campeonatoCadastro = campeonato;
    };

    $scope.salvarCampeonato = function () {

        var request = Restangular.oneUrl('Campeonatos',
            'http://192.168.1.21:8080/campeonato');
        request.put({
            id: $scope.campeonatoCadastro._id,
            nome: $scope.campeonatoCadastro.nome,
            quantidadeGrupo: $scope.campeonatoCadastro.quantidadeGrupo,
            idaVolta: $scope.campeonatoCadastro.idaVolta,
            classPorGrupo: $scope.campeonatoCadastro.classPorGrupo
        }).then(function (campeonato) {
            $scope.campeonatos.push(campeonato);
        });
        $scope.campeonatoCadastro = $scope.initializeCapeonato();

    };

    $scope.deletar = function () {
        var request = Restangular.oneUrl('Campeonatos',
            'http://192.168.1.21:8080/campeonato/').one($scope.campeonatoCadastro._id).remove();
        var index = $scope.campeonatos.indexOf($scope.campeonatoCadastro);
        $scope.campeonatos.splice(index, 1);
        $scope.campeonatoCadastro = $scope.initializeCapeonato();
    };

    $scope.campeonatos = [
        {}
    ];

    $scope.loadCampeonatos = function () {
        Restangular.allUrl('Campeonatos',
            'http://192.168.1.21:8080/campeonato').getList().then(function (campeonatosLista) {
                $scope.campeonatos = campeonatosLista;
            });
        $scope.campeonatoCadastro = $scope.initializeCapeonato();
    };

    $scope.initializeCapeonato = function () {
        $scope.campeonatoCadastro = { _id: null, nome: "", quantidadeGrupo: "", idaVolta: "false", classPorGrupo: "" };
    }

});