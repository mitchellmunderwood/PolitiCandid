import React from 'react';
import {NavLink} from 'react-router-dom';
import "./index.css";

export default function FollowerRow(props) {
    return (
        <div class="follower-row">
            <span>{props.follower}</span>
        </div>
    )
}