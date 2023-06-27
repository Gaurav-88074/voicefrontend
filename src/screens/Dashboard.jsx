import React from "react";
import "./Dashboard.css";
import { useEffect } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
const Dashboard = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    // useEffect(() => {
    //     console.log("data", transcript);
    // }, [transcript]);
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <>
            <header className="header"></header>
            <main>
                <section className="textSection">
                    {/* WTF */}
                    <p>{transcript}</p>
                </section>
                <section className="buttonSection">
                    <div style={{color:listening ? "#00e600" : "#ff3300"}}>
                        Microphone: {listening ? "ON" : "OFF"}
                    </div>
                    <button onClick={SpeechRecognition.startListening}>
                        Start
                    </button>
                    <button onClick={SpeechRecognition.stopListening}>
                        Stop
                    </button>
                    <button onClick={resetTranscript}>Reset</button>
                    
                </section>
            </main>
        </>
    );
};

export default Dashboard;
