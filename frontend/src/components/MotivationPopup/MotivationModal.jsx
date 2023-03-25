import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './MotivationModal.module.css';

// example from : https://getbootstrap.com/docs/5.0/components/modal/ 

let motivationalMessages = ["\"Success is not final; failure is not fatal: It is the courage to continue that counts.\" — Winston S. Churchill",
                            "\"The road to success and the road to failure are almost exactly the same.\" — Colin R. Davis",
                            "\"Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.\" —John Wooden",
                            "\"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.\" — Winston Churchill",
                            "\"Goal setting is the secret to a compelling future.\" — Tony Robbins",
                            "\"Either you run the day or the day runs you.\" — Jim Rohn",
                            "\"I'm a greater believer in luck, and I find the harder I work the more I have of it.\" — Thomas Jefferson",
                            "\"Work until your bank account looks like a phone number.\" — Unknown"];

let showModal = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function MotivationModal() {
    
    let index = getRandomInt(8);
    const [show, setShow] = React.useState(true);
    const handleClose = () => setShow(false);


    return (
    <>
        <Modal show={show} onHide={handleClose} style={{top: "18vh"}}>
            <Modal.Header>
            <Modal.Title style={{textAlign: 'center', color: 'var(--apptrack-medium-pink)'}}>{motivationalMessages[index]}</Modal.Title>
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

export default MotivationModal;