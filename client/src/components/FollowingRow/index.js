import React from 'react';
import {NavLink} from 'react-router-dom';

export default function FollowingRow(props) {
    return (
        <div>
            <span>{props.follow}</span>
            <button>Unfollow</button>
        </div>
    )
}