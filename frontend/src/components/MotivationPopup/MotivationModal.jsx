import React from 'react';

// example from : https://getbootstrap.com/docs/5.0/components/modal/ (just want something to show up)
function MotivationModal() {
    return (
    <>
        <div id="toggleMyModal" className="modal" tabIndex="-1" style={{display: "block", top: "10vh"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <h1> This is the Modal but not really </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
        
}

export default MotivationModal;