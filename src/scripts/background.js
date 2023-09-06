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

console.log("Background script is running.")

/*
Background script:

- Running when the extension tab is active
- Communicates by message with the UI, content scripts
- Works as a communication hub to manage:
    1. User interactions with the extension
    2. Content scripts injected in all tabs
    3. Request collection
- Manage data gathering, semantical mapping and graph construction
*/

// IMPORTANT (cross-browser compatitbily)
const browser = require('webextension-polyfill') // Handle cross-browser API compatibility
import { current_browser } from './utils/settings' // Retrieve which browser is currently used

var browser_action = (current_browser == "firefox")
    ? browser.browserAction
    : browser.action

// Collect manager module
import CollectManager from './modules/Manager'
const manager = new CollectManager()

/*
Allows the extension to handle the browser action click event and either activate an existing extension tab,
or create a new one if none exists. It ensures that only one extension tab is active at a time.
*/
let extensionTabId = null;
browser_action.onClicked.addListener(async (tab) => { 
    if (extensionTabId) {
        try {
            // Extension tab already exists, focus on it
            const extensionTab = await browser.tabs.get(extensionTabId); 
            await browser.tabs.update(extensionTabId, { active: true });
            await browser.windows.update(extensionTab.windowId, { focused: true });
        } catch (error) {
            // Extension tab no longer exists, create a new one
            extensionTabId = null;
        }
    } else {
        // Create an extension tab
        const tab = await browser.tabs.create({
            url: browser.runtime.getURL("index.html"),
            active: true,
        });
        extensionTabId = tab.id;
    }
});

/*
IMPORTANT:

When launching the extension, content scripts need to be injected in already active tabs.
By default, injections are not triggered by chrome based browsers (chrome, edge, chromium...).
Thus, we manually need to inject those content scripts.
*/
if (current_browser == "chrome" || current_browser == "edge") {
    chrome.runtime.onInstalled.addListener(function() {
        // Get all tabs and inject content script into each tab
        chrome.tabs.query({}, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                //Execute content script
                chrome.scripting.executeScript({
                    target: {tabId: tabs[i].id},
                    files: ["content.js"]
                });
            }
        });
    });
}