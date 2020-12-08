import React from 'react';
import "./index.css";
import MatchProfile from "../../components/MatchProfile/index";
import { useStoreContext } from '../../store/store';


export default function MatchPage() {

    const [state, dispatch] = useStoreContext();

    // console.log("Current match profile in state", state.matchProfile);

    return (
        <React.Fragment>
        <h1>Matches Page</h1>
        <button>Follow</button>
        <MatchProfile match={state.matchProfile} />
        </React.Fragment>
    )
}