import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"
import './Company.css';

import {useParams} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import {BellFill, CheckCircleFill, EnvelopeFill, ExclamationCircleFill} from 'react-bootstrap-icons';

//Replace this later with a call to the backend API
let listOfStages = [
    {date: "01/01/2022", type: "Applied"},
    {date: "01/02/2022", type: "Online Assessment"},
    {date: "01/03/2022", type: "Interview 1"},
    {date: "01/04/2022", type: "Interview 2"}
];

let emails = [
    {subject: "Thank You For Applying!", body: "Applied", type: "Application Confirmation"},
    {subject: "Please complete this Leetcode Assessment.", body: "Online Assessment", type:"OA"},
    {subject: "You've been invited to Interview", body: "Interview 1", type: "Interview"},
    {subject: "Try Our Product", body: "Try Our Product", type: "Other"}
]

function StageList(props) {
    return (
        <ul className="checklist mt-3">
            {
                props.list.slice(0).reverse().map((stage, index) => {
                    return (
                    <li>
                        <div className="d-flex align-items-center">
                            {
                                index === 0 ?  (<ExclamationCircleFill size={24}/>):(<CheckCircleFill size={24}/>)
                            }          
                            <h6 className="m-0">
                                {stage.type}
                                <span className="text-muted"> {stage.date}</span>
                            </h6>
                            <div className="vertical-line"></div>
                        </div>
                    </li>
                    );
                })
            }
        </ul>
    )
}

function LevelsButton() {
    return (
        <Button variant="light" className="levels-btn d-flex align-items-center">
           <img src="https://www.levels.fyi/assets/levelsiconfilledcolored.png" height="28" width="28" alt="Levels.fyi Logo" />
           Levels.fyi
        </Button>
    );
}

function LeetcodeButton() {
    return (
        <Button variant="dark" className="leetcode-btn d-flex align-items-center">
           <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" height="28" width="28" alt="Leetcode Logo" />
           Leetcode
        </Button>
    );
}

function EmailAccordion(props) {
    return (
         <Accordion flush className="mini-accordion">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                        <h6><Badge bg="warning" text="dark" className="m-0 me-2">{props.type}</Badge>{props.subject}</h6>
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
         <Accordion flush className="mini-accordion">
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

function Company() {
    let { company:companyName } = useParams();
    companyName = capitalizeFirstLetter(companyName);
    return (
        <>
            <Header title={`Your Application @ ${companyName}`} />
            <Navbar />
            <div className="main-content">
                <Container fluid className="h-100">
                    <Row className="justify-content-center h-100">
                        <Col className="left left-half">
                            <h1 className="display-3 font-weight-normal mb-0">{`${companyName}`}</h1>
                            <h3>Software Engineer Intern
                                <br />
                                <h6 className="text-muted">Last update: January 23, 2022</h6>
                            </h3>
                            <div className="mt-1 d-flex align-items-center">
                                <LevelsButton />
                                <LeetcodeButton />
                            </div>
                           <StageList list={listOfStages} />
                        </Col>
                        <Col className="right right-half">
                            <div className="d-flex align-items-center pb-2">
                                <BellFill size={24}/>
                                <h4 className="ps-1 m-0">Action Items</h4>
                            </div>

                            <Row className="action-items">
                                <Col className="mw-100 p-2 m-1 shadow-sm">
                                    <ActionItemAccordion subject="Upcoming Interview" body="test"/>
                                </Col>
                            </Row>

                            <div className="d-flex align-items-center pb-2 mt-5">
                                        <EnvelopeFill size={24}/>
                                        <h4 className="ps-1 m-0">Email History</h4>
                            </div>

                            <Row className="email-history">
                                <Col className="mw-100 p-2 m-1 shadow-sm">
                                    {
                                        emails.slice(0).reverse().map(email  => {
                                            return (
                                                <EmailAccordion {...email} />
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

function capitalizeFirstLetter(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

export default Company;
