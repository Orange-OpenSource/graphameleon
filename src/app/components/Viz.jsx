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

import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../App";
import ForceGraph3D from "react-force-graph-3d"; // Knowledge graph 3D vizualisation library (https://github.com/vasturiano/react-force-graph)
import SpriteText from 'three-spritetext';

export default function Visualizer() {
    const [session, _] = useContext(SessionContext);
    const [graph, setGraph] = useState({nodes: [], links: []})
    const [kill, setKill] = useState(false)

    useEffect(() => {
        session.port.onMessage.addListener((msg) => {
            if (msg.type == "graph") {
                setGraph({...msg.content})
            }
            if (msg.type == "revive") {
                setKill(false)
            }
        })
    }, [])

    const onKill = () => {
        session.port.postMessage({
            type: "kill"
        })
        setKill(true)
    }

    return (
        <div
            id="info-panel"
            className="d-flex flex-column align-items-center w-50 p-2"
            style={{
                overflow: "hidden",
                backgroundColor: "black"
            }}
        >
        { ((graph.nodes.length > 0 || graph.links.length > 0) && !kill) &&
            <ForceGraph3D
                graphData={graph}

                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}

                nodeAutoColorBy={node => node.val}
                nodeThreeObject={(node) => {
                    // If the node is a litteral
                    if (node.val === 0) {
                        // Replace sphere object by the text
                        const text = node.name.split("^^")[0].replaceAll('"',"")
                        const sprite = new SpriteText(text)
                        sprite.color = "white"
                        sprite.textHeight = 5
                        return sprite;
                    } else {
                        return false
                    }
                }}
                nodeLabel={node => {
                    return node.val === 0 ? "" : node.name
                }}

                height={window.innerHeight - 128}
                width={window.innerWidth/2}

                backgroundColor={"#000"}
            />
        }
        { ((graph.nodes.length > 0 || graph.links.length > 0) && !kill) && 
            <button
                id="kill-btn"
                className="btn btn-danger btn-sm mt-auto mb-2"
                onClick={onKill}
            >
                X
            </button>
        }
        </div>
    )
}