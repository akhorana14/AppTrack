import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"
import './Company.css';

import {useParams} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons';

//Replace this later with a call to the backend API
let listOfStages = [
    {date: "01/01/2022", type: "Applied"},
    {date: "01/02/2022", type: "Online Assessment"},
    {date: "01/03/2022", type: "Interview 1"}
];

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
                            <span class="text-muted"> {stage.date}</span>
                        </h6>
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
        <Button variant="light" className="d-flex align-items-center levels-btn">
           <img src="https://www.levels.fyi/assets/levelsiconfilledcolored.png" height="28" width="28" alt="Levels.fyi Logo" />
           Levels.fyi
        </Button>
    );
}

function Company() {
    let { company:companyName } = useParams();
    companyName = capitalizeFirstLetter(companyName);
    return (
        <>
            <Header title={`Your Application @ ${companyName}`} />
            <Navbar />
            <div class="main-content">
                <Container fluid className="h-100">
                    <Row className="main-row justify-content-center h-100">
                        <Col className="left left-half">
                            <h1 class="display-3 font-weight-normal">{`${companyName}`}</h1>
                            <h3>Software Engineering Intern
                                <br />
                                <h6 class="text-muted">Last update: January 23, 2022</h6>
                            </h3>
                            <LevelsButton />
                           <StageList list={listOfStages} />
                        </Col>
                        <Col className="right right-half">
                        Hi
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
