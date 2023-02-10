import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar"
import './Dashboard.css';

let sampleNewUpdate = [ {"Company": "Meta", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Google", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Amazon", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Netflix", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Apple", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Walmart", "Date":"1/1/2023", "Status":"Rejected"} ,
                   {"Company": "Mcdonalds", "Date":"1/1/2023", "Status":"Rejected"} ]

let sampleCompleted = [ {"Company": "Twilio", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Reddit", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Spotify", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Uber", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Pinterest", "Date":"1/1/2023", "Status":"Rejected"},
                        {"Company": "Twitter", "Date":"1/1/2023", "Status":"Rejected"}]

function Dashboard() {

    const [newUpdateData, setNewUpdateData] = useState(sampleNewUpdate); // change in future 
    const [completedData, setCompletedData] = useState(sampleCompleted); // change in the future
    
    const newUpdateTableRows = newUpdateData.map((info) => {
        return (
          <tr>
            <td>{info.Company}</td>
            <td>{info.Date}</td>
            <td>{info.Status}</td>
          </tr>
        );
      });

      const completedDataTableRows = completedData.map((info) => {
        return (
          <tr>
            <td>{info.Company}</td>
            <td>{info.Date}</td>
            <td>{info.Status}</td>
          </tr>
        );
      });

    return (
        <>
            <Navbar />

            {/*searchbar: https://bbbootstrap.com/snippets/bootstrap-5-search-bar-microphone-icon-inside-12725910*/}
            <div class="form">
                  <i class="fa fa-search"></i>
                  <input type="text" class="form-control form-input" placeholder="Search your notifications"></input>
                  <span class="left-pan"><i class="bi bi-search"></i></span>
            </div>

            <div id="table-container">
                <div id="new-updates-div">
                    <div id="left-side-label-container">New Updates</div>
                    <table class="table table-striped table-hover" id="new-update-table">  
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>{newUpdateTableRows}</tbody>
                    </table>
                </div>
                
                <div id="completed-updates-div">
                    <div id="left-side-label-container"><p>Completed</p></div>
                    <table class="table table-striped table-hover" id="completed-table">  
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>{completedDataTableRows}</tbody>
                    </table>
                </div>    
            </div>
        </>
    );
};

export default Dashboard;


/* used tutorial: https://www.geeksforgeeks.org/how-to-pass-data-into-table-from-a-form-using-react-components/
return back when creating function to update values in table */