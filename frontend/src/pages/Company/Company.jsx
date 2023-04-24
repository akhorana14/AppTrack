import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"
import styles from './Company.module.css';
import CongratsModal from '../../components/CongratsPopup/CongratsModal';

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import { BellFill, CheckCircleFill, EnvelopeFill, ExclamationCircleFill } from 'react-bootstrap-icons';

//This order was taken very carefully from backend/models/Classification.ts
//Make sure to keep it in this order to avoid mixing up labels
let classifications = [
    "Applied",
    "OA",
    "Interview",
    "Offer",
    "Reject",
    "Other"
];

function Company() {
    const [errorMsg, setErrorMsg] = useState("* indicates required fields");
    const [actionItem, setActionItem] = useState("Manually Add a Status");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    function handleActionItemSubmit(company) {
        console.log({
            actionItem: actionItem,
            description: description,
            date: date
        });

        console.log("Adding " + company + ", " + actionItem);
        fetch(`${process.env.REACT_APP_BACKEND}/company/${company}/addStatus`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyName: company,
                status: actionItem,
                description: description,
                date: date
            }),
            credentials: "include"
        }).then(response => response.json())
            .then(response => {
                window.location.href = "";
            });
    }

    function updateActionItem(e) {
        setActionItem(e.target.value);
    }

    function updateDescription(e) {
        setDescription(e.target.value);
    }

    function updateDate(e) {
        setDate(e.target.value);
    }

    function handleClear() {
        setActionItem("");
        setDescription("");
        setDate("");
    }

    let { company: companyName } = useParams();
    const [events, setEvents] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    
    useEffect(() => {
        getCompanyInfo();
        getEvents();
    }, []);

    async function getEvents() {
        let res = await fetch(`${process.env.REACT_APP_BACKEND}/company/${companyName}`, {
            credentials: "include"
        });
        if (res.ok) {
            setEvents(await res.json());
        }
    }

    function showCongrats() {
        let offer = false;
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            console.log(event.classification);
            if (event.classification === 3 && event.isRead === false) {
                offer = true;
            }
        }
        if (offer) {
            handleOfferRead(companyName);
        }
        return offer;
    }

    async function getCompanyInfo() {
        let res = await fetch(`${process.env.REACT_APP_BACKEND}/company/${companyName}/info`, {
            credentials: "include"
        });
        if (res.ok) {
            var company = await res.json();
            console.log(company);
            setCompanyInfo(company);
        } else {
            window.location.href = "/dashboard";
        }
    }
    companyName = capitalizeFirstLetter(companyName);
    //Conditional render based on if events variable has been populated with api response or not
    return (!events || !companyInfo) ? null : (
        <>
            <Header title={`Your Application @ ${companyName}`} />
            <Navbar />
            <CongratsModal show={showCongrats}/>
            <div className={styles["main-content"]}>
                <Container fluid className="h-100">
                    <Row className="justify-content-center h-100">
                        <Col className={styles["left-half"]}>
                            <h1 className="display-3 font-weight-normal mb-0">{`${companyName}`}</h1>
                            {
                                companyInfo.track ? 
                                <h3>{companyInfo.position !== undefined && companyInfo.position ? companyInfo.position:"Unknown Position Title"}
                                <br />
                                <h6 className="text-muted my-1">Last update: {events.length === 0 ? "None" : new Date(events[events.length - 1].date).toLocaleString()}</h6>
                                </h3>
                                : null
                            } 
                            <div className="mt-1 d-flex align-items-center">
                                {
                                    companyInfo.track 
                                    ? <>
                                    <LevelsButton link={companyInfo.levelsLink} />
                                    <LeetcodeButton link={companyInfo.leetcodeLink} />
                                    </>
                                    : null
                                }
                                {
                                    companyInfo.track 
                                    ? <UntrackButton company={companyName} />
                                    : <TrackButton company={companyName} />
                                }   
                            </div>
                            {
                                companyInfo.track ? <StageList list={events.filter(item => item.isActionItem === true)} />
                                : null
                            }
                            {
                                companyInfo.track ? 
                                <div className="mt-5">
                                    <h3>Add an action item
                                        <br />
                                        <h6 className="text-muted">Manually keep track of untracked updates</h6>
                                    </h3>
                                    <form>
                                        <div className="form-group mt-2">
                                            <select className={styles["manual-status-select"]} onChange={updateActionItem}>
                                                <option>Manually Add a Status</option>
                                                <option>Applied</option>
                                                <option>Online Assessment</option>
                                                <option>Interview</option>
                                                <option>Offer</option>
                                                <option>Reject</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="description">Description *</label>
                                            <textarea className="form-control no-resize" rows="3" onChange={updateDescription} placeholder="Enter description" value={description}></textarea>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="description">Date *</label>
                                            <input className="form-control" placeholder="Enter date" onChange={updateDate} value={date} />
                                            <small className="form-text text-muted">Enter the date in MM/DD/YYYY format</small>
                                        </div>

                                        <button type="button" className="btn btn-primary blue-button mt-3" onClick={handleClear}>Clear</button>
                                        <button type="button" className="btn btn-success green-button mt-3" onClick={() => handleActionItemSubmit(companyName)}>Submit</button>
                                        <span className="create-app-error-msg">{errorMsg}</span>
                                    </form>
                                </div>
                                : null
                            }
                            
                        </Col>
                        <Col className={styles["right-half"]}>
                            {
                                companyInfo.track ? <ActionItems items={events.filter(item => item.isActionItem === true)} />
                                : null
                            }
                            {
                                companyInfo.track ? <EmailHistory emails={events} />
                                : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

function ActionItems(props) {
    let title = (
        <div className="d-flex align-items-center pb-2">
            <BellFill size={24} />
            <h4 className="ps-1 m-0">Action Items</h4>
        </div>
    );
    if (props.items.length === 0) {
        return [
            title,
            <Row className={`${styles["action-items"]} d-flex text-center align-items-center`}>
                <Col className="p-2 m-1">
                    <p>No items found</p>
                </Col>
            </Row>
        ]
    }
    return [
        title,
        <Row className={styles["action-items"]}>
            <Col className="p-2 m-1">
                {
                    props.items.slice(0).reverse().map(item => {
                        return (
                            <ActionItemAccordion {...item} />
                        )
                    })
                }
            </Col>
        </Row>
    ]
}

function EmailHistory(props) {
    let title = (
        <div className="d-flex align-items-center pb-2 mt-5">
            <EnvelopeFill size={24} />
            <h4 className="ps-1 m-0">Email History</h4>
        </div>
    )
    if (props.emails.length === 0) {
        return [
            title,
            <Row className={`${styles["email-history"]} d-flex text-center align-items-center`}>
                <Col className="p-2 m-1">
                    <p>No items found</p>
                </Col>
            </Row>
        ]
    }
    return [
        title,
        <Row className={styles["email-history"]}>
            <Col className="p-2 m-1">
                {
                    props.emails.slice(0).reverse().map(email => {
                        return (
                            <EmailAccordion {...email} />
                        )
                    })
                }
            </Col>
        </Row>
    ];
}
function Stage(props) {
    return (
        <div key={props.index} className="d-flex align-items-center">
            {
                props.index === 0 ? (<ExclamationCircleFill size={24} fill="orange" />) : (<CheckCircleFill size={24} />)
            }
            <h6 className="m-0">
                {classifications[props.stage.classification]}
                <span className="text-muted"> {new Date(props.stage.date).toLocaleString()}</span>
            </h6>
            <div className={styles["vertical-line"]}></div>
        </div>
    );
}
function StageList(props) {
    return (
        <ul className={`${styles.checklist} mt-3`}>
            {
                props.list.slice(0).reverse().map((stage, index) => {
                    return (
                        <li>
                            <Stage stage={stage} index={index} />
                        </li>
                    );
                })
            }
        </ul>
    )
}

function LevelsButton(props) {
    return (
        <Button href={props.link} target="_blank" variant="light" className={`${styles["levels-btn"]} d-flex align-items-center`}>
            <img src="https://www.levels.fyi/assets/levelsiconfilledcolored.png" height="28" width="28" alt="Levels.fyi Logo" />
            Levels.fyi
        </Button>
    );
}

function LeetcodeButton(props) {
    return (
        <Button href={props.link} target="_blank" variant="dark" className={`${styles["leetcode-btn"]} d-flex align-items-center`}>
            <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" height="28" width="28" alt="Leetcode Logo" />
            Leetcode
        </Button>
    );
}

async function handleOfferRead(company) {
    fetch(`${process.env.REACT_APP_BACKEND}/company/${company}/offerviewed`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            companyName: company
        }),
        credentials: "include"
    });
}

