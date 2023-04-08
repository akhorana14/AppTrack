import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ActivateModal.module.css';


function CongratsModal() {

    function activate() {
        fetch(`${process.env.REACT_APP_BACKEND}/settings/activate`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                message: document.getElementById('reasonForDeactivation').value
            }),
            credentials: "include"
        }).then(response => response.json())
        .then(response => {
            window.location.href = "";
        });
        window.location = "/";
        console.log(document.getElementById('reasonForDeactivation').value);
    }

    let shouldshow = getAccountStatus().accountDeactivated;

    async function getAccountStatus() {
        let res = await fetch(`${process.env.REACT_APP_BACKEND}/settings/userstatus`, {
          credentials: "include"
        });
        if (res.ok) {
          return await res.json();
        }
      }
    
    const [show, setShow] = React.useState(shouldshow);

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

export default CongratsModal;