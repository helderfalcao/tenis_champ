var tenisChampApp = angular.module('tenisChampApp', ['restangular']);

tenisChampApp.controller('JogadoresController', function ($scope, Restangular) {

  $scope.salvarJogador = function () {
    
    var request = Restangular.oneUrl('jogadores',
      'http://192.168.1.21:8080/jogador');
    request.put({
      nome: $scope.jogadorCadastro.nome,
      apelido: $scope.jogadorCadastro.apelido,
      email: $scope.jogadorCadastro.email,
      foto: $scope.jogadorCadastro.foto
    });
    $scope.initializeJogador();
    Restangular.allUrl('jogadores',
      'http://192.168.1.21:8080/jogador').getList().then(function (jogadoresLista) {
        $scope.jogadores = jogadoresLista;
      });;
  };

  $scope.jogadores = [
    {}
  ];

  $scope.loadJogadores = function () {
    Restangular.allUrl('jogadores',
      'http://192.168.1.21:8080/jogador').getList().then(function (jogadoresLista) {
        $scope.jogadores = jogadoresLista;
      });;
  };

  $scope.cadastroJogador = function (teste) {
    console.log(teste);
    console.log($scope.jogadorCadastro);
  },

    $scope.initializeJogador = function () {
      $scope.jogadorCadastro = { id: null, nome: "", apelido: "", email: "", foto: "" }
    }

});