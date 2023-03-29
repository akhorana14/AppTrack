import Navbar2 from "../../components/Navbar/Navbar2"
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import styles from './SignIn.module.css';

function SignIn() {
    return (
        <div className={styles["signin"]}>
            <Navbar2 />
            <div className={styles.centersquare}>
                <h1>Welcome to AppTrack</h1>
                <h5>You miss all the shots you don't take!</h5>
                <div className={styles.google}>
                    <GoogleAuth />
                </div>
                <p className="text-muted">We only support Google Authentication at this time.</p>
            </div>
        </div>
    );
};

export default SignIn;
