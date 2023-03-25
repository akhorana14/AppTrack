import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.css';
import '../../static/globals.css';
import MotivationModal from '../../components/MotivationPopup/MotivationModal';

let sampleNewUpdate = [{ "Company": "Meta", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Google", "Date": "10/1/2023", "Status": "Rejected" },
{ "Company": "Amazon", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Netflix", "Date": "12/12/2023", "Status": "Rejected" },
{ "Company": "Apple", "Date": "11/1/2023", "Status": "Rejected" },
{ "Company": "Walmart", "Date": "1/21/2023", "Status": "Rejected" },
{ "Company": "Mcdonalds", "Date": "11/1/2023", "Status": "Rejected" }]

let sampleCompleted = [ {"Company": "Twilio", "Date":"1/10/2023", "Status":"Rejected"} ,
                        {"Company": "Reddit", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Spotify", "Date":"11/21/2023", "Status":"Rejected"} ,
                        {"Company": "Uber", "Date":"1/1/2023", "Status":"Rejected"} ,
                        {"Company": "Pinterest", "Date":"10/1/2023", "Status":"Rejected"},
                        {"Company": "Twitter", "Date":"1/21/2023", "Status":"Rejected"},
                        {"Company": "Twitt2er", "Date":"11/31/2023", "Status":"Rejected"},
                        {"Company": "Twitt3er", "Date":"1/12/2023", "Status":"Rejected"},
                        {"Company": "Twitt5er", "Date":"1/1/2023", "Status":"Rejected"},
                      ]

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
      <div className='text-center'>
        <Navbar />
        <MotivationModal />
        {/* searchbar: https://bbbootstrap.com/snippets/bootstrap-5-search-bar-microphone-icon-inside-12725910*/}
        <div class="search">
          <i class="fa fa-search"></i>
          <input type="text" class="form-control form-input" placeholder="Search your notifications"></input>
        </div>
        {/* fix this later */}

        <div id="table-container">
          <div id="new-updates-div" class="d-flex align-items-center">
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

          <div id="completed-updates-div" class="d-flex align-items-center">
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
      </div>
    </>
  );
};

export default Dashboard;


/* used tutorial: https://www.geeksforgeeks.org/how-to-pass-data-into-table-from-a-form-using-react-components/
return back when creating function to update values in table */
