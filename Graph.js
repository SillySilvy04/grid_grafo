class Graph{
    constructor(){
        this.adjList = new Map();
    }

    addVertex(v) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, new Set());
        }
    }

    addEdge(v,w){
        this.addVertex(v);
        this.addVertex(w);
        this.adjList.get(v).add(w);
        this.adjList.get(w).add(v);
    }

    bfsShortestPath(start, end){
        if (!this.adjList.has(start) || !this.adjList.has(end)) {
            console.log("Vértice não encontrado no grafo!");
            return null;
        }

        let visited = new Set();      // guarda vértices já visitados
        let queue = [];               // fila de visita
        let parents = new Map();      // para reconstruir o caminho
        let visitedOrder = [];        // ordem de todos os vértices visitados

        queue.push(start);
        visited.add(start);
        parents.set(start, null);

        while(queue.length > 0){
            let vertex = queue.shift();
            visitedOrder.push(vertex);

            if(vertex === end){
                // reconstruir caminho do end até o start
                let path = [];
                let current = end;
                while(current !== null){
                    path.push(current);
                    current = parents.get(current);
                }
                path.reverse(); // inverter para ficar do start até o end
                return {
                    path: path,
                    visited: visitedOrder
                };
            }

            for(let neighbor of this.adjList.get(vertex)){
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    parents.set(neighbor, vertex);
                    queue.push(neighbor);
                }
            }
        }

        // se não encontrou caminho
        return {
            path: null,
            visited: visitedOrder
        };
    }

    dfs(start, end){
        if (!this.adjList.has(start) || !this.adjList.has(end)) {
            console.log("Vértice não encontrado no grafo!");
            return null;
        }

        let visited = new Set();      // guarda vértices já visitados
        let stack = [];               // fila de visita
        let parents = new Map();      // para reconstruir o caminho
        let visitedOrder = [];        // ordem de todos os vértices visitados

        stack.push(start);
        visited.add(start);
        parents.set(start, null);

        while(stack.length > 0){
            let vertex = stack.pop();
            visitedOrder.push(vertex);

            if(vertex === end){
                // reconstruir caminho do end até o start
                let path = [];
                let current = end;
                while(current !== null){
                    path.push(current);
                    current = parents.get(current);
                }
                path.reverse(); // inverter para ficar do start até o end
                return {
                    path: path,
                    visited: visitedOrder
                };
            }

            for(let neighbor of this.adjList.get(vertex)){
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    parents.set(neighbor, vertex);
                    stack.push(neighbor);
                }
            }
        }

        // se não encontrou caminho
        return {
            path: null,
            visited: visitedOrder
        };
    }

    printGraph() {
        // iterar sobre todos os vértices
        for (let [vertex, neighbors] of this.adjList) {
            let conc = "";

            // iterar sobre os vizinhos
            for (let neighbor of neighbors) {
                conc += neighbor.id + " "; // pega o ID do botão
            }

            console.log(vertex.id + " -> " + conc); // imprime o ID do vértice e IDs dos vizinhos
        }
    }
}