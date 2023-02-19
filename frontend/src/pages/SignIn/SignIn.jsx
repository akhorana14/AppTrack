import Navbar from "../../components/Navbar/Navbar"
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import './SignIn.css';

function SignIn() {
    return (
        <div className="body">
            <Navbar />
            <div className="centersquare">
                <h1>Welcome to AppTrack</h1>
                <h2>You miss all the shots you don't take!</h2>
                <div className="google">
                    <GoogleAuth />
                </div>
                <p>Sorry! For now, we only support Google Authentication. More coming soon!</p>
            </div>
        </div>
    );
};

export default SignIn;
