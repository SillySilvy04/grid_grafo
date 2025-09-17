let graph = new Graph();
let endExist = false;
let beginExist = false;

function getId(i,j){
    return `${i},${j}`
}

function addGraphEdges(lines=6, columns=6) {
    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < columns; j++) {
            const v = document.getElementById(`${i},${j}`);

            // Se o próprio vértice estiver clicado, remove do grafo (não terá vértices nem arestas)
            if (v.classList.contains("button-clicked")) {
                graph.adjList.delete(v);
                continue;
            }

            // Vizinho abaixo
            if (i < lines - 1) {
                const vDown = document.getElementById(`${i+1},${j}`);
                if (!vDown.classList.contains("button-clicked")) {
                    graph.addEdge(v, vDown);
                }
            }

            // Vizinho à direita
            if (j < columns - 1) {
                const vRight = document.getElementById(`${i},${j+1}`);
                if (!vRight.classList.contains("button-clicked")) {
                    graph.addEdge(v, vRight);
                }
            }
        }
    }
}


 function buttonsColorChanging(event){
    const btn = event.target
    btn.classList = "";
    if(btn.value == "green"){
        btn.classList.add("button-clicked");
        btn.value = "red";
    }else if(btn.value == "red" && !endExist){
        btn.classList.add("button-end");
        btn.value = "black";
        endExist = true;
    }else if ((btn.value == "red" || btn.value == "black") && !beginExist){
        btn.value == "black" ? endExist = false : null;
        btn.classList.add("button-start");
        btn.value = "yellow";
        beginExist = true;
    }else if (btn.value == "red" || btn.value == "black" || btn.value == "yellow"){
        btn.value == "black" ? endExist = false : null;
        btn.value == "yellow" ? beginExist = false : null;
        btn.classList.add("button");
        btn.value = "green";
    }
}

function callBFS(){
    addGraphEdges();
    graph.printGraph()
    let resultado;
    for(let [vertex1,neighbor1] of graph.adjList){
        if(vertex1.value == "yellow"){
            for(let [vertex2,neighbor2] of graph.adjList){
                if(vertex2.value == "black"){
                    resultado = graph.bfsShortestPath(vertex1,vertex2);
                }
            }
        }
    }

    if(resultado && resultado.path){
        for(let btn of resultado.path){
            btn.classList = "";
            btn.value = "orange";
            btn.classList.add("button-path");
        }

        let cont = 1;
        for(let btn of resultado.visited){
            btn.textContent = cont.toString();
            cont++;
            if(btn.value !== "orange"){
                btn.classList = "";
                btn.value = "gray";
                btn.classList.add("button-visited");
            }
        }
    }
    
}

function createGrid(lines = 6, columns = 6){
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
    grid.style.gridTemplateRows = `repeat(${lines}, 50px)`;
    grid.style.gap = "5px";

    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < columns; j++) {
            const btn = document.createElement("button");
            btn.textContent = ""; 
            btn.id = getId(i,j);
            btn.style.width = "50px";
            btn.style.height = "50px";
            btn.addEventListener("click", buttonsColorChanging);
            btn.classList.add("button");
            btn.value = "green";
            
            graph.addVertex(btn);
            grid.appendChild(btn);
        }
    }
}

window.onload = () => createGrid();
