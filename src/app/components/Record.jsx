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
import { useContext, useState } from "react";

export default function RecordSection() {
    const [session, setSession] = useContext(SessionContext);
    const [isStop, setIsStop] = useState(true);
    const [isPause, setIsPause] = useState(false);

    const onClick = (e) => {
        var nextStopState = isStop
        var nextPauseState = isPause
        if (e.target.id == "record-btn") {
            nextStopState = !isStop
            setIsStop(nextStopState)
            if(nextStopState) {
                setIsPause(false)
            } else {
                session.port.postMessage({type: "reset"})
            }
        }
        if (e.target.id == "pause-btn") {
            nextPauseState = !isPause
            setIsPause(nextPauseState)
        }
        var nextMode = nextStopState ? "off"
            : nextPauseState ? "pause"
            : "on"
        session.state = nextMode
        setSession({...session})
        if (nextMode == "on") {
            session.port.postMessage({type: "activate"})
        } else {
            session.port.postMessage({type: "desactivate"})
        }
    }

    return (
        <div className="row gap-2 m-2 bg-white">
            <button
                id="record-btn"
                className="col btn btn-primary btn-sm"
                onClick={onClick}
            >
                {isStop ? "Record" : "Stop"}
            </button>
            <button
                id="pause-btn"
                className="col btn btn-primary btn-sm"
                onClick={onClick}
                disabled={isStop}
            >
                {isPause ? "Resume" : "Pause"}
            </button>
        </div>
    )
}
