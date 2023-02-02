import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Company(company) {
    return (
        <>
            <Header title={`Your Application @ ${company.name}`} />
            <Navbar />
            <p>Hello, World!</p>
        </>
    );
};

export default Company;
