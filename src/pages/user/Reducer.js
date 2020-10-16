import { DO_EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED, DO_LIST_USER, LIST_USER_SUCCESS, LIST_USER_FAILED, DO_DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILED } from './../../config/constant'

const INITIAL_STATE = {
  fetchingListUser: false,
  fetchingDelete: false,
  fetchingEdit: false,
  fetchingListLoading: false,
  dataListUser: null,
  dataEditUser: null,
  meta: null
}

export default function dataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // START USER
    case DO_LIST_USER: {
      return {
        ...state,
        fetchingListUser: true,
        fetchingListLoading: true,
      }
    }
    case LIST_USER_SUCCESS: {
      return {
        ...state,
        fetchingListUser: false,
        fetchingListLoading: false,
        dataListUser: action.data,
        meta: action.meta
      }
    }
    case LIST_USER_FAILED: {
      return {
        ...state,
        fetchingListUser: false,
        fetchingListLoading: false,
      }
    }

    //DELETE
    case DO_DELETE_USER: {
      return {
        ...state,
        fetchingDelete: true,
      }
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        fetchingDelete: false,
      }
    }
    case DELETE_USER_FAILED: {
      return {
        ...state,
        fetchingDelete: false
      }
    }
    //EDIT
    case DO_EDIT_USER: {
      return {
        ...state,
        fetchingEdit: true,
        dataEditUser: action.data
      }
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        fetchingEdit: false,
        dataEditUser: action.data
      }
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        fetchingEdit: false
      }
    }
    default:
      return state
  }
}