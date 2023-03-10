import Button from 'react-bootstrap/esm/Button';
import {Google} from 'react-bootstrap-icons';

function GoogleButton(props) {
    return (
        <Button variant="dark" href={process.env.REACT_APP_BACKEND + "/gauth"} className="mt-3 mb-3 p-1 d-flex align-items-center">
            <Google className="pe-1" size={24} />Login With Google
        </Button>
    )
}

export default GoogleButton;
