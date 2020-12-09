import axios from 'axios';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Navbar from './components/NavBar/index';
import Home from './pages/Home/index';
import MatchesPage from './pages/Matches/index';
import MatchPage from "./pages/MatchPage/index";
import News from "./pages/News/index";
import Login from './pages/Login/index';
import Signup from './pages/SignUp/index';
import { LOADING, SET_USER, UNSET_USER } from './store/actions';
import { useStoreContext } from './store/store';




const App = () => {
  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  console.log(useStoreContext);

  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get('/api/users').then((response) => {

      if (response.data.user) {

        console.log("APP SET USER");
        console.log("Response from Database on UseEffect from App Component", response);

        dispatch({ type: SET_USER, 
          user: response.data.username, 
          userData: response.data.userData,
          issuesData: response.data.issuesData,
          candidateData: response.data.candidateData,
          following: response.data.following, 
          followers: response.data.followers
        });
        
        history.push('/');

      } else {
        console.log("APP UNSET USER");
        dispatch({ type: UNSET_USER });
        history.push('/login');
      }
    });
  }, [dispatch, history]);

  return (
      <div>
        <Navbar />

        {state.user ? (
          <Switch>
            <Route exact path="/" >
              <Home state={state} />
            </Route>
            <Route exact path="/matchespage" component={MatchesPage} />
            <Route exact path="/matchpage" component={MatchPage} />
            <Route exact path="/news" component={News} />
          </Switch>
        ) : (
            <Switch>
              
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Redirect to="/login" />
            </Switch>
          )}
    </div>
  );
};



export default App;
