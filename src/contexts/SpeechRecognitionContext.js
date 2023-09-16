const { createContext, useContext, useState, useEffect } = require("react");


const SpeechRecognitionContext = createContext();

export function useSpeechRecognition(){
    const context = useContext(SpeechRecognitionContext);
    if(!context){
        throw new Error('useSpeechRecognition must be used within a SpeechRecognitionProvider');
    }
    return context;
}

export function SpeechRecognitionProvider({children}){
    const [hasSRSupport, setHasSRSupport] = useState(false);
    const [recognition,setRecognition] = useState(null);

    useEffect(()=>{
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition;
        try{
            recognition = new SpeechRecognition();
            setHasSRSupport(true);
            setRecognition(recognition);
        }catch(error){
            setHasSRSupport(false);
        }

    },[]);

    const value = {
        hasSRSupport,
        setHasSRSupport,
        recognition,
    }
    return (
        <SpeechRecognitionContext.Provider value={value}>
            {children}
        </SpeechRecognitionContext.Provider>
    );
}