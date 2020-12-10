// import required dependencies and styling
import React from 'react';
import "./index.css";
import IssueRow from "../IssueRow/index";
import IssueAdd from "../../components/IssueAdd";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import "./index.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStoreContext } from '../../store/store';
import axios from 'axios';
// theming of material ui component
const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));
// export functional component voter values block and props
export default function VoterValuesBlock(props) {
    // console.log("VoterValuesBlock Props:", props.issues)
    // pass state by context to store file
    const [state, dispatch] = useStoreContext();
    // event handler update user data, issues data, and candidate data
    const handleUpdate = (event) => {
        event.preventDefault();
        const body = {
            username: state.user,
            userData: state.userData,
            issuesData: state.issuesData,
            candidateData: state.candidateData
        }
        // axios post update api by variable body above
        axios.post("/api/users/update", body)
            .then(response => { console.log(response) });
    }

    const classes = useStyles();
    // declare getter expanded and setter setExpanded for voter issues area expansion
    const [expanded, setExpanded] = React.useState(false);
    // event handler for expanding form 
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // return card component of voter issues by mapping over props.issuesData
    return (
        <Card>
            <CardActions>
                <div class="is">
                    <div class="in">
                <h1 id="issues">Issues</h1>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                </div>
                </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div id="issues-container">

                    <div id="issues-grid">
                        {/* <IssueHeader /> */}
                        <IssueAdd />
                        {props.issuesData.map(issue => {
                            return <IssueRow key={issue.issue} issueData={issue} />
                        })}
                    </div>
                    <button id="update-button" onClick={(event) => handleUpdate(event)}>Update</button>
                </div>
            </Collapse>
        </Card>
    );
}

