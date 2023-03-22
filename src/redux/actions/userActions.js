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
export const ADD_INSPO_IMAGES = "ADD_INSPO_IMAGES"
export const DELETE_INSPO = "DELETE_INSPO"
export const SET_USER_PROJECTS = "SET_USER_PROJECTS"
export const UPDATE_USER_USERNAME = "UPDATE_USER_USERNAME"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_CURRENCY = "UPDATE_USER_CURRENCY"
export const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR"

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
              dispatch({
                type: SET_USER_PROJECTS,
                payload: user.projects
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
export const saveNewProductFromImageUpload = (formData) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside save product action----------")
      const response = await fetch(baseEndpoint + "/users/me/products/imageUpload", options)
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

export const saveInspoImagesFromDragDrop = (formData) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("formData----------", formData)
      console.log("---------inside save product action----------")
      const response = await fetch(baseEndpoint + "/users/me/inspo", options)
      if (response.ok) {
        const inspo = await response.json()
        console.log(inspo)
        console.log("inspo images added successfully")
        dispatch({
          type: ADD_INSPO_IMAGES,
          payload: inspo
        })
      } else {
        console.log("error adding inspo images")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteInspo = (inspoId) => {
  return async (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside delete inspo action----------")
      const response = await fetch(baseEndpoint + `/users/me/inspo/${inspoId}`, options)
      if (response.ok) {
        const inspo = await response.json()
        console.log(inspo)
        console.log("inspo deleted successfully")
        dispatch({
          type: DELETE_INSPO,
          payload: inspo
        })
      } else {
        console.log("error deleting inspo")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeUsernameAction = (username) => {
  return async (dispatch) => {
    const opts = {
      method: "PUT",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    try {
      const response = await fetch(baseEndpoint + `/users/me/username`, opts)
      if (response.ok) {
        const updated = await response.json()
        console.log("updatedUsername", updated)
        const userName = updated.username
        dispatch({
          type: UPDATE_USER_USERNAME,
          payload: userName
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeEmailAction = (email) => {
  return async (dispatch) => {
    const opts = {
      method: "PUT",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    try {
      const response = await fetch(baseEndpoint + `/users/me/email`, opts)
      if (response.ok) {
        const updated = await response.json()
        console.log("updatedEmail", updated)
        const newEmail = updated.email
        dispatch({
          type: UPDATE_USER_EMAIL,
          payload: newEmail
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeCurrencyAction = (currency) => {
  return async (dispatch) => {
    const opts = {
      method: "PUT",
      body: JSON.stringify({ currency: currency }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    try {
      const response = await fetch(baseEndpoint + `/users/me/currency`, opts)
      if (response.ok) {
        const updated = await response.json()
        console.log("updatedCurrency", updated)
        const newCurrency = updated.currency
        dispatch({
          type: UPDATE_USER_CURRENCY,
          payload: newCurrency
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const changePasswordAction = (fields) => {
  return async (dispatch) => {
    const opts = {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    try {
      console.log("------in the save password action--------")
      const response = await fetch(baseEndpoint + `/users/me/newpassword`, opts)

      if (response.ok) {
        console.log("------in the save password action SUCCESS--------")
        const updatedPassword = await response.json()
        console.log("updatedPassword", updatedPassword)
        const newAccessToken = updatedPassword.accessToken
        console.log("newAccessToken", newAccessToken)

        if (newAccessToken) {
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: newAccessToken
          })
          dispatch({
            type: SET_PASSWORD_ERROR,
            payload: null
          })
          localStorage.setItem("accessToken", newAccessToken)
        } else {
          console.log("there was an error updating the password")
        }
      } else {
        const errorResponse = await response.json()
        console.log("Error response from server:", errorResponse)
        dispatch({
          type: SET_PASSWORD_ERROR,
          payload: errorResponse.message || "Wrong current password."
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: SET_PASSWORD_ERROR,
        payload: "An error occurred while updating the password."
      })
    }
  }
}
