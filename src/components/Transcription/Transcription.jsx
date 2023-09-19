import { useState } from 'react';
import './Transcription.css';
import { useSpeechRecognition } from '../../contexts/SpeechRecognitionContext';

export default function Transcription({ onResult, ariaLabel, onError, tabindex }) {
    const [transcribing, setTranscribing] = useState(false);
    const { recognition, hasSRSupport } = useSpeechRecognition();

    const transcribe = () =>{
        if(!hasSRSupport) return;
        if(transcribing){
            recognition.stop();
            setTranscribing(false);
        }
        recognition.onresult = e => {
            onResult(e.results[0][0].transcript);
        }
        recognition.onerror = (error) => {
            if(onError){
                onError(error);
            }else{
                console.error(error);
            }
        }
        recognition.onspeechend = () => {
            recognition.stop();
            setTranscribing(false);
        }
        if (!transcribing) {
            recognition.start();
            setTranscribing(true);
        }
    }

    return (
        <>
            {
                hasSRSupport &&
                <button 
                onClick={transcribe} 
                aria-label={ariaLabel || "start transcription"} 
                className={`mic ${transcribing ? 'off' : ''}`}
                tabIndex={tabindex || 1}
                >
                </button>
            }
        </>
    );
}