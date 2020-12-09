import React, { createContext, useContext, useReducer } from 'react';
import { LOGIN, LOGOUT, SET_USER, UNSET_USER, UPDATE_ALL_DATA, UPDATE_USER_DATA, UPDATE_ISSUES_DATA, UPDATE_CANDIDATE_DATA, UPDATE_MATCHES_DATA, UPDATE_CURRENT_MATCH, SET_MATCH_PROFILE, UPDATE_FOLLOWING } from './actions';

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      console.log("Reducer - Login/Logout", action);
      return {
        ...state,
        loading: true,
      };

    case SET_USER:
      console.log("Reducer - Set User", action);
      return {
        ...state,
        user: action.user,
        loading: false,
        userData: action.userData, 
        issuesData: action.issuesData,
        candidateData: action.candidateData,
        followers: action.followers,
        following: action.following
      };
    
    case UNSET_USER:
      console.log("Reducer - Unset User", action);
      return {
        ...state,
        user: null,
        loading: false,
        userData: null, 
        issuesData: null,
        candidateData: null,
        matchesData: null,
        currentMatch: null,
        following: null,
        followers: null
      };


    case UPDATE_ALL_DATA: 
      console.log("Reducer - Update All Data",action);
      return {
        ...state,
        user: action.user,
        loading: false,
        userData: action.userData, 
        issuesData: action.issuesData,
        candidateData: action.candidateData,
        matchesData: action.matchesData,
        currentMatch: action.currentMatch
      };

    case UPDATE_USER_DATA: 
      console.log("Reducer - Update User Data", action);
      return {
        ...state,
        userData: action.userData
      };

    case UPDATE_ISSUES_DATA:
      console.log("Reducer - Update Issues Data:", action);
      return {
        ...state,
        issuesData: action.issuesData
      };
    
    case UPDATE_CANDIDATE_DATA:
      console.log("Reducer - Update User Candidate Data:", action);
      return {
        ...state,
        candidateData: action.candidateData
      };

    case UPDATE_MATCHES_DATA:
      console.log("Reducer - Update User Matches Data:", action);
      return {
        ...state,
        matchesData: action.matchesData
      };

    case UPDATE_CURRENT_MATCH:
      console.log("Reducer - Update Current Match Data:", action);
      return {
        ...state,
        currentMatch: action.currentMatch
      };

    case SET_MATCH_PROFILE:
      console.log("Reducer - Update Current Match Profile", action);
      return {
        ...state, 
        matchProfile: action.matchProfile
      };

    case UPDATE_FOLLOWING:
      console.log("Reducer - Add following", action);
      return {
        ...state, 
        following: action.following
      };

    default:
      console.log("Reducer - Default, Return State:", action)
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
    userData: null,
    following: null, 
    followers: null,
    issuesData: null,
    candidateData: null, 
    matchesData: null, 
    currentMatch: null,
    matchProfile: null,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
