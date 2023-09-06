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

const browser = require('webextension-polyfill')

import Header from "./components/Header";
import StatSection from "./components/Stat";
import Visualizer from "./components/Viz";
import ExportSection from "./components/Export";
import ParamSection from "./components/Parameters";
import RecordSection from "./components/Record";
import {createContext, useState} from "react";

export const SessionContext = createContext(null);

const DEFAULT_PARAMS = {
    collect: "micro",
    mode: "raw",
    flow: "local",
    format: "json"
}

const port = browser.runtime.connect({
    name: "ui",
})

port.postMessage({
    type: "parameters",
    content: {...DEFAULT_PARAMS}
})

function App() {
    const [session, setSession]= useState({
        state: "off",
        port: port,
        params: DEFAULT_PARAMS,
        export: false
    })

    return (
        <div>
            <SessionContext.Provider value={[session, setSession]}>
                <Header />
                <div id="main-panel" className="d-flex justify-content-between mx-0">
                    <div id="control-panel" className="d-flex justify-content-between gap-4 flex-column p-2 w-25">
                        <ParamSection />
                        <RecordSection />
                    </div>
                    <Visualizer />
                    <div className="d-flex flex-column justify-content-between gap-4 p-2 w-25">
                        <StatSection />
                        <ExportSection />
                    </div>
                </div>
            </SessionContext.Provider>
        </div>
    )
};

export default App;
