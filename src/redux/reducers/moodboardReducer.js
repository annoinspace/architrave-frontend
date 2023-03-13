import {
  SAVE_COLOR_PALETTE_FOR_MOODBOARD,
  SAVE_PRODUCTS_FOR_MOODBOARD,
  SAVE_NEW_MOODBOARD
} from "../actions/moodboardActions"

const initialState = {
  moodboardComponents: null
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

    default:
      return state
  }
}

export default moodboardReducer
