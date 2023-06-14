package server.example.javaServer.business.abstracts.parent;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToParent;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.PatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

public interface ParentTestService {
    DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToParentByParentId(String parentId);

    DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToParentByParentId(String parentId);

    DataResult<List<TestInfo>> getUnsolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId);

    DataResult<List<TestInfo>> getSolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId);

    DataResult<List<AssignedTestToParent>> getTestDetailByParentIdAndPatientId(String parentId, String patientId, boolean isSolved);
}
