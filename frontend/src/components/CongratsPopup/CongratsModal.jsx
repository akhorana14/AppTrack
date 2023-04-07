import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CongratsModal.module.css';
import Firework from '../Firework/Firework';


function CongratsModal(props) {
    
    const [show, setShow] = React.useState(props.show);
    const handleClose = () => setShow(false);


    return (
    <>
        <Modal show={show} onHide={handleClose} style={{top: "18vh"}}>
            <Firework />
            <Modal.Header>
            <Modal.Title style={{textAlign: 'center', color: 'var(--apptrack-medium-pink)'}}>Congratulations on your offer!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
        
}

export default CongratsModal;