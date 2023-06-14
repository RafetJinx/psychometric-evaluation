package server.example.javaServer.business.abstracts.patient;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.userTypes.Patient;
import server.example.javaServer.model.info.test.PatientTestInfo;

import java.util.List;

public interface PatientService {
    DataResult<Patient> savePatient(Patient patient);

    DataResult<List<Patient>> getAll();

    DataResult<List<AssignedTestToPatient>> findAssignedTestsByPatientId(String patientId);

    DataResult<List<PatientTestInfo>> getPatientAssignedTestInfoByPatientId(String patientId);

    DataResult<List<String>> getPatientDiagnosesByPatientId(String patientId);

}
