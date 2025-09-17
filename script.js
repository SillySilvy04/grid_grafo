let graph = new Graph();
let endExist = false;
let beginExist = false;

function getId(i,j){
    return `${i},${j}`
}

function addGraphEdges(lines,columns){
    for(let i = 0; i < lines; i++){
        for(let j = 0; j < columns; j++){
            const v = document.getElementById(`${i},${j}`);
            if(i < lines - 1){
                const vDown = document.getElementById(`${i+1},${j}`);
                if(!vDown.classList.contains("button-clicked")){
                    graph.addEdge(v,vDown);
                }
            }
            if(j < columns - 1){
                const vRight = document.getElementById(`${i},${j+1}`);
                if(!vRight.classList.contains("button-clicked")){
                    graph.addEdge(v,vRight);
                }

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
            btn.classList.add("button");
            btn.value = "green";
            graph.addVertex(btn);

            btn.addEventListener("click", () => {
                btn.classList = "";
                if(btn.value = "green"){
                    btn.classList.add("button-clicked");
                }
            });

            grid.appendChild(btn);
        }
    }
    addGraphEdges(lines,columns);
}

window.onload = () => createGrid();
