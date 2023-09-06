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

/*
Request headers key names can be different from one browser to another.
Thus, we manually translate every used key to a reference name for the extension.
*/
const firefox_keys = {
    id: "requestId",
    method: "method",
    origin: "originUrl",
    url: "url",
    host: "Host",
    ip: "ip",
    dest: "Sec-Fetch-Dest",
    site: "Sec-Fetch-Site",
    mode: "Sec-Fetch-Mode",
    user: "Sec-Fetch-User",
    start_time: "timeStamp",
    end_time: "timeStamp"
}
const chrome_keys = {
    id: "requestId",
    method: "method",
    origin: "initiator",
    url: "url",
    host: "Host",
    ip: "ip",
    dest: "Sec-Fetch-Dest",
    site: "Sec-Fetch-Site",
    mode: "Sec-Fetch-Mode",
    user: "Sec-Fetch-User",
    start_time: "timeStamp",
    end_time: "timeStamp"
}

// Listener options to retrieve request headers 
const firefox_req_opts = ["requestHeaders"] // For firefox
const chrome_req_opts = ["requestHeaders", "extraHeaders"] // For chrome based browsers

// Listener options to retrieve response headers
const firefox_res_opts = ["responseHeaders"] // For firefox
const chrome_res_opts = ["responseHeaders", "extraHeaders"] // For chrome based browsers

// Detects with browser is currently used
function detectBrowser(){         
    var userAgent = navigator.userAgent;
    return (userAgent.match(/chrome|chromium|crios/i) && !userAgent.match(/edg/i)) ? "chrome"
        : userAgent.match(/firefox|fxios/i) ? "firefox"
        : userAgent.match(/edg/i) ? "edge"
        : userAgent.match(/safari/i) ? "safari"
        : userAgent.match(/opr\//i) ? "opera"
        : "undefined"
}

const current_browser = detectBrowser()
console.log("Browser agent detected: ", current_browser)


// Handles every particularities of the different browsers
var filter = {urls: ['<all_urls>']}
var browser_keys
var browser_req_opts
var browser_res_opts

// Assigns the appropriate browser parameters
switch(current_browser) {
    case "firefox":
        browser_keys = firefox_keys
        browser_req_opts = firefox_req_opts
        browser_res_opts = firefox_res_opts
        break;
    case "chrome":
        browser_keys = chrome_keys
        browser_req_opts = chrome_req_opts
        browser_res_opts = chrome_res_opts
        break;
    case "edge":
        browser_keys = chrome_keys
        browser_req_opts = chrome_req_opts
        browser_res_opts = chrome_res_opts
        break;
    default:
        browser_keys = firefox_keys
        browser_req_opts = firefox_req_opts
        browser_res_opts = firefox_res_opts
        break;
}

// Exports the appropriate browser parameters
export {current_browser, browser_keys, browser_req_opts, browser_res_opts, filter}
