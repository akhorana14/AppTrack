import Header from "../../components/Header"
import Navbar from "../../components/Navbar/Navbar"

function Company(company) {
    return (
        <>
            <Header title={`Your Application @ ${company.name}`} />
            <Navbar />
            <p>company page</p>
        </>
    );
};

export default Company;
