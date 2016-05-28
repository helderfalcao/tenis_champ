function initChaves(classificados) {
    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center, // center Diagram contents
                "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 })
            });

    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
            { background: "#44CCFF" },
            $(go.Picture,
                { margin: 10, width: 50, height: 50, background: "red" },
                new go.Binding("source")),
            $(go.TextBlock, "Default Text",
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
        );

    var model = $(go.TreeModel);
    model.nodeDataArray =
        [
            { key: "1", name: "Don Meow", source: "cat1.png" },
            { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
            { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
            { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
            { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
            { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" },
            { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" },
            { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
        ];
    myDiagram.model = model;

    var classificados = [{ key: "1", name: "Don Meow", source: "cat1.png" },
        { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
        { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
        { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
        { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
        { key: "6", parent: "3", name: "Alonzo", source: "cat5.png" },
        { key: "7", parent: "3", name: "Alonzo", source: "cat5.png" },
        { key: "8", parent: "3", name: "Alonzo", source: "cat5.png" }];


    function chave(id, parent, casa, placarcasa, visitante, placarvisitante, subchaves, vencedor) {
        return {
            key: id,
            parent : parent,
            casa: { jogador: casa, placar: placarcasa },
            visitante: { jogador: visitante, placar: placarvisitante }, subchaves: subchaves, vencedor: vencedor
        };
    };

    /**Jogadores são recebidos como parâmetro e as chaves são sorteadas */
    function montarChavesIniciais(classificados) {
        var chavesIniciais = new Array();
        var quartas = new Array();
        var semis = new Array();
        var final = "";
        var id = 1;
        while (classificados.length) {
            var casa = classificados.pop();
            var visitante = classificados.pop();
            chavesIniciais.push(chave(id, "", casa, 0, visitante, 0));
            id++;
        }

        final = montarChaves(chavesIniciais, id);
        return final;
    };


    function montarChaves(chaves, id) {
        var result = chaves;
        if (chaves.length > 1) {
            var chaves_distribuir = new Array();
            chaves_distribuir = chaves_distribuir.concat(chaves);
            var chaves_montar = new Array();
            while (chaves_distribuir.length) {
                var idPai = id++;
                var subchavecasa = chaves_distribuir.pop();
                subchavecasa.parent = idPai;
                var subchavevisitante = chaves_distribuir.pop();
                subchavevisitante.parent = idPai;
                chaves_montar.push(chave(idPai,"", "", 0, "", 0, [subchavecasa, subchavevisitante]));
                result = montarChaves(chaves_montar, id);
            }

        }
        return result;
    };

    /*montaLinks("", montarChavesIniciais(classificados));*/

    /**New Chart */
    var list = new Array();
    montarModel(list, montarChavesIniciais(classificados));
    function montarModel(modelArray, chaves) {
        for(i in chaves){
            var chave = chaves[i];
            modelArray.push(chave);
            if(chave.subchaves){
                montarModel(modelArray,chave.subchaves);
            }
        }
    }
    model.nodeDataArray = list; 
    myDiagram.model = model;

}