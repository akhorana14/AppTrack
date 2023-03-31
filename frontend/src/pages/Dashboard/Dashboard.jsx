import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.css';
import '../../static/globals.css';
import MotivationModal from '../../components/MotivationPopup/MotivationModal';
import Button from 'react-bootstrap/Button';

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
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/dashboard/orderByActionDate`, {
    credentials: "include"
  });
  if (res.ok) {
    return await res.json(); 
  }
  return [];
}

// fetch completed events
async function getCompletedEvents() {
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/dashboard/getCompletedEvents`, {
    credentials: "include"
  });
  if (res.ok) {
    return await res.json(); 
  }
  return [];
}

function Dashboard() {

  const [newUpdateData, setNewUpdateData] = useState([]); // previously sampleNewData in useState
  const [actionDateData, setActionDateData] = useState([]); // added for action date table
  const [upperTableData, setUpperTableData] = useState([]); // added for user story 6.5
  const [completedData, setCompletedData] = useState([]); // change for user story 6.2
  const [buttonText, setButtonText] = useState("Date");

  async function fetchNewUpdate() {
    const newUpdates = await getNewUpdates();
    setNewUpdateData(newUpdates);
    setUpperTableData(newUpdates);
  }

  async function fetchActionDateData() {
    const actionDateUpdates = await reorderUpdates();
    setActionDateData(actionDateUpdates);
  }

  async function fetchCompletedEventData() {
    const completedEvents = await getCompletedEvents();
    setCompletedData(completedEvents);
  }

  useEffect(() => {
    fetchNewUpdate();
    fetchActionDateData();
    fetchCompletedEventData();
  }, []);

  let newUpdateTableRows = upperTableData.map((info) => {
    console.log(info);
    return (
      <tr>
        <td>{info.company.name}</td>
        <td>{(info.date).split('T')[0]}</td>
        <td>{classifications[info.classification]}</td>
      </tr>
    );
  });

  const completedDataTableRows = completedData.map((info) => {
    return (
      <tr>
        <td>{info.company.name}</td>
        <td>{(info.date).split('T')[0]}</td>
        <td>{classifications[info.classification]}</td>
      </tr>
    );
  });

  function changeDateOrder() {
    let newText = (buttonText==="Date") ? "Action Date" : "Date"; // change label 
    setButtonText(newText);

    if (buttonText==="Date") {
      setUpperTableData(actionDateData);
    }
    else {
      setUpperTableData(newUpdateData);
    }
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
