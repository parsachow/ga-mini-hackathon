
import './SignIn.css'
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
        <div class='signin-layout'>
            <div ><button className="loginButton" onClick={handleGoogleLogin} >Login with google</button></div>
        </div>
    );
}