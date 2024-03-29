import { SET_USER_INFO } from "./userActions"
export const SAVE_PRODUCTS_FOR_MOODBOARD = "SAVE_PRODUCTS_FOR_MOODBOARD"
export const SAVE_COLOR_PALETTE_FOR_MOODBOARD = "SAVE_COLOR_PALETTE_FOR_MOODBOARD"
export const SAVE_NEW_MOODBOARD = "SAVE_NEW_MOODBOARD"
export const SAVE_TITLE = "SAVE_TITLE"
export const SAVE_SUMMARY = "SAVE_SUMMARY"
export const SAVE_CURRENCY = "SAVE_CURRENCY"
export const SAVE_BUDGET = "SAVE_BUDGET"
export const SAVE_CUSHION = "SAVE_CUSHION"
export const SAVE_INITIALISED_PROJECT = "SAVE_INITIALISED_PROJECT"
export const SELECTED_PROJECT = "SELECTED_PROJECT"
export const UPDATE_PROJECT_DETAILS = "UPDATE_PROJECT_DETAILS"
export const UPDATE_SELECTED_PROJECT = "UPDATE_SELECTED_PROJECT"
export const UPDATE_SELECTED_PROJECT_QUANTITY = "UPDATE_SELECTED_PROJECT_QUANTITY"
export const SET_USER_PROJECTS_HOME = "SET_USER_PROJECTS_HOME"
export const UPDATE_DELETED_PROJECT = "UPDATE_DELETED_PROJECT"
export const DELETE_PRODUCT_IN_MOODBOARD = "DELETE_PRODUCT_IN_MOODBOARD"
export const SELECTED_ARCHIVE_PROJECT = "SELECTED_ARCHIVE_PROJECT"

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

export const saveTitleAction = (payload) => ({
  type: SAVE_TITLE,
  payload: payload
})

export const saveSummaryAction = (payload) => ({
  type: SAVE_SUMMARY,
  payload: payload
})

export const saveCurrencyAction = (payload) => ({
  type: SAVE_CURRENCY,
  payload: payload
})

export const saveBudgetAction = (payload) => ({
  type: SAVE_BUDGET,
  payload: payload
})

export const saveCushionAction = (payload) => ({
  type: SAVE_CUSHION,
  payload: payload
})

export const saveSelectedProject = (payload) => ({
  type: SELECTED_PROJECT,
  payload: payload
})
export const saveSelectedArchiveProject = (payload) => ({
  type: SELECTED_ARCHIVE_PROJECT,
  payload: payload
})

const baseEndpoint = process.env.REACT_APP_BE_URL

export const getAllUserProjects = () => {
  return async (dispatch) => {
    const options = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------getting all the projects---------")
      const response = await fetch(baseEndpoint + "/projects/all", options)
      if (response.ok) {
        const projects = await response.json()

        dispatch({
          type: SET_USER_PROJECTS_HOME,
          payload: projects
        })
      } else {
        console.log("error getting projects")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const initialiseNewProject = (newProject) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(newProject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside save new project action----------")
      const response = await fetch(baseEndpoint + "/projects/new", options)
      if (response.ok) {
        const initialisedProject = await response.json()
        console.log("initialisedProject", initialisedProject)
        console.log("new project created successfully")
        dispatch({
          type: SAVE_INITIALISED_PROJECT,
          payload: initialisedProject
        })
      } else {
        console.log("error creating new project")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addMoodboardImage = (formData, projectId) => {
  return async (dispatch) => {
    const options = {
      method: "PUT",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    console.log("options", options)
    try {
      console.log("---------inside save moodboard image action----------")
      const response = await fetch(baseEndpoint + `/projects/${projectId}/moodboardImage`, options)
      if (response.ok) {
        const initialisedProject = await response.json()
        console.log(initialisedProject)
        console.log("new product created successfully")
        dispatch({
          type: SAVE_INITIALISED_PROJECT,
          payload: initialisedProject
        })

        if (initialisedProject) {
          updateUser()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProjectDetails = (fields, projectId) => {
  return async (dispatch) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside update project action----------")
      const response = await fetch(baseEndpoint + `/projects/${projectId}`, options)
      if (response.ok) {
        const updatedProject = await response.json()
        console.log(updatedProject)
        console.log("project updated successfully")
        dispatch({
          type: UPDATE_PROJECT_DETAILS,
          payload: updatedProject
        })
        dispatch({
          type: UPDATE_SELECTED_PROJECT,
          payload: updatedProject
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProductQuantity = (fields, projectId, productId) => {
  return async (dispatch) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("---------inside update project action----------")
      const response = await fetch(baseEndpoint + `/projects/${projectId}/products/${productId}`, options)
      if (response.ok) {
        const updatedProducts = await response.json()
        console.log(updatedProducts)
        console.log("product quantity updated successfully")

        dispatch({
          type: UPDATE_SELECTED_PROJECT_QUANTITY,
          payload: updatedProducts
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const updateUser = () => {
  return async (dispatch) => {
    try {
      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
      const userResponse = await fetch(baseEndpoint + "/users/me", opts)
      if (userResponse.ok) {
        const user = await userResponse.json()

        dispatch({
          type: SET_USER_INFO,
          payload: user
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProjectAction = (projectId) => {
  return async (dispatch) => {
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      const response = await fetch(baseEndpoint + `/projects/${projectId}`, opts)
      if (response.ok) {
        console.log("project deleted")
        dispatch({
          type: UPDATE_DELETED_PROJECT,
          payload: projectId
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProductInProject = (projectId, productId) => {
  return async (dispatch) => {
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      const response = await fetch(baseEndpoint + `/projects/${projectId}/products/${productId}`, opts)
      if (response.ok) {
        const res = await response.json()
        const products = res.remainingProducts
        console.log("------------product deleted successfully------------", products)
        // dispatch({
        //   type: DELETE_PRODUCT_IN_MOODBOARD,
        //   payload: projectId
        // })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addNewProductToProject = (projectId, productId) => {
  return async (dispatch) => {
    const opts = {
      method: "PATCH",
      body: JSON.stringify({ productId: productId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("------------in the add product action------------")
      const response = await fetch(baseEndpoint + `/projects/${projectId}/products`, opts)
      if (response.ok) {
        console.log("------------product successfully added------------")
        const res = await response.json()
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const moveProjectToArchive = (projectId) => {
  return async () => {
    const opts = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    try {
      console.log("------------in the change status action-----------")
      const response = await fetch(baseEndpoint + `/projects/${projectId}/status`, opts)
      if (response.ok) {
        console.log("---------project status successfully changed----------")
      } else {
        console.log("error changing the project status")
      }
    } catch (error) {
      console.log(error)
    }
  }
}
