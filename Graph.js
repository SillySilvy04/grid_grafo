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

    // Prints the vertex and adjacency list
    printGraph()
    {
        // get all the vertices
        var get_keys = this.adjList.keys();

        // iterate over the vertices
        for (var i of get_keys) 
    {
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.adjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
}