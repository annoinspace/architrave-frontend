export const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN"
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_USER_INFO = "SET_USER_INFO"
export const DELETE_ACCESS_TOKEN = "DELETE_ACCESS_TOKEN"
export const LOGOUT_USER = "LOGOUT_USER"
export const SIGN_UP_USER_STATUS = "SIGN_UP_USER_STATUS"
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS"
export const USER_LOCATION = "USER_LOCATION"
export const SAVE_COLOR_PALETTE = "SAVE_COLOR_PALETTE"
export const DELETE_COLOR_PALETTE = "DELETE_COLOR_PALETTE"
export const SAVE_NEW_PRODUCT = "SAVE_NEW_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"

const baseEndpoint = process.env.REACT_APP_BE_URL

export const loginUserStatus = (payload) => ({
  type: LOGIN_USER_STATUS,
  payload: payload
})

export const getAccessToken = (loggingInAuthor) => {
  console.log(baseEndpoint)
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(loggingInAuthor),
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log("options", options)
    try {
      console.log("---------inside the getAccessToken action----------")
      const response = await fetch(baseEndpoint + "/users/login", options)
      if (response.ok) {
        const tokens = await response.json()
        const accessToken = await tokens.accessToken

        if (accessToken) {
          console.log("---------access token created----------")
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: accessToken
          })
          localStorage.setItem("accessToken", accessToken)
          try {
            const opts = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
              }
            }
            const userResponse = await fetch(baseEndpoint + "/users/me", opts)
            if (userResponse.ok) {
              const user = await userResponse.json()

              dispatch({
                type: SET_USER_INFO,
                payload: user
              })
              dispatch({
                type: LOGIN_USER_STATUS,
                payload: { status: "success", message: "user successfully logged in" }
              })
            } else {
              console.log("error getting the user")
            }
          } catch (error) {
            console.log("error in trycatch", error)
          }
        } else {
          console.log("access token not created")
        }
      } else {
        const errorResponse = await response.json()
        console.log("error logging in user", errorResponse.message)
        dispatch({
          type: LOGIN_USER_STATUS,
          payload: { status: "fail", message: errorResponse.message }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_USER,
        payload: null
      })
      dispatch({
        type: DELETE_ACCESS_TOKEN,
        payload: null
      })
      dispatch({
        type: LOGIN_USER_STATUS,
        payload: null
      })
      dispatch({
        type: USER_LOCATION,
        payload: "/"
      })
      dispatch({
        type: SET_USER_INFO,
        payload: null
      })
      dispatch({
        type: SIGN_UP_USER_STATUS,
        payload: null
      })
      localStorage.removeItem("accessToken")
      console.log("logged out successfully")
    } catch (error) {
      console.log(error)
    }
  }
}

export const signUpUserStatus = (payload) => ({
  type: SIGN_UP_USER_STATUS,
  payload: payload
})

export const signupUser = (credentials) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      console.log("---------inside the signup action----------")
      const response = await fetch(baseEndpoint + "/users/register", options)
      if (response.ok) {
        dispatch(signUpUserStatus({ status: "success", message: "Signup Success" }))
      } else {
        const errorResponse = await response.json()
        console.log("error registering user", errorResponse.message)
        dispatch(signUpUserStatus({ status: "fail", message: errorResponse.message }))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateUserLocation = (payload) => ({
  type: USER_LOCATION,
  payload: payload
})

export const saveColorPalette = (newPalette) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(newPalette),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside save color plaette action----------")
      const response = await fetch(baseEndpoint + "/users/me/colorLibrary", options)
      if (response.ok) {
        const palettes = await response.json()
        console.log(palettes)
        console.log("new palette created successfully")
        dispatch({
          type: SAVE_COLOR_PALETTE,
          payload: palettes
        })
      } else {
        console.log("error creating new palette")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteColorPalette = (paletteId) => {
  return async (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside delete color palette action----------")
      const response = await fetch(baseEndpoint + `/users/me/colorLibrary/${paletteId}`, options)
      if (response.ok) {
        const palettes = await response.json()
        console.log(palettes)
        console.log("palette deleted successfully")
        dispatch({
          type: DELETE_COLOR_PALETTE,
          payload: palettes
        })
      } else {
        console.log("error deleting palette")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const saveNewProduct = (newProduct) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside save product action----------")
      const response = await fetch(baseEndpoint + "/users/me/products", options)
      if (response.ok) {
        const products = await response.json()
        console.log(products)
        console.log("new product created successfully")
        dispatch({
          type: SAVE_NEW_PRODUCT,
          payload: products
        })
      } else {
        console.log("error creating new product")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside delete product action----------")
      const response = await fetch(baseEndpoint + `/users/me/products/${productId}`, options)
      if (response.ok) {
        const products = await response.json()
        console.log(products)
        console.log("product deleted successfully")
        dispatch({
          type: DELETE_PRODUCT,
          payload: products
        })
      } else {
        console.log("error deleting product")
      }
    } catch (error) {
      console.log(error)
    }
  }
}
