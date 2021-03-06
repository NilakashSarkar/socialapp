import {GET_ERRORS,SET_CURRENT_USER} from  './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from  'jwt-decode'

//Register User
export const registerUser=(userdata,history) =>dispatch=>{   
axios.post('/api/users/register',userdata)
.then(res =>history.push('/login'))
.catch(err =>dispatch({
    type:GET_ERRORS,
    payload:err.response.data}))
    }

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
      .post('/api/users/login', userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
//set loged in user
export const setCurrentUser=(decoded)=>{
return {
type:SET_CURRENT_USER,
payload:decoded
}
}
export const logoutUser=()=>dispatch=>{
//Rempve item local Storage
localStorage.removeItem('jwtToken');
// remove request auth header feture request
setAuthToken(false);
//set current user to false
dispatch(setCurrentUser({}))
}