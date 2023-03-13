export const SAVE_PRODUCTS_FOR_MOODBOARD = "SAVE_PRODUCTS_FOR_MOODBOARD"
export const SAVE_COLOR_PALETTE_FOR_MOODBOARD = "SAVE_COLOR_PALETTE_FOR_MOODBOARD"
export const SAVE_NEW_MOODBOARD = "SAVE_NEW_MOODBOARD"

export const saveProductsForMoodboard = (payload) => ({
  type: SAVE_PRODUCTS_FOR_MOODBOARD,
  payload: payload
})

export const saveSelectedColorPalette = (payload) => ({
  type: SAVE_COLOR_PALETTE_FOR_MOODBOARD,
  payload: payload
})

export const saveNewMoodboardAction = (payload) => ({
  type: SAVE_NEW_MOODBOARD,
  payload: payload
})
