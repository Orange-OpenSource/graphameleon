/*
 * Copyright (c) 2022-2023 Orange. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *     1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     3. All advertising materials mentioning features or use of this software must display the following acknowledgement:
 *     This product includes software developed by Orange.
 *     4. Neither the name of Orange nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Orange "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Orange BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const rmlmapper = require('@comake/rmlmapper-js') // RML mapping library (https://github.com/rdfjs/N3.js)
const n3 = require('n3') // Knowledge graph parsing library (https://github.com/comake/rmlmapper-js)

import { micro, macro } from "../utils/mapping"
const UNUSED_PREFIXES = ['rr', 'rml', 'map'] // Unused namespace to remove

// Returns the list of prefixes used in a turtle file
function getPrefixes(text) {
    const prefixes = {}
    const pref_lines = text.split(/\r?\n/).filter(line => line.startsWith('@prefix'))
    for (var line of pref_lines) {
        var pref = line.match(/\s(.*):\s/)[1]
        var namespace = line.match(/\s<(.*)>/)[1]
        if (!UNUSED_PREFIXES.includes(pref)) {
            prefixes[pref] = namespace
        }
    }
    return prefixes;
}

// Vizualisation graph class
class Graph {
    constructor(prefixes) {
        this.data = {nodes: [], links: []} // Data format of react-force-graph

        this.nodes = {}
        this.groups = {}
        this.prefixes = prefixes
        this.literal_number = 0
        this.killed = false
    }

    // Appends format data from a given sub-graph
    append(trace) {
        if (this.killed) {
            return null
        }

        const parser = new n3.Parser() // Initalises N3 parser
        const quads = parser.parse(trace) // Get all quads

        for (const quad of quads) {
            const [sub, pred, obj] = [quad.subject.id, quad.predicate.id, quad.object.id]
            const isClass = (pred == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") // Defines if the obejct is a class
            const isLiteral = quad.object.datatypeString != undefined // Defines if the object is a literal

            if (!(sub in this.nodes) && isClass) {
                // If this is a new class
                if (!(obj in this.groups)) {
                    // Make a new class group
                    this.groups[obj] = Object.keys(this.groups).length+1
                }
                // Add the new node with its corresponding group (for better vizualisation)
                this.data.nodes.push({id: sub, name: sub, val: this.groups[obj]})
                this.nodes[sub] = []
            } else {
                // If this is not a class
                if (!this.nodes[sub].includes(pred) && !isClass) {
                    // If not already added
                    if (isLiteral) {
                        // If this is a literal
                        this.data.nodes.push({id: this.literal_number, name: obj, val: 0}) // Add the object node 
                        this.data.links.push({source: sub, target: this.literal_number}) // Add the link between subject and object
                        this.literal_number++
                        this.nodes[sub].push(pred)
                    } else {
                        // If not only add a link
                        this.data.links.push({source: sub, target: obj})
                    }
                }
            }
        }
    }

    // Stops the graph building (avoid lag caused by graph viz)
    kill() {
        this.reset()
        this.killed = true
    }

    // Restart the graph building
    revive() {
        this.killed = false
    }

    // Reset the graph
    reset() {
        this.data = {nodes: [], links: []}
        this.nodes = {}
        this.groups = {}
        this.literal_number = 0
    }
}


// Semantical mapper class
export default class Mapper {
    constructor(manager) {
        this.rules = micro // Default micro rules
        this.prefixes = getPrefixes(micro) // Default prefixes used
        this.graph = new Graph(this.prefixes) // Initiate the graph builder

        // Some RML mapper options
        this.options = { 
            toRDF: true,
            verbose: true,
            xmlPerformanceMode: false,
            replace: false
        }

        this.manager = manager

        console.log("Mapper has been initialised.")
    }

    // Maps collected data (RMLmapper)
    async map(data) {
        const graph = await rmlmapper.parseTurtle(this.rules, {"data.json": JSON.stringify(data)}, this.options)
        return graph
    }

    // Rewrite data in a given format
    format(graph, format) {
        var output
        const parser = new n3.Parser()
        const writer = new n3.Writer({
            format: format,
            prefixes: this.prefixes
        })
        const quads = parser.parse(graph)
        for (const quad of quads) {
            writer.addQuad(quad.subject, quad.predicate, quad.object)
        }
        writer.end(function (error, result) {
            output = result
        })
        return output
    }

    // Set rules according to the active mode selected
    setRules(rules) {
        switch(rules) {
            case "micro":
                // Default micro rules
                this.rules = micro
                break
            case "macro":
                // Default macro rules
                this.rules = macro
                break
            case "hybrid":
                // Default hybrid rules
                this.rules = macro // Same rules as macro
                break
            default:
                // User custom rules
                this.rules = rules
                break
        }
        this.prefixes = getPrefixes(this.rules) // Retreive prefixes used
        this.graph.prefixes = this.prefixes 
    }

    // Returns the number of vertices of a given graph (n3 format)
    getNumberVertices(graph) {
        const vertices = []
        const literals = []
        for(var line of graph.split('\n')) {
            const triple = line.split(' ')
            if (triple.length >=3) {
                vertices.push(triple[0])
                triple[2].startsWith('"') ? literals.push(triple[2]) : vertices.push(triple[2])
            }
        }
        const set = new Set(vertices)
        return set.size+literals.length
    }
    
    // Returns the number of edges of a given graph (n3 format)
    getNumberEdges(graph) {
        const triples = graph.split('\n')
        return triples.length
    }
}
