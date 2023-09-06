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

import { SessionContext } from "../App";
import { useContext } from "react";

const sm_style = {
    minHeight: "1.875rem",
    padding: ".25rem .625rem calc(.25rem + 1px)",
    fontSize: ".875rem"
}

export default function ParamSection() {
    const [session, setSession] = useContext(SessionContext);

    const onCollectChange = (e) => {
        session.params.collect = e.target.value
        setSession({...session})
        session.port.postMessage({
            type: "parameters",
            content: session.params
        })
        session.port.postMessage({
            type: "mapping",
            content: e.target.value
        })
    }

    const onModeChange = (e) => {
        session.params.mode = e.target.value
        session.params.format = (session.params.mode == "raw") ? "json" : "n3"
        setSession({...session})
        session.port.postMessage({
            type: "parameters",
            content: session.params
        })
    }

    const onDrop = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function(e) {
            session.port.postMessage({
                type: "mapping",
                content: e.target.result
            })
        });
        reader.readAsText(file)
    }

    return (
        <form>
            <fieldset disabled={session.state != "off"} className="d-flex flex-column gap-3 p-2 bg-white mb-3">
                <h3>Parameters</h3>
                <div className="btn-group d-flex flex-column">
                    <p>Select a collect mode.</p>
                    <div className="btn-group" role="group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="collect-options"
                            id="micro-opt"
                            autoComplete="off"
                            value="micro"
                            defaultChecked
                            onChange={onCollectChange}
                        ></input>
                        <label className="btn btn-secondary" htmlFor="micro-opt" style={sm_style}>Micro</label>
                        <input
                            type="radio"
                            className="btn-check"
                            name="collect-options"
                            id="macro-opt"
                            value="macro"
                            autoComplete="off"
                            onChange={onCollectChange}
                        ></input>
                        <label className="btn btn-secondary sm-style" htmlFor="macro-opt" style={sm_style}>Macro</label>
                        <input
                            type="radio"
                            className="btn-check"
                            name="collect-options"
                            id="hybrid-opt"
                            value="hybrid"
                            autoComplete="off"
                            onChange={onCollectChange}
                        ></input>
                        <label className="btn btn-secondary sm-style" htmlFor="hybrid-opt" style={sm_style}>Hybrid</label>
                    </div>
                </div>
                <div className="btn-group d-flex flex-column">
                    <p>Select an general output format.</p>
                    <div className="btn-group mb-2" role="group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="data-type-options"
                            id="raw-opt"
                            autoComplete="off"
                            value="raw"
                            defaultChecked
                            onChange={onModeChange}
                        ></input>
                        <label className="btn btn-secondary" htmlFor="raw-opt" style={sm_style}>Raw</label>
                        <input
                            type="radio"
                            className="btn-check"
                            name="data-type-options"
                            id="sem-opt"
                            value="sem"
                            autoComplete="off"
                            onChange={onModeChange}
                        ></input>
                        <label className="btn btn-secondary sm-style" htmlFor="sem-opt" style={sm_style}>Semantize</label>
                    </div>
                    <div>
                        <input
                        key={session.params.collect}
                        className={"form-control form-control-sm d-inline-block"}
                        id="formFileSm"
                        type="file"
                        disabled={session.params.mode == 'raw'}
                        onChange={onDrop}
                        >
                        </input>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}
