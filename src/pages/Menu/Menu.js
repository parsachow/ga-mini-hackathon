import { useState, useEffect } from "react";
import './Menu.css'
import { Link } from 'react-router-dom';
import { useSpeechRecognition } from "../../contexts/SpeechRecognitionContext";
import MenuItem from "../../components/MenuItem/MenuItem";

export function Menu(props) {
    const [appetizers, setAppetizers] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const BASE_URL = "http://localhost:4000/menu";
    const { hasSRSupport, recognition } = useSpeechRecognition();
    const [transcribing, setTranscribing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const getMenuData = async () => {
            try {
                const response = await fetch(BASE_URL)

                if (response.ok) {
                    const res = (await response.json());
                    setMenu(res);
                    const allAppetizers = res.filter((i) => i.foodCategory === 'appetizer' ? i : null)
                    const allEntrees = res.filter((i) => i.foodCategory === 'entree' ? i : null)
                    const allDesserts = res.filter((i) => i.foodCategory === 'dessert' ? i : null)
                    console.log(allAppetizers)
                    console.log(allEntrees)
                    console.log(allDesserts)
                    setAppetizers([...allAppetizers])
                    setEntrees([...allEntrees])
                    setDesserts([...allDesserts])
                }
            } catch (err) {
                console.log(err)
            }
        };
        getMenuData()
    }, []);

    const transcribe = evt => {
        if (!hasSRSupport) return;
        if (transcribing) {
            recognition.stop();
            console.log('stopping transcription');
            setTranscribing(false);
        }

        recognition.onstart = () => {
            console.log('Audio transcription started');
        }
        recognition.onresult = e => {
            console.log(`You said ${e.results[0][0].transcript}`);
            setSearchText(e.results[0][0].transcript);
        }
        recognition.onerror = (error) => {
            console.error(error);
        }
        recognition.onspeechend = () => {
            console.log('Audio transcription stopped');
            recognition.stop();
            setTranscribing(false);
        }
        if (!transcribing) {
            recognition.start();
            setTranscribing(true);
        }

    }

    const onChangeSearchText = e => {
        setSearchText(e.target.value);
    }
    return (
        <div className="home">

            <div className='search-container'>
                <div>
                    <input type="search" 
                        className='searchbar' 
                        name="searchbar" 
                        placeholder="Search our menu..."
                        value={searchText}
                        onChange={onChangeSearchText}
                    />
                </div>

                {hasSRSupport && <div>

                    <button className="microphone" onClick={transcribe}>{!transcribing ? <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-mic" className="bi bi-mic-fill" viewBox="0 0 16 16"><title id="title-mic">Microphone - Start Transcription</title> <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" /> <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" /> </svg> : <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-stop" className="bi bi-mic-fill" viewBox="0 0 16 16">
                        <title id="title-stop">Microphone - Stop Transcription</title>
                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                        <line x1="0" y1="0" x2="16" y2="16" stroke="black" stroke-width="1" />
                    </svg>
                    } </button>
                </div>}

            </div>
            <h1 className="eachMenu">Menu</h1>
            {menu.map(item =>
                <MenuItem 
                itemName={item.name} 
                itemDescription={item.description} 
                itemPrice={item.price} 
                itemImgUrl={item.imageUrl}
                itemImgAlt={item.imageDescription}
                showFavIcon={true}
                btnText="Add"
                />
            )}
            {/* <div className="eachMenu">
                <h2>Appetizers</h2>
                {appetizers && appetizers.map((meal) => (
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription} />
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount ? (
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price * meal.discount)).toFixed(2)}</span>
                                    </>) : (<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h2>Entrees</h2>
                {entrees && entrees.map((meal) => (
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription} />
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount ? (
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price * meal.discount)).toFixed(2)}</span>
                                    </>) : (<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h2>Desserts</h2>
                {desserts && desserts.map((meal) => (
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription} />
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount ? (
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price * meal.discount)).toFixed(2)}</span>
                                    </>) : (<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div> */}
        </div>
    )
}
