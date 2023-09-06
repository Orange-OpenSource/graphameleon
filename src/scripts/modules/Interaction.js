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

const md5 = require('md5') // Hash function MD5 (to generate node IDs)
import { getDomPath, getInteractiveElement, tokenizeUrl } from '../utils/tools'


function _def(value) {
    return (typeof value === 'undefined') ? null : value
}

// Event prefix of diffrent interactions
const event_pfx = {
    click: "clc",
    change: "chg",
    submit: "sub"
}

//Interaction Class
class Interaction {
    /*
    Collected data:

    - elem_id: id tag of the element (if given)
    - elem_value: value of elements such as checkbox, fields etc. (if given)
    - elem_path: computed element absolute DOM path
    - elem_tag: tag of the element (div, a, button, ul, etc.)
    - elem_name: name of the element (if given)
    - elem_label: label of the element (if given)
    - elem_href: linked url of the element (if given)
    - ua: user-agent used to identify the user
    - stime: start timestamp of the interaction 
    - etime: end timestamp of the interaction (considered equal to stime)
    - type: type of the interaction (here click, change, submit)
    - url: tokenized URL of the active ressource
    - url_id: MD5 generated ID from the URL (node IRI)
    - action_id: action generated ID based on the event type, the element and the active ressource URL.
    - previous: ID corresponding to the previous interaction
    - id: unique absolute ID of the interaction
    */
    constructor(event, elem) {
        this.elem_id     = _def(elem.id)
        this.elem_value  = _def(elem.value)
        this.elem_path   = getDomPath(elem)
        this.elem_tag    = _def(elem.localName)
        this.elem_name   = _def(elem.name)
        this.elem_label  = _def(elem.label)
        this.elem_href   = _def(elem.href)
        this.elem_src    = _def(elem.src)

        this.ua         = navigator.userAgent
        this.stime      = new Date(Date.now()).toISOString()
        this.etime      = this.stime
        this.type       = _def(event.type)
        this.url        = tokenizeUrl(_def(elem.baseURI))
        this.url_id     = md5(this.url).toUpperCase()

        this.action_id  = this.elem_id != "" ?
            event_pfx[this.type]+'-'+this.elem_id+this.url_id :
            event_pfx[this.type]+'-'+this.elem_path+this.url_id

        this.previous = null

        this.id = md5(this.ua+this.stime+this.action_id).toUpperCase()
    }
}


//Interaction Collector Class
export default class InteractionCollector {
    constructor() {
        // Event type captured
        this.events = [
            'click',
            'change',
            'submit'
        ]
        this.listener = this.onInteraction.bind(this)
        this.port = this.createConnection()
    }

    // Creates connection with background script
    createConnection() {
        const port = browser.runtime.connect() // New communication port
        port.onMessage.addListener(this.onMessage.bind(this)) // Add message listener
        return port
    }

    // Message handler
    onMessage(msg) {
        switch(msg.type) {
            case "activate":
                this.activate()
                break
            case "desactivate":
                this.desactivate()
                break
            default:
                break
        }
    }

    // Activate all type listeners
    activate() {
        for (const event of this.events) {
            this.setupListeners(event, document, true)
        }
    }

    // Desactivate all type listeners
    desactivate() {
        for (const event of this.events) {
            this.setupListeners(event, document, false)
        }
    }

    // Activate/desactivate listeners of all elements
    setupListeners(event, docu, activate) {
        if (activate) {
            docu.addEventListener(event, this.listener)
        } else {
            docu.removeEventListener(event, this.listener)
        }

        const iframes = docu.querySelectorAll('iframe');
        // If the document contains iframe, we need to recursively call the same function
        for (const iframe of iframes) {
            const iframe_docu = iframe.contentDocument
            if (iframe_docu != null) {
                this.setupListeners(event, iframe_docu, activate)
            }
        }
    }

    // Interaction handler
    onInteraction(event) {
        const elem = getInteractiveElement(event.target)
        // If there is an interactive element concerned
        if (elem) {
            // Collect interaction data and send it to the background script
            const i = new Interaction(event, elem)
            this.port.postMessage(i)
        }
    }
}
