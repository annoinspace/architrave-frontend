import { SET_CURATED_COLORS } from "../actions/curatedActions"

const initialState = {
  curatedColors: []
}
const curatedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURATED_COLORS:
      return {
        ...state,
        curatedColors: action.payload
      }
    default:
      return state
  }
}

export default curatedReducer
