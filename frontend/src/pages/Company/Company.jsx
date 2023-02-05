import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"
import './Company.css';

import {useParams} from "react-router-dom";

function Company() {
    let { company:companyName } = useParams();
    companyName = capitalizeFirstLetter(companyName);
    return (
        <>
            <Header title={`Your Application @ ${companyName}`} />
            <Navbar />
            <div class="main-content">
                <h1 class="display-3 font-weight-normal">{`${companyName}`}</h1>
            </div>
        </>
    );
};

function capitalizeFirstLetter(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

export default Company;
