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

export default function ExportSection() {
    const [session, setSession] = useContext(SessionContext);

    const onExport = () => {
        session.port.postMessage({type: "export"});
        session.export = false
        setSession({...session})
    };

    const onChange = (e) => {
        session.params.format = e.target.value
        session.port.postMessage({
            type: "parameters",
            content: session.params
        })
        setSession({...session})
    }

    return (
        <fieldset disabled={session.state != "off" || !session.export} className="d-flex flex-column justify-content-end p-2 w-100 bg-white me-auto">
            <h3 className="mb-3">Export</h3>
            <p>Select a file export format.</p>
            {session.params.mode == "raw" &&
            <select
                id="format-sel"
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                onChange={onChange}
                value={session.format}
            >
                <option value="json">.json</option>
                <option value="csv">.csv</option>
            </select>
            }
            {session.params.mode == "sem" &&
            <select
                id="format-sel"
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                onChange={onChange}
                value={session.format}
            >
                <option value="n3">.n3</option>
                <option value="ttl">.ttl</option>
            </select>
            }
            <button
                className="btn btn-primary btn-sm"
                onClick={onExport}
                disabled={session.format == "default"}
            >
                Export
            </button>
        </fieldset>
    )
}
