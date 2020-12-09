import React from 'react';
import "./index.css";
import MatchProfile from "../../components/MatchProfile/index";
import { useStoreContext } from '../../store/store';
import axios from "axios";


export default function MatchPage() {

    const [state, dispatch] = useStoreContext();

    const follow = (e, follower, followee) => {
        e.preventDefault();
        console.log("state is:", state);
        axios.post("api/users/addfollow", {follower: follower, followee: followee}).then((res)=> console.log("addfollower",res));
        axios.post("api/users/addfollower", {follower: follower, followee: followee}).then((res)=> console.log("addfollow",res));
        dispatch({type: "UPDATE_FOLLOWING", following: state.following.push(followee)});
        
    }

    const unfollow = (e, follower, followee) => {
        e.preventDefault();
        axios.post("api/users/removefollow", {follower: follower, followee: followee}).then((res)=> console.log(res));
        axios.post("api/users/removefollower", {follower: follower, followee: followee}).then((res)=> console.log(res));
        const newFollowing = state.following.filter(el => el !== followee);
        dispatch({type: "UPDATE_FOLLOWING", following: newFollowing}); 
    }

    return (
        <React.Fragment>
        <h1>Matches Page</h1>
        <button onClick={(e)=>follow(e, state.user, state.matchProfile.username)}>Follow</button>
        <button onClick={(e)=>unfollow(e, state.user, state.matchProfile.username)}>Unfollow</button>
        <MatchProfile match={state.matchProfile} />
        </React.Fragment>
    )
}