function handleUntrackButtonSubmit(company) {
    fetch(`${process.env.REACT_APP_BACKEND}/company/${company}/untrack`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            companyName: company
        }),
        credentials: "include"
    }).then(() => {
        window.location.href = "";
    });
}

function UntrackButton(props) {
    return (
        <Button onClick={() => handleUntrackButtonSubmit(props.company)} variant="warning" className={`${styles["untrack-btn"]} d-flex align-items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>            
            <span className={`${styles["untrack-text"]}`}>Untrack</span>
        </Button>
    );
}

function handleTrackButtonSubmit(company) {
    fetch(`${process.env.REACT_APP_BACKEND}/company/${company}/track`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            companyName: company
        }),
        credentials: "include"
    }).then(() => {
        window.location.href = "";
    });
}

function TrackButton(props) {
    return (
        <Button onClick={() => handleTrackButtonSubmit(props.company)} variant="info" className={`${styles["untrack-btn"]} d-flex align-items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
            </svg>
            <span className={`${styles["untrack-text"]}`}>Track</span>
        </Button>
    );
}

function EmailAccordion(props) {
    return (
        <Accordion flush className={styles["mini-accordion"]}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h6>
                        <Badge bg="warning" text="dark" className="m-0 me-2">{ /* We do this here to get the name for the classification, which is typically a number*/classifications[props.classification]}
                        </Badge>
                        <a href={props.emailLink} className="m-0 p-0" target="_blank" rel="noreferrer">
                            {props.subject}
                        </a>
                    </h6>
                </Accordion.Header>
                <Accordion.Body>
                    <p>{props.body}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function ActionItemAccordion(props) {
    return (
        <Accordion flush className={styles["mini-accordion"]}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h6 className="m-0">{props.subject}</h6>
                </Accordion.Header>
                <Accordion.Body>
                    <p className="mb-0">{props.body}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function capitalizeFirstLetter(s) {
    return s[0].toUpperCase() + s.slice(1);
}

export default Company;
