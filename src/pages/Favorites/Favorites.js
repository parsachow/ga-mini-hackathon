
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Favorites(props){
    console.log(props)
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    console.log("This is the user saved in local storage:", user)

    // IF USER IS NOT IN LOCAL STORAGE, ASKED TO LOG IN INSTEAD
    if (user === null) {
        return (            
            <Link to="/login">Log in to favorite this recipe!</Link>
        );
    }
    // return ();

}