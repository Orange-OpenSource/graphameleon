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

// List of the most commons interactive HTML tags (provided by ChatGPT)
const interactiveTags = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    'label',
    'optgroup',
    'option',
    'fieldset',
    'legend',
    'form',
    'audio',
    'video',
    'area',
    'details',
    'summary',
    'menu',
    'datalist',
    'progress',
    'meter',
    'output',
    'canvas',
];

// Returns if the given element is a link
function isLink(el) {   
    return el.hasAttribute('href')
}

// Returns if the given element is interactive
function isInteractive(el) {
    return (isLink(el) || interactiveTags.includes(el.tagName.toLowerCase()))
}

// Returns the nearest interactive parent element in the DOM
export function getInteractiveElement(el) {
    var current_element = el
    var i = 0
    while (current_element.tagName != "HTML") {
        if (isInteractive(current_element)) {
            return current_element
        }
        current_element = current_element.parentNode
        i++
    }
}

// Returns the absolute DOM path (way to identify) associated to the given elements
// Exemple: body > maindiv[2] > div > div > a
export function getDomPath(el) {
    var stack = [];
    while ( el.parentNode != null ) {
        var sibCount = 0;
        var sibIndex = 0;

        for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
            var sib = el.parentNode.childNodes[i];
            if ( sib.nodeName == el.nodeName ) {
                if ( sib === el ) {
                    sibIndex = sibCount;
                }
                sibCount++;
            }
        }
        if ( sibCount > 1 ) {
            stack.unshift(el.nodeName.toLowerCase() + '[' + (sibIndex+1) + ']');
        } else {
            stack.unshift(el.nodeName.toLowerCase());
        }
        el = el.parentNode;
    }
    return stack.slice(1).join('>');
}

// Returns a tokenized URL (avoid parametered URLs to be different)
// Exemple: https://www.shop.com/?client_id=2313 -> https://www.shop.com/?client_id=[client_id]
export function tokenizeUrl(url) {
    if (!url) {
        return url
    }
    const [baseUrl, queryString] = url.split("?");
    if (!queryString) {
        return baseUrl;
    }
    const params = queryString.split("&");
    const filteredParams = params.map((param) => {
        const [name] = param.split("=");
        return name;
    });
    return `${baseUrl}?${filteredParams.join("&")}`;
}
