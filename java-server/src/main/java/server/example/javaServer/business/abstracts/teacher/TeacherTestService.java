package server.example.javaServer.business.abstracts.teacher;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToTeacher;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

public interface TeacherTestService {
    DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToTeacherByTeacherId(String teacherId);

    DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToTeacherByTeacherId(String teacherId);

    DataResult<List<TestInfo>> getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId);

    DataResult<List<TestInfo>> getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId);

    DataResult<List<AssignedTestToTeacher>> getTestDetailByTeacherIdAndPatientId(String teacherId, String patientId, boolean isSolved);
}
