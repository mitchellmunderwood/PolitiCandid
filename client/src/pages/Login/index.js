// import required dependencies and styling
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LOADING, SET_USER } from '../../store/actions';
import { useStoreContext } from '../../store/store';
import "./index.css";
import tourists from '../../components/video/tourists.mp4'
import PcComponent from '../../components/FadeIn/index';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

// login function with logo animation using react-spring
const Login = () => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1000 })
  const props1 = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 500 })
  const AnimatedPc = animated(PcComponent)

  // get and set required login credentials
  const [loginCreds, setLoginCreds] = useState({
    username: '',
    password: '',
  });
  // event change handler with event target of name value accepts both username and password
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginCreds({ ...loginCreds, [name]: value });
  };

  // event handler for submit button of login creds...
  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch action loading to store file
    dispatch({ type: LOADING });
    // axios post api route for login of users
    axios
      .post('/api/users/login', {
        username: loginCreds.username,
        password: loginCreds.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log("LOGIN SET USER");
          // console.log("Response from Database at Login", response.data);
          // dispatch set_user to actions and store file for user login data, user data, issue data and candidate data
          dispatch({
            type: SET_USER,
            user: response.data.username,
            userData: response.data.userData,
            issuesData: response.data.issuesData,
            candidateData: response.data.candidateData,
            followers: response.data.followers,
            following: response.data.following
          });
          // reset route to home 
          history.replace('/');
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });
  };
  // return logo animation background video and login input handlers
  return (

    <div id="signup-container">
      <div id="animation">
        <animated.div style={props}><PcComponent />
        </animated.div>
        <div id="login-container">
          <video autoPlay loop muted
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: '50%',
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1"
            }}
          >
            <source src={tourists} type="video/mp4" />
          </video>

          <div id="loginId">
            <animated.div style={props1}>
              <form className="form-signin">
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
            </label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  name="username"
                  placeholder="Email address"
                  value={loginCreds.username}
                  onChange={handleChange}
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Password
            </label>
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={loginCreds.password}
                  onChange={handleChange}
                />
                <button className="custom-btn btn btn-lg btn-block" type="submit" onClick={handleSubmit}>
                  Login
              </button>
                <Link to="/signup" className="btn btn-link text-custom">
                  <span className="text-custom">Create an Account</span>
                </Link>
              </form>
            </animated.div>
          </div>
          <div className="videezyStyling"> Free B-Roll by <a href="http://videezy.com">Videezy</a></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
