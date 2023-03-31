import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.css';
import '../../static/globals.css';
import MotivationModal from '../../components/MotivationPopup/MotivationModal';
import Button from 'react-bootstrap/Button';

// Sample data below
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

// try to get new updates from backend
async function getNewUpdates() {
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/dashboard`, {
      credentials: "include"
  });
  if (res.ok) {
      return await res.json();
  }
  return [];
}

// fetch alternate order
async function reorderUpdates() {
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/orderByActionDate`, {
    credentials: "include"
  });
  if (res.ok) {
      return await res.json();
  }
  return [];
}

function Dashboard() {

  const [newUpdateData, setNewUpdateData] = useState([]); // previously sampleNewData in useState
  const [completedData, setCompletedData] = useState(sampleCompleted); // change in the future
  const [buttonText, setButtonText] = useState("Date");

  useEffect(() => {
    async function fetchNewUpdate() {
        const newUpdates = await getNewUpdates();
        setNewUpdateData(newUpdates);
    }
    fetchNewUpdate();
  }, []);

  const newUpdateTableRows = newUpdateData.map((info) => {
    return (
      <tr>
        <td>{info.Company}</td>
        <td>{info.date.substr(0,9)}</td>
        <td>{classifications[info.classification]}</td>
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

  function changeDateOrder() {
    console.log("Clicking button");
    let newText = (buttonText==="Date") ? "Action Date" : "Date"; // change label 
    setButtonText(newText);
  
    // update table contents

  }
  let dateButton = <Button onClick={changeDateOrder} variant="text" style={{fontWeight: 'bold'}}>{buttonText}</Button>;

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
                  <th>{dateButton}</th>
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
