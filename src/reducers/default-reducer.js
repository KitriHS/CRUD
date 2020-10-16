import { DO_LIST_USER, LIST_USER_FAILED, LIST_USER_SUCCESS, SET_USER_ACTIVE, CLEAR_USER_ACTIVE, DO_GROUP_ROLE, GROUP_ROLE_SUCCESS, GROUP_ROLE_FAILED, DO_REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from "./../config/constant";

const INITIAL_STATE = {
  isLogin: false,
  fetchingLogin: false,
  user: null,
  userRole: null,
  dataGroupRole:null,
  fetchingGroupRole:false,
  fetchingScearch: false,
  dataListUser: null,
  fetchingListUser:false,
  searchingResult: [],
  searchingResultReturn: [],
  searchingQuery: "",
  searchingData: "",
  searchingDataReturn: "",
  isTabActive: 1,
  dataRegister: null,
  fetchingRegister: false
};

export default function dataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
      
    case "CHANGE_TAB": {
      return {
        ...state,
        isTabActive: action.tabs,
        searchingData: action.searchData,
        searchingDataReturn: action.searchDataReturn
      };
    }

    case SET_USER_ACTIVE: {
      return {
        ...state,
        user: action.data,
        userRole: action.data.group_role_id
      };
    }

    case CLEAR_USER_ACTIVE: {
      return {
        ...state,
        user: action.null,
        userRole: null
      };
    }

    // SEARCHING
    case "SEARCHING_REQUEST": {
      return {
        ...state,
        fetchingScearch: true
      };
    }

    case "SEARCHING_SUCCESS": {
      return {
        ...state,
        fetchingScearch: false,
        searchingResult: action.data ? action.data : [],
        searchingResultReturn: action.dataReturn ? action.dataReturn : [],
        searchingQuery: action.query
      };
    }

    case "SEARCHING_FAILED": {
      return {
        ...state,
        fetchingScearch: false,
        searchingResult: [],
        searchingResultReturn: [],
        searchingQuery: ""
      };
    }
    // END SEARCHING
    
    // START GROUP ROLE
    case DO_GROUP_ROLE : {
      return {
        ...state,
        fetchingGroupRole:true
      }
    }

    case GROUP_ROLE_SUCCESS: {
      return {
        ...state,
        fetchingGroupRole: false,
        dataGroupRole: action.data
      }
    }

    case GROUP_ROLE_FAILED: {
      return {
        ...state,
        fetchingGroupRole: false
      }
    }
    //END GROUP ROLE

    // START USER
    case DO_LIST_USER : {
      return {
        ...state,
        fetchingListUser: true
      }
    }

    case LIST_USER_SUCCESS: {
      return {
        ...state,
        fetchingListUser: false,
        dataListUser:  action.data
      }
    }

    case LIST_USER_FAILED: {
      return {
        ...state,
        fetchingListUser: false
      }
    }
    // END USER

    // START REGISTER
    case DO_REGISTER : {
      return {
        ...state,
        fetchingRegister: true
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        fetchingRegister: false,
        dataListUser:  action.data
      }
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        fetchingRegister: false
      }
    }
    // END REGISTER

    default:
      return state;
  }
}
