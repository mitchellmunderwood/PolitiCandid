import React from 'react';
import MatchProfile from "../../components/MatchProfile/index";
import { useStoreContext } from '../../store/store';
import axios from "axios";
import "./index.css";


export default function MatchPage() {

    const [state, dispatch] = useStoreContext();

    console.log("state.following", state);

    const follow = (e, follower, followee) => {
        e.preventDefault();
        console.log("state is:", state);
        axios.post("api/users/addfollow", {follower: follower, followee: followee}).then((res)=> console.log("addfollower",res));
        axios.post("api/users/addfollower", {follower: follower, followee: followee}).then((res)=> console.log("addfollow",res));
        var newFollowing = state.following 
        newFollowing.push(followee);
        dispatch({type: "UPDATE_FOLLOWING", following: newFollowing});
        
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
        <MatchProfile match={state.matchProfile} />
        <div class="button-block">
        {state.following.includes(state.matchProfile.username) ?  
        <button class="unfollow-button match-page-unfollow" onClick={(e)=>unfollow(e, state.user, state.matchProfile.username)}>Unfollow</button>   :
        <button class="follow-button match-page-follow" onClick={(e)=>follow(e, state.user, state.matchProfile.username)}>Follow</button>
        }
        </div>
        </React.Fragment>
    )
}