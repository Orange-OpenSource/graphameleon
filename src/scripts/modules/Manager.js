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

// IMPORTANT (cross-browser compatitbily)
const browser = require('webextension-polyfill') // Handle cross-browser API compatibility

const Papa = require('papaparse')

import RequestCollector from './Request'
import Mapper from './Mapper'

// Collect manager class
export default class CollectManager {
    constructor() {
        // Intializes the collector state
        this.is_running = false

        // Initializes traces and counters
        this.mapped = ""
        this.traces = {
            request : [],
            interaction : []
        }
        this.counters = {
            interaction: 0,
            request: 0,
            response: 0,
            vertice: 0,
            edge: 0
        }
        this.previous = null

        // Initializes collection parameters
        this.params = {}

        // Initializes request collector
        this.request_collector = new RequestCollector(this)

        // Initializes mapper
        this.mapper = new Mapper(this)

        // Initializes connection with ui and interaction collectors
        this.uiid = null
        this.con = {}
        browser.runtime.onConnect.addListener(this.onConnect.bind(this))
    }

    // Connection handler
    onConnect(port) {
        (port.name == "ui")
            ? this.onUiConnect(port)
            : this.onInteractionConnect(port)
    }

    // UI connection handler
    onUiConnect(port) {
        const id = port.sender.tab.id
        const name = "ui"
        this.uiid = id
        this.con[id] = {
            name: name,
            port: port
        }
        port.onMessage.addListener(this.onMessage.bind(this))
        port.onDisconnect.addListener(this.onDisconnect.bind(this))

        console.log("Connection to port: ", name)
    }

    // Interaction script connection handler 
    onInteractionConnect(port) {
        const id = port.sender.tab.id
        const name = "content"+id
        this.con[id] = {
            name: name,
            port: port
        }
        port.onMessage.addListener(this.onInteraction.bind(this))
        port.onDisconnect.addListener(this.onDisconnect.bind(this))

        // If running under macro or hybrid mode, send an activate message
        if (this.is_running &&
            (this.params.collect == "macro" || this.params.collect == "hybrid")) {
            port.postMessage({type: "activate"})
        }

        console.log("Connection to port: ", name)
    }

    // Disconnection handler
    onDisconnect(port) {
        const id = port.sender.tab.id
        console.log("Deconnection port: ", this.con[id].name)

        // Removes port form the list of interaction script connections
        delete this.con[id]

        // If UI port disconnects
        if (id == this.uiid) {
            this.uiid = null
        }
    }

    // Request handler
    onRequest(r) {
        delete r['<prototype>']
        // If there was a prevous action
        if (this.previous) {
            // Add it to the current
            r.previous = this.previous
        }
        // Current action become the previous
        this.previous = r.id

        if (this.params.mode == "raw") {
            this.traces.request.push({...r}) // Add collected data as a request
            this.update()
        } else {
            // Maps data...
            this.mapper.map({request: [r]}).then((res) => {
                this.mapped += res  // ... then, appends it to whole graph
                this.mapper.graph.append(res) // ... to the graph viz builder
                this.counters.vertice = this.mapper.getNumberVertices(this.mapped) // ... updates the total number of vertices
                this.counters.edge = this.mapper.getNumberEdges(this.mapped) // ... updates the total number of edges
                this.update() // ... sends the updated stats to UI
                this.updateGraph() // ... sends the updated graph viz builder data
            })
        }
    }

    // Interaction handler
    onInteraction(i) {
        delete i['<prototype>']
        // If there was a prevous action
        if (this.previous) {
            // Add it to the current
            i.previous = this.previous
        }
        // Current action become the previous
        this.previous = i.id
        this.counters.interaction++

        if (this.params.mode == "raw") {
            this.traces.interaction.push({...i}) // Add collected data as an interaction
            this.update()
        } else {
            // Maps data...
            this.mapper.map({interaction: [i]}).then((res) => {
                this.mapped += res // ... then, appends it to whole graph
                this.mapper.graph.append(res) // ... to the graph viz builder
                this.counters.vertice = this.mapper.getNumberVertices(this.mapped) // ... updates the total number of vertices
                this.counters.edge = this.mapper.getNumberEdges(this.mapped) // ... updates the total number of edges
                this.update() // ... sends the updated stats to UI
                this.updateGraph() // ... sends the updated graph viz builder data
            })
        }
    }

