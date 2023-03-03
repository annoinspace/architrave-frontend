export const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN"
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_USER_INFO = "SET_USER_INFO"
export const DELETE_ACCESS_TOKEN = "DELETE_ACCESS_TOKEN"
export const LOGOUT_USER = "LOGOUT_USER"

const baseEndpoint = process.env.REACT_APP_BE_URL

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
        console.log("response", response)
        const tokens = await response.json()
        const accessToken = await tokens.accessToken
        console.log("dispatching accessToken", accessToken)

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
              console.log("response of /users/me user", user)
              dispatch({
                type: SET_USER_INFO,
                payload: user
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
        console.log("-------error with getting a response ----------")
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
        type: "LOGOUT_USER",
        payload: null
      })
      dispatch({
        type: "DELETE_ACCESS_TOKEN",
        payload: null
      })
      localStorage.removeItem("accessToken")
      console.log("logged out successfully")
    } catch (error) {
      console.log(error)
    }
  }
}
