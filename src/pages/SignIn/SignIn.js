import { Link } from "react-router-dom";

export function SignIn(props) {

    const handleGoogleLogin = async () => {
        const response = await fetch('/auth/google');
        if (response.ok) {
            const json = await response.json();
            window.location.href = json.url;
        } else {
            console.error("Couldn't fetch oAuth link");
        }
    }

    return (
        <>
            <Link to="#!" onClick={handleGoogleLogin}>Login with google</Link>
        </>
    );
}