import { API_ALL_CONTACT, API_URL, POST_LOGIN, GET_GROUP_ROLE, GET_USER,POST_REGISTER } from "../config/constant";


export function servicesSearchFlight(
  origin,
  destination,
  departureDate,
  returnDate,
  adults,
  child,
  infant
) {
  let Body = JSON.stringify({
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    adults: adults,
    children: child,
    infants: infant
  });
  if (returnDate !== "") {
    Body = JSON.stringify({
      origin: origin,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      adults: adults,
      children: child,
      infants: infant
    });
  }
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: Body
  };

  return fetch(API_URL + "flight/search", headers).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if (response.status === 401) {
      //     // auto logout if 401 response returned from api
      //     logout();
      //     location.reload(true);
      // }
      // const error = (data && data.message) || response.statusText;
      // return Promise.reject(error);
    }
    return data;
  });
}

//1. GROUP ROLE 
export function servicesGroupRole(params) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };

  return fetch(API_URL + GET_GROUP_ROLE + `?q=${params.q}&page=${params.page}&limit=${params.limit}`, headers).then(handleResponse);
}

//2. REGISTER
export function servicesRegister(data) {
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'x-platform-source': 'CMS_ASITA',
      'x-sai-source': 'ASITAAJA',
    },
    body: JSON.stringify(data)
  };

  return fetch(API_URL + POST_REGISTER, headers).then(handleResponse);
}

//3. LOGIN
export function servicesLogin(data) {
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(API_URL + POST_LOGIN, headers).then(handleResponse);
}

//4. GET USERS
export function servicesUser(params) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }
  return fetch(API_ALL_CONTACT + `?q=${params.q}&page=${params.page}&limit=${params.limit}`, headers).then(handleResponse);
}


//5. UPDATE USER
export function editUser(id, data) {
  const headers = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'x-platform-source': 'CMS_ASITA',
      'x-sai-source': 'ASITAAJA',
    },
    body: JSON.stringify(data)
  }
  return fetch(API_URL + GET_USER + '/' + id, headers).then(handleResponse);
}

//6. DELETE USER CMS
export function deleteUser(id, token) {
  const headers = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      'x-platform-source': 'CMS_ASITA',
      'x-sai-source': 'ASITAAJA',
    }
  }
  return fetch(API_URL + GET_USER + '/' + id, headers).then(handleResponse);
}
