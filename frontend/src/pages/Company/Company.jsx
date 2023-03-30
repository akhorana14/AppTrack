import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"
import styles from './Company.module.css';

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

async function getEvents(companyName) {
    let res = await fetch(`${process.env.REACT_APP_BACKEND}/company/${companyName}`, {
        credentials: "include"
    });
    if (res.ok) {
        return await res.json();
    }
    return [];
}

function Company() {
    const [errorMsg, setErrorMsg] = useState("* indicates required fields");
    const [actionItem, setActionItem] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    function handleActionItemSubmit() {
        console.log({
            actionItem: actionItem,
            description: description,
            date: date
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
    useEffect(() => {
        async function fetchData() {
            const apiData = await getEvents(companyName);
            setEvents(apiData);
        }
        fetchData();
    }, []);
    companyName = capitalizeFirstLetter(companyName);
    //Conditional render based on if events variable has been populated with api response or not
    return events === null ? null: (
        <>
            <Header title={`Your Application @ ${companyName}`} />
            <Navbar />
            <div className={styles["main-content"]}>
                <Container fluid className="h-100">
                    <Row className="justify-content-center h-100">
                        <Col className={styles["left-half"]}>
                            <h1 className="display-3 font-weight-normal mb-0">{`${companyName}`}</h1>
                            <h3>Software Engineer
                                <br />
                                <h6 className="text-muted my-1">Last update: {events.length === 0 ? "None":new Date(events[events.length - 1].date).toLocaleString()}</h6>
                            </h3>
                            <div className="mt-1 d-flex align-items-center">
                                <LevelsButton company={companyName} />
                                <LeetcodeButton company={companyName} />
                            </div>
                            <StageList list={events.filter(item => item.isActionItem === true)} />
                            <div className="mt-5">
                                <h3>Add an action item
                                    <br />
                                    <h6 className="text-muted">Manually keep track of untracked updates</h6>
                                </h3>
                                <form>
                                    <div className="form-group mt-2">
                                        <label htmlFor="update-title">Action Item *</label>
                                        <input className="form-control" placeholder="Enter action item" onChange={updateActionItem} value={actionItem} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="description">Description *</label>
                                        <textarea class="form-control no-resize" rows="3" onChange={updateDescription} placeholder="Enter description" value={description}></textarea>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="description">Date *</label>
                                        <input className="form-control" placeholder="Enter date" onChange={updateDate} value={date} />
                                        <small className="form-text text-muted">Enter the date in MM/DD/YYYY format</small>
                                    </div>

                                    <button type="button" className="btn btn-primary blue-button mt-3" onClick={handleClear}>Clear</button>
                                    <button type="button" className="btn btn-success green-button mt-3" onClick={handleActionItemSubmit}>Submit</button>
                                    <span className="create-app-error-msg">{errorMsg}</span>
                                </form>
                            </div>
                        </Col>
                        <Col className={styles["right-half"]}>
                            <ActionItems items={events.filter(item => item.isActionItem === true)} />
                            <EmailHistory emails={events} />
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
        <Button href={`https://www.levels.fyi/companies/${props.company}/salaries`} variant="light" className={`${styles["levels-btn"]} d-flex align-items-center`}>
            <img src="https://www.levels.fyi/assets/levelsiconfilledcolored.png" height="28" width="28" alt="Levels.fyi Logo" />
            Levels.fyi
        </Button>
    );
}

function LeetcodeButton(props) {
    return (
        <Button href={`https://leetcode.com/discuss/interview-question?currentPage=1&orderBy=most_relevant&query=${props.company}`} variant="dark" className={`${styles["leetcode-btn"]} d-flex align-items-center`}>
            <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" height="28" width="28" alt="Leetcode Logo" />
            Leetcode
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
                    <Button variant="dark" size="sm">Reclassify</Button>
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
                    <button type="button" className="btn-close btn-sm position-absolute end-0 me-5" aria-label="Close"></button>
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
