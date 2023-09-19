import Counter from "../components/Counter/Counter";
import SearchBar from "../components/SearchBar/SearchBar";
import Transcription from "../components/Transcription/Transcription";

export default function TestPage() {
    return (
        <div style={{marginTop:"50px"}}>
            <Counter />
        </div>);
    // return <SearchBar placeholder="Search our menu" />
    // return <Transcription ariaLabel="start transcription" />
}