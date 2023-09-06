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

import { browser_keys, browser_req_opts, browser_res_opts, filter } from '../utils/settings'
import { tokenizeUrl } from '../utils/tools'


function _def(value) {
    return (typeof value === 'undefined') ? null : value
}


// Request class
class Request {
    /*
    Request data:

    - ua: user-agent used to identify the user
    - type: always request
    - dest: Sec-Fetch-Dest
    - mode: Sec-Fetch-Mode
    - user: Sec-Fetch-User (if given, else it's a none user-initiated request)
    - site: Sec-Fetch-Site
    - url: tokenized URL of the requested ressource
    - host: domain hosting the requested ressource
    - ip: ip of the server hosting the requested ressource
    - stime: start timestamp of the interaction 
    - etime: end timestamp of the interaction (considered equal to stime)
    - type: type of the interaction (here click, change, submit)
    - action_id: action generated ID based on the ressource URL.
    - previous: ID corresponding to the previous interaction
    - id: unique absolute ID of the request
    */
    constructor(req) {
        var headers = this.parseHeaders(req["requestHeaders"])
        this.ua = navigator.userAgent
        this.type   = "request"
        this.dest   = _def(headers[browser_keys['dest']])
        this.mode   = _def(headers[browser_keys['mode']])
        this.user   = _def(headers[browser_keys['user']])
        this.site   = _def(headers[browser_keys['site']])
        this.url    = tokenizeUrl(_def(req[browser_keys['url']]))
        this.host   = new URL(this.url).hostname
        this.ip     = _def(req[browser_keys['ip']])
        this.stime  = new Date(req.timeStamp).toISOString()
        this.etime  = null

        this.action_id = ('req-'+this.url)
        this.previous = null

        this.id = md5(this.ua+this.stime+this.url).toUpperCase()
    }

    // Response handler
    onResponse(res) {
        this.ip     = res[browser_keys['ip']]
        this.etime  = new Date(res.timeStamp).toISOString()

        this.url_id = this.url ? md5(this.url).toUpperCase() : null
        this.ip_id = this.ip ? md5(this.ip).toUpperCase() : null
        this.host_id = this.host ? md5(this.host).toUpperCase() : null
    }

    parseHeaders(data) {
        const headers = {}
        for (const [index, header] of Object.entries(data)) {
            headers[header.name] = header.value
        }
        return headers
    }
}


//Request Collector Class
export default class RequestCollector {
    constructor(manager) {
        this.waiting = {}

        this.req_listener = this.onRequest.bind(this)
        this.res_listener = this.onResponse.bind(this)

        this.manager = manager
    }

    // Request handler
    onRequest(request) {
        const req = new Request(request)

        // Keep the request or not depending on the collection mode
        var keep = false
        switch (this.manager.params.collect) {
            case "micro":
                // Keep all requests
                keep = true
                break
            case "macro":
                // Keep user-initiated requests
                keep = (req.user == "?1")
                break
            case "hybrid":
                // Keep user-initated requests and script requests
                keep = (req.user == "?1") || (req.dest == "script")
                break
            default:
                break
        }

        if (keep) {
            this.waiting[request.requestId] = req // Add request to the "waiting for response" list
            this.manager.counters.request++ // Add to the counter
        }
    }

    // Response handler
    onResponse(response) {
        // Retrieve the initial request
        const req = this.waiting[response.requestId]
        if (_def(req)) {
            req.onResponse(response) // Add the remaining data from the response
            this.manager.counters.response++ // Add to the counter
            this.manager.onRequest(req)
        }
    }

    //Activate send request and response listeners
    activate() {
        // Request listener
        browser.webRequest.onBeforeSendHeaders.addListener(
            this.req_listener,
            filter,
            browser_req_opts
        )
        // Response listener 
        browser.webRequest.onCompleted.addListener(
            this.res_listener,
            filter,
            browser_res_opts
        )
    }

    //Desactivate send request and response listeners
    desactivate() {
        // Request listener
        browser.webRequest.onBeforeSendHeaders.removeListener(
            this.req_listener
        )
        // Response listener
        browser.webRequest.onCompleted.removeListener(
            this.res_listener
        )
    }
}
