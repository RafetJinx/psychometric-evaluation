import * as actionTypes from "./actionTypes";

export function Login(username, password, navigate) {
  return async function (dispatch) {
    let url = `http://localhost:8080/api/users/getUserInfoIfUserRegistered?password=${password}&username=${username}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.success === true) {
        dispatch(loginSuccess(result.success, result.data.id, result.data.role));

        const roleRoutes = {
          admin: "/admin-dashboard",
          doctor: "/doctor-dashboard",
          parent: "/parent-dashboard",
          patient: "/patient-dashboard",
          teacher: "/teacher-dashboard",
        };

        const route = roleRoutes[result.data.role] || "/unknown-role-dashboard";
        navigate(route);
      } else {
        dispatch(loginFailure(result.success));
      }
    } catch (error) {
      throw error;
    }
  };
}

function loginSuccess(isRegistered, userId, role) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      isRegistered,
      userId,
      role,
    },
  };
}

function loginFailure(isRegistered) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: isRegistered,
  };
}
