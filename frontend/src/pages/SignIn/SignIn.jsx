import Navbar from "../../components/Navbar/Navbar"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import './SignIn.css';

function SignIn() {
    return (
        <div className="body">
            <Navbar />
            <div className="centersquare">
                <h1>Welcome to AppTrack</h1>
                <h2>You miss all the shots you don't take!</h2>
                <div className="google">
                    <GoogleOAuthProvider width="200px" clientId="350232392626-4lul15jckdjhqj2lkp4mphugoqbsvll7.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleLogin}
                            onError={handleFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
                <p>Sorry! For now, we only support Google Authentication. More coming soon!</p>
            </div>
        </div>
    );
};


const handleFailure = (result) => {
    alert(result);
};

const handleLogin = async (googleData) => {
    console.log(googleData);
};

export default SignIn;