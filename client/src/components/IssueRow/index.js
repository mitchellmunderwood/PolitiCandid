// import react dependencies and styling for the issues row components
import React from 'react'
import Slider from "../Slider/index";
import Switch from "../Switch/index";
import "./index.css";
import { useStoreContext } from '../../store/store';
import { UPDATE_ISSUES_DATA } from '../../store/actions';
// functional component issue row drilling props issue data 
function IssueRow(props) {

    console.log("important issuerow", props);
    const { issue, stance, important } = props.issueData;
    // declare issue state and dispatch for the store file
    const issue_name = issue;
    const [state, dispatch] = useStoreContext();
    // remove issue from row event handler // filter current_issues remove issue by name and replace all other issues
    const handleRemove = (event) => {
        event.preventDefault();
        const current_issues = state.issuesData;
        const new_issues = current_issues.filter(issue => issue.issue !== issue_name);
        dispatch({ type: UPDATE_ISSUES_DATA, issuesData: new_issues });
    }


    // return to view the issue, stance and importance to each component of each issue row

    return <div className="issue-row">
        <div className="issue-row-line">
            <p>Issue: </p>
            <h6 className="issue-name">{issue}</h6>
        </div>
        <div className="issue-row-line">
            <p>Stance: </p>
            <Slider className="issue-stance" stance={stance} issueName={issue} />
        </div>
        <div className="issue-row-line">
            <p id="important">Importance: </p>
            <Switch className="issue-important" important={important} issueName={issue} />
        </div>
        <div className="issue-row-line delete">
            <button onClick={(event) => handleRemove(event)} className="delete-button" title="Delete Issue">X</button>

        </div>
    </div>
}
// exports functional component issuerow
export default IssueRow;