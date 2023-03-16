import {
  SAVE_COLOR_PALETTE_FOR_MOODBOARD,
  SAVE_PRODUCTS_FOR_MOODBOARD,
  SAVE_NEW_MOODBOARD,
  SAVE_TITLE,
  SAVE_SUMMARY,
  SAVE_CURRENCY,
  SAVE_BUDGET,
  SAVE_CUSHION,
  SAVE_INITIALISED_PROJECT,
  SELECTED_PROJECT,
  UPDATE_PROJECT_DETAILS
} from "../actions/moodboardActions"
import { SET_USER_PROJECTS } from "../actions/userActions"

const initialState = {
  moodboardComponents: null,
  initialisedProject: null,
  selectedProject: null,
  currentUserProjects: null
}

const moodboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROJECTS:
      return {
        ...state,
        currentUserProjects: action.payload
      }
    case UPDATE_PROJECT_DETAILS:
      const updatedCurrentUserProjects = state.currentUserProjects.map((project) => {
        if (project._id === action.payload._id) {
          return action.payload // replace the matching project with the new one
        }
        return project // return the original project if it doesn't match the _id
      })
      return {
        ...state,
        currentUserProjects: updatedCurrentUserProjects // replace the currentUserProjects array with the updated array
      }

    case SAVE_PRODUCTS_FOR_MOODBOARD:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          products: action.payload
        }
      }
    case SAVE_COLOR_PALETTE_FOR_MOODBOARD:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          palette: action.payload
        }
      }
    case SAVE_NEW_MOODBOARD:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          moodboard: action.payload
        }
      }
    case SAVE_TITLE:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          title: action.payload
        }
      }
    case SAVE_SUMMARY:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          summary: action.payload
        }
      }
    case SAVE_CURRENCY:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          currency: action.payload
        }
      }
    case SAVE_BUDGET:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          budget: action.payload
        }
      }
    case SAVE_CUSHION:
      return {
        ...state,
        moodboardComponents: {
          ...state.moodboardComponents,
          cushion: action.payload
        }
      }
    case SAVE_INITIALISED_PROJECT:
      return {
        ...state,
        initialisedProject: action.payload
      }
    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload
      }

    default:
      return state
  }
}

export default moodboardReducer
