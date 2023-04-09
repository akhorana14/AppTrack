import Navbar2 from "../../components/Navbar/Navbar2"
import ActivateModal from "../../components/ActivatePopup/ActivateModal"
import styles from './Activate.module.css';

function Activate() {
    return (
        <div className={styles["activatepage"]}>
            <Navbar2 />
            <ActivateModal />
        </div>
    );
};

export default Activate;
