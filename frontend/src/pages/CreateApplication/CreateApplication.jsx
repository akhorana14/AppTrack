import React, { useState } from "react";

import "./CreateApplication.css"

import Navbar from "../../components/Navbar/Navbar";

function CreateApplication() {
    const [errorMsg, setErrorMsg] = useState("* indicates required fields");

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [leetcodeLink, setLeetcodeLink] = useState("");
    const [levelsLink, setLevelsLink] = useState("");

    function companyNameChange(e) {
        setCompanyName(e.target.value);
    }

    function jobTitleChange(e) {
        setJobTitle(e.target.value);
    }

    function leetcodeLinkChange(e) {
        setLeetcodeLink(e.target.value);
    }

    function levelsLinkChange(e) {
        setLevelsLink(e.target.value);
    }

    function handleClear() {
        setCompanyName("");
        setJobTitle("");
        setLeetcodeLink("");
        setLevelsLink("");
    }

    function handleSubmit() {
        console.log({
            companyName: companyName,
            jobTitle: jobTitle,
            leetcodeLink: leetcodeLink,
            levelsLink: levelsLink
        });
    }

    return (
        <div className="create-app-background">
            <div className="create-app-navbar-container">
                <Navbar />
            </div>
            <div className="create-app-body">
                <div className="create-app-right">
                    <p className="display-2 create-app-right-top-text">Track a new application</p>
                    <p className="display-4 create-app-right-bottom-text">
                        AppTrack allows you to manually track an application that may not be tracked automatically in emails
                    </p>
                </div>
                <div className="create-app-left">
                    <p className="display-4 create-app-left-text">Enter application information</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="company-name">Company name *</label>
                            <input value={companyName} className="form-control" placeholder="Enter company name" onChange={companyNameChange}/>
                        </div>
                        <div className="form-group create-app-margin-top">
                            <label htmlFor="title">Job title *</label>
                            <input value={jobTitle} className="form-control" placeholder="Enter job title" onChange={jobTitleChange} />
                        </div>
                        <div className="form-group create-app-margin-top">
                            <label htmlFor="title">LeetCode link</label>
                            <input value={leetcodeLink} className="form-control" aria-describedby="leetcode-help" placeholder="Enter LeetCode link" onChange={leetcodeLinkChange} />
                            <small id="leetcode-help" className="form-text text-muted">Common technical interview problems can be found at a company's LeetCode</small>
                        </div>
                        <div className="form-group create-app-margin-top">
                            <label htmlFor="title">levels.fyi link</label>
                            <input value={levelsLink} className="form-control" aria-describedby="title-help" placeholder="Enter levels.fyi link"  onChange={levelsLinkChange}/>
                            <small id="title-help" className="form-text text-muted">Information on compensation can be found at a company's levels.fyi</small>
                        </div>
                        <div className="create-app-margin-top">
                            <button type="button" className="btn btn-primary blue-button" onClick={handleClear}>Clear</button>
                            <button type="button" className="btn btn-success green-button" onClick={handleSubmit}>Submit</button>
                            <span className="create-app-error-msg">{errorMsg}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateApplication;