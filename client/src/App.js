import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Registation';
import store from './store'
import { logoutUser,setCurrentUser} from '././actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Dashboard from './components/dashboard/Dashboards';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile';
 import AddExperience from './components/add-credentials/AddExperience';
 import AddEducation from './components/add-credentials/AddEducation';
 import Profiles from './components/profiles/Profiles';
 import Profile from './components/profile/Profile';
 import Posts from './components/posts/Posts';
 import Post from './components/post/Post';
//import NotFound from './components/not-found/NotFound';
//check for token
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user
  const decoded=jwt_decode(localStorage.jwtToken);
  //set user an authentication
  store.dispatch(setCurrentUser(decoded));
  //check for the expire token
   const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
     <Navbar/>
     <Route exact path='/' component={Landing}/>
     <div className="container">
     <Route exact path='/Login' component={Login}/>
     <Route exact path='/Register' component={Register}/>
     <Route exact path="/profiles" component={Profiles} />
     <Route exact path="/profile/:handle" component={Profile} />
     <Switch>
     <PrivateRoute exact path='/Dashboard' component={Dashboard}/>
     </Switch>
     <Switch>
     <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
     </Switch>
     <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                /> 
              </Switch> 
               <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch> 
            
               <Switch>
                <PrivateRoute
                  exact
                  path="/post"
                  component={Posts}
                />
              </Switch> 
              <Switch>
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={Post}
                />
              </Switch> 
              </div> 
     <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
