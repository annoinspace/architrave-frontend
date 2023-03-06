import {
  SET_USER_INFO,
  SET_ACCESS_TOKEN,
  LOGOUT_USER,
  DELETE_ACCESS_TOKEN,
  SIGN_UP_USER_STATUS,
  USER_LOCATION,
  LOGIN_USER_STATUS
} from "../actions/userActions"

const initialState = {
  signUpStatus: null,
  loginStatus: null,
  userLocation: "/",
  accessToken: null,
  currentUser: null
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER_STATUS:
      return {
        ...state,
        signUpStatus: action.payload
      }
    case LOGIN_USER_STATUS:
      return {
        ...state,
        loginStatus: action.payload
      }
    case USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload
      }
    case SET_ACCESS_TOKEN: // add a new case to handle setting the accessToken
      return {
        ...state,
        accessToken: action.payload
      }
    case DELETE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      }
    case SET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state
  }
}

export default profileReducer
