import React from 'react';
import {NavLink} from 'react-router-dom';

export default function FollowerRow(props) {
    return (
        <div>
            <span>{props.follower}</span>
        </div>
    )
}