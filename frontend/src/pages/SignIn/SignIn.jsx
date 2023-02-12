import Navbar from "../../components/Navbar/Navbar"
import GoogleLogin from 'react-google-login';
import './SignIn.css';

function SignIn() {
    return (
        <div className="body">
            <Navbar />
            <div className="centersquare">
                <h1>Welcome to AppTrack</h1>
                <h2>You miss all the shots you don't take!</h2>
                <div>
                <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log In with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
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
    
};

export default SignIn;