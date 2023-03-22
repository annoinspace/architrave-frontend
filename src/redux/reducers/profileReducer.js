import {
  SET_USER_INFO,
  SET_ACCESS_TOKEN,
  LOGOUT_USER,
  DELETE_ACCESS_TOKEN,
  SIGN_UP_USER_STATUS,
  USER_LOCATION,
  LOGIN_USER_STATUS,
  SAVE_COLOR_PALETTE,
  DELETE_COLOR_PALETTE,
  SAVE_NEW_PRODUCT,
  DELETE_PRODUCT,
  ADD_INSPO_IMAGES,
  DELETE_INSPO,
  UPDATE_USER_USERNAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_CURRENCY,
  SET_PASSWORD_ERROR
} from "../actions/userActions"

const initialState = {
  signUpStatus: null,
  loginStatus: null,
  userLocation: "/",
  accessToken: null,
  currentUser: null,
  passwordError: null
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
    case SAVE_COLOR_PALETTE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          colorLibrary: action.payload
        }
      }
    case SAVE_NEW_PRODUCT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          productLibrary: action.payload
        }
      }
    case ADD_INSPO_IMAGES:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inspo: action.payload
        }
      }
    case DELETE_COLOR_PALETTE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          colorLibrary: action.payload
        }
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          productLibrary: action.payload
        }
      }
    case DELETE_INSPO:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inspo: action.payload
        }
      }
    case UPDATE_USER_USERNAME:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          username: action.payload
        }
      }
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          email: action.payload
        }
      }
    case UPDATE_USER_CURRENCY:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          currency: action.payload
        }
      }
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload
      }

    default:
      return state
  }
}

export default profileReducer
