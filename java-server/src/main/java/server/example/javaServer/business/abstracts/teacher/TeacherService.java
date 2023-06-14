package server.example.javaServer.business.abstracts.teacher;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToTeacher;

import java.util.List;

public interface TeacherService {
    DataResult<List<String>> getRelatedPatientIdsByTeacherId(String teacherId);

    DataResult<List<AssignedTestToTeacher>> getAssignedTestsByTeacherId(String teacherId);
}
