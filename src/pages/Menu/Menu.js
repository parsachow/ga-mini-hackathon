import { useState, useEffect } from "react";
import './Menu.css';
import MenuItem from "../../components/MenuItem/MenuItem";
import sendRequest from "../../utilities/send-request";
import SearchBar from "../../components/SearchBar/SearchBar";

export function Menu() {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/menu`);
                if (response.ok) {
                    const json = await response.json()
                    setMenu(json);
                    setFilteredMenu(json);
                    console.log(json);
                } else {
                    console.error('Could not fetch menu')
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const search = text => {
        if (text) {
            const searchTerms = text.toLowerCase().trim().split(" ").filter(el => el);
            setFilteredMenu(menu.filter(item =>
                searchTerms.every(term =>
                    item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
                )
            ));
        }else{
            setFilteredMenu(menu);
        }
    }


    return (
        <div>
            <h1>Menu</h1>
            <div className="d-flex flex-ctr">
                <SearchBar 
                placeholder="search our menu"
                onChange={search} />
            </div>
            {filteredMenu && filteredMenu.map((item) => {
                return <MenuItem
                    itemName={item.name}
                    itemDescription={item.description}
                    itemImgUrl={item.imageUrl}
                    itemImgAlt={item.imageDescription}
                    itemPrice={item.price}
                    key={item._id}
                />
            })}
        </div>
    );
}
