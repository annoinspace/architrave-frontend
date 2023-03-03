import { SET_USER_INFO, SET_ACCESS_TOKEN, LOGOUT_USER, DELETE_ACCESS_TOKEN } from "../actions/userActions"

const initialState = {
  accessToken: null,
  currentUser: null
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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
