import * as actionTypes from '../actionTypes';

export function getDoctorRelatedPatients(doctorId) {
  return async function(dispatch) {
    try {
      const url = `http://localhost:8080/api/doctorPatientsController/getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId?doctorId=${doctorId}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.success === true) {
        dispatch(setRelatedPatients(result.data));
      }
    } catch (error) {
      throw error;
    }
  };
}

export function getParentRelatedPatients(parentId) {
  return async function(dispatch) {
    try {
      const url = `http://localhost:8080/api/parentPatientController/getRelatedPatientNameAndSurnameAndPatientNumberByParentId?parentId=${parentId}`;
    const response = await fetch(url);
      const result = await response.json();

      if (result.success === true) {
        dispatch(setRelatedPatients(result.data));
      }
    } catch (error) {
      throw error;
    }
  };
}

export function getTeacherRelatedPatients(teacherId) {
  return async function(dispatch) {
    try {
      const url = `http://localhost:8080/api/teacherPatientController/getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId?teacherId=${teacherId}`;
    const response = await fetch(url);
      const result = await response.json();

      if (result.success === true) {
        dispatch(setRelatedPatients(result.data));
      }
    } catch (error) {
      throw error;
    }
  };
}

function setRelatedPatients(data) {
  return {
    type: actionTypes.SET_RELATED_PATIENTS,
    payload: data
  };
}
