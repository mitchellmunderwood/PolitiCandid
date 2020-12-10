// import app dependencies and css style
import React, { useRef } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { lightBlue } from '@material-ui/core/colors';
import "./index.css";
import { useStoreContext } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { UNSET_USER } from '../../store/actions';
// export functional component voter form and props
export default function VoterForm(props) {
    // declare state and dispatch for the store file and establish useHistory 
    console.log("VoterForm props:", props);
    const [state, dispatch] = useStoreContext();
    const history = useHistory();
    // declare all useRef variables
    const userNameRef = useRef();
    const cityRef = useRef();
    const countyRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();
    // material ui component theming 
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                color: lightBlue,
            },
        },
    }));

    const classes = useStyles();

    const updateInfo = (event) => {
        // console.log("target id", event.target.getAttribute("id"));
        const info = event.target.getAttribute("id");
        const currentInfo = state.userData[info];
        let currentRef;
        switch (info) {
            case "name":
                currentRef = userNameRef;
                break;
            case "city":
                currentRef = cityRef;
                break;
            case "county":
                currentRef = countyRef;
                break;
            case "state":
                currentRef = stateRef;
                break;
            case "country":
                currentRef = countryRef;
                break;
        }
        const newInfo = currentRef.current.childNodes[1].firstChild.value;
        state.userData[info] = newInfo;
        // console.log("User Data", state.userData);
    }
    // event handler for user infomation name, city, state, county, country
    const handleUpdate = (event) => {
        if (event) {
            event.preventDefault();
        }
        const body = {
            username: state.user,
            userData: state.userData,
            issuesData: state.issuesData,
            candidateData: state.candidateData
        }
        axios.post("/api/users/update", body)
            .then(response => { console.log(response) });
    }
    // ^ post update user profile
    // event handler to add candidacy 
    const addCandidate = (event) => {
        if (event) {
            event.preventDefault();
        }
        state.candidateData.candidate = true;
        console.log("User is now a Candidate", state.candidateData.candidate)
        handleUpdate();
        props.reRender();
    }
    // event handler to delete user and unset user data
    const handleDeleteUser = (event) => {
        if (event) {
            event.preventDefault();
        }
        // dispatch({ type: LOADING });
        const body = { username: state.user };
        console.log("User to be deleted", body);
        axios.post('/api/users/delete', { username: state.user }).then((response) => console.log(response));
        dispatch({ type: UNSET_USER });
        history.replace('/login');
    }
    // return form with profile information in texfields
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <h3>Update Your Voter Info</h3>

            < div id="form-block">
                <TextField className="outlined-basic" onChange={(event) => { updateInfo(event) }} ref={userNameRef} placeholder={props.data.name} id="name" label="Name" variant="outlined" />
                <br />
                <TextField className="outlined-basic" onChange={(event) => { updateInfo(event) }} ref={cityRef} placeholder={props.data.city} id="city" label="City" variant="outlined" />
                <br />
                <TextField className="outlined-basic" onChange={(event) => { updateInfo(event) }} ref={countyRef} placeholder={props.data.county} id="county" label="County" variant="outlined" />
                <br />
                <TextField className="outlined-basic" onChange={(event) => { updateInfo(event) }} ref={stateRef} placeholder={props.data.state} id="state" label="State" variant="outlined" />
                <br />
                <TextField className="outlined-basic" onChange={(event) => { updateInfo(event) }} ref={countryRef} placeholder={props.data.country} id="country" label="Country" variant="outlined" />
                <br />
            </div>

            {/* buttons to update voter info, update candidate info, and button to delete user and unset data */}
            <button className="update-info-button" onClick={(event) => handleUpdate(event)}>Update Voter Info</button>
            <br />
            {!state.candidateData.candidate ? (<button onClick={(event) => addCandidate(event)} className="update-info-button">Add Candidacy</button>) : (<></>)}
            {!state.candidateData.candidate ? (<br />) : <></>}
            <button onClick={(event) => handleDeleteUser(event)} className="update-info-button">Delete Account</button>

        </form>
    );
}