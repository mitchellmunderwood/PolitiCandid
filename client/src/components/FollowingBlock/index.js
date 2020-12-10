import React from "react";
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FollowingRow from "../FollowingRow/index";
import { useStoreContext } from '../../store/store';
import "./index.css";

// -------------------------------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------------------------------

export default function FollowingBlock(props) {
    
    const classes = useStyles();

    const [state, dispatch] = useStoreContext();
    const [expanded, setExpanded] = React.useState(false); 

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardContent>
                <CardActions>
                    <h3>Following</h3>
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
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                {state.following.map((follow)=> <FollowingRow setNewProfile={props.setNewProfile} unfollowFunc={props.unfollowFunc} follower={state.username} follow={follow}/>)}
                {state.following.length === 0 && <p>Not Currently Following Anyone</p>}
                </Collapse>
            </CardContent>
        </Card>
    );
}

// -------------------------------------------------------------------------------------------------------------------