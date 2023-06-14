package server.example.javaServer.business.abstracts.patient;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.info.test.PatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

public interface PatientTestService {
    DataResult<List<TestInfo>> testInfosByPatientId(List<PatientTestInfo> patientTestInfos);

    DataResult<List<TestInfo>> testInfosByPatientId(List<PatientTestInfo> patientTestInfos, boolean isSolved);

    DataResult<List<TestInfo>> getTestInfosByPatientId(String patientId);

    DataResult<List<AssignedTestToPatient>> getTestDetailByPatientId(String patientId, boolean isSolved);
    DataResult<List<TestInfo>> getTestInfosByPatientId(String patientId, boolean isSolved);

    DataResult<List<AssignedTestToPatient>> deleteUnsolvedTestFromPatient(String patientId, String testId, int[] addedAt);

    DataResult<List<AssignedTestToPatient>> addTestToPatient(String patientId, String testId);
}
