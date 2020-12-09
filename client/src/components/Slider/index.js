import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./index.css";
import { UPDATE_ISSUES_DATA } from '../../store/actions';
import { useStoreContext } from '../../store/store';

// function issue slider component export with props
function IssueSlider(props) {
  const { stance, issueName } = props;
  // declare react state and dispatch for store file
  const [state, dispatch] = useStoreContext();
  // event handler for slider value based on the current issue
  const handleChange = (event) => {
    event.preventDefault();
    const current_issues = state.issuesData;
    // UPDATE THIS SECTION // map current issues and extract value of text
    const new_issues = current_issues.map(issue => {
      if (issue.issue === issueName) {
        issue.stance = event.target.getAttribute("aria-valuetext");
        return issue
      } else {
        return issue
      }
    })
    // ===============
    // dispatch type and issue data
    dispatch({ type: UPDATE_ISSUES_DATA, issuesData: new_issues });

  }

  // declare style for the material ui component

  const useStyles = makeStyles({
    root: {
      width: 200,
      margin: 10,
    },
  });

  const classes = useStyles();

  function valuetext(value) {
    return `${value}`;
  }

  // ==========================================

  return (
    <div className={classes.root}>
      <div id="stance-range">
        <p>Against</p>
        <p>Neutral</p>
        <p>For</p>
      </div>
      <Slider
        onChange={(event) => handleChange(event)}
        defaultValue={parseInt(props.stance)}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={-10}
        max={10}
      />
    </div>
  );
}

export default IssueSlider;
