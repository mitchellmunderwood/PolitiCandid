import React from 'react';
import {NavLink} from 'react-router-dom';
import "./index.css";

export default function FollowingRow(props) {
    return (
        <div class="follow-row" onClick={(e)=> {props.setNewProfile(e,props.follow)}}>
            <span>{props.follow}</span>
            <button class="unfollow-button" onClick={(e)=>props.unfollowFunc(e,props.follower, props.follow)}>Unfollow</button>
        </div>
    )
}