    // Message handler
    onMessage(msg) {
        switch (msg.type) {
            case "parameters":
                console.log("Parameters message received.")
                this.params = msg.content // Sets chosen parameters
                break
            case "mapping":
                console.log("Mapping message received.")
                this.mapper.setRules(msg.content) // Sets chosen custom rules
                break
            case "activate":
                console.log("Activate message received.")
                this.is_running = true
                this.activate() // Activates data collection
                break
            case "desactivate":
                console.log("Desactivate message received.")
                this.is_running = false
                this.desactivate()  // Desactivates data collection
                break
            case "export":
                console.log("Export message received.")
                this.export()  // Exports collected data
                this.reset()
                this.update()
                this.updateGraph()
                break
            case "reset":
                console.log("Reset message received.")
                this.reset() // Reset collected data and all collectors
                this.update()
                this.updateGraph()
                break
            case "kill":
                console.log("Kill graph message received.")
                this.mapper.graph.kill() // Kill the graph viz builder (avoid lag)
                break
            default:
                console.log("Unknown message received: ", msg.type);
                break
        }
    }

    // Activate collectors (depending on the mode)
    activate() {
        this.request_collector.activate()
        
        if (this.params.collect == "macro" || this.params.collect == "hybrid") {
            // Send activation messages to all injected content scripts
            for (const [_, con] of Object.entries(this.con)) {
                if (con.name != "ui") {
                    con.port.postMessage({type: "activate"})
                }
            }
        }

        if (this.mapper.graph.killed) {
            this.mapper.graph.revive()
            this.con[this.uiid].port.postMessage({type: "revive"})
        }
    }

    // Desactivate collectors (depending on the mode)
    desactivate() {
        this.request_collector.desactivate()
        
        if (this.params.collect == "macro" || this.params.collect == "hybrid") {
            // Send desactivation messages to all injected content scripts
            for (const [_, con] of Object.entries(this.con)) {
                if (con.name != "ui") {
                    con.port.postMessage({type: "desactivate"})
                }
            }
        }
    }

    // Send the updated stats
    update() {
        this.con[this.uiid].port.postMessage({
            type: "update",
            content: this.counters
        })
    }

    // Send the updated graph viz builder data
    updateGraph() {
        this.con[this.uiid].port.postMessage({
            type: "graph",
            content: this.mapper.graph.data
        })
    }

    // Build an export of the collected data in a given format
    export() {
        switch(this.params.format) {
            case "n3":
                // No formatting required
                this.download(this.mapped, this.params.format)
                break;
            case "ttl":
                // Turtle formatting
                const formatted = this.mapper.format(this.mapped, this.params.format)
                this.download(formatted, this.params.format)
                break;
            case "json":
                // No formatting required
                this.download(JSON.stringify(this.traces), this.params.format)
                break
            case "csv":
                // CSV formatting
                this.download(Papa.unparse(JSON.stringify(this.traces)), this.params.format)
                break;
        }
    }

    // Download collected data in a given format
    download(res, format) {
        const url = URL.createObjectURL
            ? URL.createObjectURL(new Blob([res], { type: "data:text"+format }))
            : "data:text/"+format+";charset=utf-8," + encodeURIComponent(res);

        const filename = "GPL_"+Date.now()+"."+format;

        browser.downloads.download({
            url: url,
            filename: filename,
        })
        .then(() => console.log("Export (."+format+")"))
        .catch((error) => console.log("Error on export: ", error));
    }

    // Reset all records
    reset() {
        // Initialize traces and counters
        this.mapped = ""
        this.traces = {
            request : [],
            interaction : []
        }
        this.counters = {
            interaction: 0,
            request: 0,
            response: 0,
            vertice: 0,
            edge: 0
        }
        this.previous = null
        this.mapper.graph.reset()
    }
}
