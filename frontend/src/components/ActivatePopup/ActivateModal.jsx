import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ActivateModal.module.css';


async function activate() {
    fetch(`${process.env.REACT_APP_BACKEND}/user/activate`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        }),
        credentials: "include"
    }).then(response => response.json())
    .then(response => {
        window.location.href = "";
    });
    window.location = "/";
}

function ActivateModal() {
    
    const [show, setShow] = React.useState(true);

    function handleCloseNo() {
        setShow(false);
        window.location = "/";
    }

    function handleCloseYes() {
        setShow(false);
        activate();
    }


    return (
    <>
        <Modal show={show} onHide={handleCloseNo} style={{top: "18vh"}}>
        <Modal.Header>
            <Modal.Title style={{textAlign: 'center', color: 'var(--apptrack-medium-pink)'}}>Do you want to reactivate your account?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseYes}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleCloseNo}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
        
}

export default ActivateModal;