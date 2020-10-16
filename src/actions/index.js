import { servicesSearchFlight, servicesGroupRole } from "../services/webServices";
import { DO_GROUP_ROLE, GROUP_ROLE_SUCCESS, GROUP_ROLE_FAILED } from "../config/constant";

export function changeActiveTabs(tabs, searchData, searchDataReturn) {
  return {
    type: "CHANGE_TAB",
    tabs: tabs,
    searchData: searchData,
    searchDataReturn: searchDataReturn
  };
}

// SEARCH ====================================
export function searchFlight(
  origin,
  destination,
  departureDate,
  returnDate,
  adults,
  child,
  infant
) {
  return dispatch => {
    dispatch(searchingRequest());

    return servicesSearchFlight(
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      child,
      infant
    )
      .then(res => {
        if (res.status) {
          const query = {
            origin: origin,
            destination: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: adults,
            child: child,
            infant: infant
          };
          return dispatch(
            searchingSuccess(res.data[0].dep, res.data[0].ret, query)
          );
        } else {
          return dispatch(searchingFailed());
        }
      })
      .catch(err => {
        return dispatch(searchingFailed());
      });
  };
}

export function searchingRequest() {
  return {
    type: "SEARCHING_REQUEST"
  };
}

export function searchingSuccess(data, dataReturn, query) {
  return {
    type: "SEARCHING_SUCCESS",
    data: data,
    dataReturn: dataReturn,
    query: query
  };
}

export function searchingFailed() {
  return {
    type: "SEARCHING_FAILED"
  };
}

//GET GROUP ROLE 
export function getGroupRoleAction(dispatch, params) {
  dispatch(doGroupRole())
  return servicesGroupRole(params)
  .then( res => {
    dispatch(groupRoleSuccess(res.data));
  })
  .catch(err => {
    return dispatch(groupRoleFailed(false))
  })
}
function doGroupRole(payload) {
    return {
      type: DO_GROUP_ROLE,
      data: payload
    }
  }
  
  function groupRoleSuccess(payload) {
    return {
      type: GROUP_ROLE_SUCCESS,
      data: payload
    }
  }
  
  function groupRoleFailed() {
    return {
      type: GROUP_ROLE_FAILED
    }
  }

//END GROUP ROLE


