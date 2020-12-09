// import dependencies and usecontext for the store file
import React from 'react';
import Switch from '@material-ui/core/Switch';
import "./index.css";
import { useStoreContext } from '../../store/store';
import { UPDATE_ISSUES_DATA } from '../../store/actions';

// material ui export of functional switch component with props
export default function BooleanSwitch(props) {
  const { important, issueName } = props;
  const [state, dispatch] = useStoreContext();
  // event change handler for switch that maps over current-issues and returns the important issues
  const handleChange = () => {
    const current_issues = state.issuesData;
    const new_issues = current_issues.map(issue => {
      if (issue.issue === issueName) {
        issue.important = !issue.important;
        return issue
      } else {
        return issue
      }
    })
    // dispatch the type and issue date to based on actions.js and newissues
    dispatch({ type: UPDATE_ISSUES_DATA, issuesData: new_issues });

  }

  return (
    <div className="issue-important">
      <div className="issue-important-range">
        <h6>No</h6>
        <h6>Yes</h6>
      </div>
      <Switch
        onChange={() => handleChange()}
        checked={important}
        size="medium"
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    </div>
  );
};

