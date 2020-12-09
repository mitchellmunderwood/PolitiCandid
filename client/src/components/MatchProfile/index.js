import React from 'react'
import IssueTab from "../IssueTab/index";
import "./index.css";

export default function MatchProfile(props) {
    console.log("match profile props:", props.match.issues);
    const issues = props.match.issues;

    return (
        <div id="matches-profile-page">
            <h1 id="user-name">{props.match.name}</h1>
            <div id="match-profile">

                <div id="profile-info-row">
                    <div id="profile-block">
                        {props.match.candidate ? (
                            <div id="profile-campaign-block">
                                <p>Office: {props.match.office}</p>
                                <p>Body: {props.match.body} </p>
                                <p>Level: {props.match.level} </p>
                            </div>

                        ) : (<></>)}
                        {/* if not a candidate then show the profile props */}
                        <div id="profile-info-block">
                            <p>City: {props.match.city}</p>
                            <p>County: {props.match.county} </p>
                            <p>State: {props.match.state} </p>
                            <p>Country: {props.match.country} </p>
                        </div>
                    </div>
                </div>
                
                <div id="profile-issues-row">
                    <div id="profile-issue-block">
                        {issues ? (issues.map(issue => {
                            return <IssueTab issue={issue} />
                        })) : <></>}
                    </div>
                </div>
            </div>

        </div>


    );
}