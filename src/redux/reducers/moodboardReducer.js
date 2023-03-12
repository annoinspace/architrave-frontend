import { SAVE_COLOR_PALETTE_FOR_MOODBOARD, SAVE_PRODUCTS_FOR_MOODBOARD } from "../actions/moodboardActions"

const initialState = {
  products: null
}

const moodboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS_FOR_MOODBOARD:
      return {
        ...state,
        products: action.payload
      }
    case SAVE_COLOR_PALETTE_FOR_MOODBOARD:
      return {
        ...state,
        palette: action.payload
      }
    default:
      return state
  }
}

export default moodboardReducer
