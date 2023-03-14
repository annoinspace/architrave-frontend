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
  SELECTED_PROJECT
} from "../actions/moodboardActions"

const initialState = {
  moodboardComponents: null,
  initialisedProject: null,
  selectedProject: null
}

const moodboardReducer = (state = initialState, action) => {
  switch (action.type) {
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
