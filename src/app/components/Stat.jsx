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
import { useContext, useState, useEffect } from "react";

export default function StatSection() {
    const [session, setSession] = useContext(SessionContext)
    const [stats, setStats] = useState({
        interaction: 0,
        request: 0,
        response: 0,
        vertice: 0,
        edge: 0
    });

    useEffect(() => {
        session.port.onMessage.addListener((msg) => {
            if (msg.type == "update") {
                setStats(msg.content)
            }
        })
    }, [])

    useEffect(() => {
        session.export = (stats.interaction > 0 || stats.response > 0)
        setSession({...session})
    }, [stats])

    return (
        <div id="stats-section" className="d-flex flex-column gap-3 p-2 bg-white">
            <h3>Stats</h3>
            <table className="table table-sm m-0">
                <tbody>
                    <tr className="table-dark">
                        <th colSpan="2" scope="row">Collector</th>
                    </tr>
                    <tr>
                        <th scope="row">Requests</th>
                        <td id="nb-req" className="text-end">{stats.request}</td>
                    </tr>
                    <tr>
                        <th scope="row">Responses</th>
                        <td id="nb-res" className="text-end">{stats.response}</td>
                    </tr>
                    <tr>
                        <th scope="row">Interactions</th>
                        <td id="nb-req" className="text-end">{stats.interaction}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-sm m-0">
                <tbody>
                    <tr className="table-dark">
                        <th colSpan="2" scope="row">Graph</th>
                    </tr>
                    <tr>
                        <th scope="row">Vertices</th>
                        <td id="nb-vertices" className="text-end">{stats.vertice}</td>
                    </tr>
                    <tr>
                        <th scope="row">Edges</th>
                        <td id="nb-edges" className="text-end">{stats.edge}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
