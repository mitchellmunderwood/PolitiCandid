// import dependencies and stylings
import React from 'react';
import "./index.css";
import VoterInfoBlock from "../../components/VoterInfoBlock/index";
import VoterIssueBlock from "../../components/VoterIssueBlock/index";
import CandidateInfoBlock from "../../components/CandidateInfoBlock/index";
import FollowingBlock from "../../components/FollowingBlock/index";
import FollowersBlock from "../../components/FollowersBlock/index";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useStoreContext } from '../../store/store';
import axios from "axios";


// function for Home page and passing props
function Home(props) {

  // declare state for context in store file
  const [state, dispatch] = useStoreContext();
  // declare comp getter and setter setComp as boolean true
  const [comp, setComp] = React.useState(true);

  // rerender based on function passed false
  const reRender = () => {
    setComp(!comp);
  }


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
  // return by ternary operation card based on candidacy rendering the view of user voter or candidate
  // pass user data, candidate data, and issues data by state
  return (<div id="home-container">

    <Card >
      <CardContent>
        <VoterInfoBlock reRender={reRender} userData={state.userData} />
      </CardContent>

      {state.candidateData.candidate ? (<CardContent>
        <CandidateInfoBlock reRender={reRender} candidateData={state.candidateData.campaign} />
      </CardContent>) : ""}

      <CardContent>
        <FollowingBlock unfollowFunc={unfollow} />
      </CardContent>

      <CardContent>
        <FollowersBlock />
      </CardContent>

      <CardContent>
        <VoterIssueBlock reRender={reRender} issuesData={state.issuesData} />
      </CardContent>
    </Card>

      
  </div>)
};


export default Home;