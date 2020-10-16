import { servicesUser, deleteUser, editUser } from "./../../services/webServices";
import { DO_EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED, DO_LIST_USER, LIST_USER_SUCCESS, LIST_USER_FAILED, RESET_USER_SUCCESS, DO_DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILED } from "./../../config/constant";

// USER ACTION
export function userAction(dispatch, params, token) {
  dispatch(doUser());
  return servicesUser(params, token)
    .then(res => {
      console.log('cek RES', res)
      setTimeout(() => {
        dispatch(userSuccess(res.data));
      }, 3000);
    })
    .catch(() => {
      return dispatch(userFailed(false));
    });
}
// USER ACTION

//RESET LIST USER
export function resetUserAction(dispatch) {
  dispatch(resetListUserSuccess())
}

function doUser() {
  return {
    type: DO_LIST_USER,
  };
}

function userSuccess(payload, meta) {
  return {
    type: LIST_USER_SUCCESS,
    data: payload,
    meta: meta
  };
}

function userFailed() {
  return {
    type: LIST_USER_FAILED
  };
}

function resetListUserSuccess(payload) {
  return {
    type: RESET_USER_SUCCESS,
    data: payload
  }
}
//RESET LIST USER

//DELETE USER
export function userDelete(dispatch, params, token, callback) {
  dispatch(doDelete());
  return deleteUser(params.id, token)
    .then(res => {
      dispatch(deleteSuccess(res));
      callback.call(this, res);
    })
    .catch(() => {
      return dispatch(deleteFailed(false));
    });
}

function doDelete() {
  return {
    type: DO_DELETE_USER,
  };
}

function deleteSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    data: payload,
  };
}

function deleteFailed() {
  return {
    type: DELETE_USER_FAILED
  };
}
//DELETE USER

//EDIT USER
// export function userEditAction(dispatch,id, data, token , callback) {
//   dispatch(doEdit());
//   return editUser(id, data, token)
//     .then(res => {
//       dispatch(editSuccess(res));
//       callback.call(this,res.data);
//     })
//     .catch((e) => {
//       return dispatch(editFailed(false));
//     });
// }
export function userEditAction(dispatch, id, data, token, callback) {
  dispatch(doEdit());
  return editUser(id, data, token)
    .then(res => {
      dispatch(editSuccess(res));
      callback.call(this, res);
    })
    .catch(() => {
      return dispatch(editFailed(false));
    });
}

function doEdit(payload) {
  return {
    type: DO_EDIT_USER,
    data: payload
  };
}

function editSuccess(payload) {
  return {
    type: EDIT_USER_SUCCESS,
    data: payload
  }
}

function editFailed() {
  return {
    type: EDIT_USER_FAILED
  }
}
//EDIT USER



