package server.example.javaServer.api.controllers.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.teacher.TeacherTestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToTeacher;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/teachertests")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherTestController {
    private TeacherTestService teacherTestService;

    @Autowired
    public TeacherTestController(TeacherTestService teacherTestService) {
        this.teacherTestService = teacherTestService;
    }

    @GetMapping(value = "/getUnsolvedTestsAssignedToTeacherByTeacherId")
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToTeacherByTeacherId(String teacherId){
        return this.teacherTestService.getUnsolvedTestsAssignedToTeacherByTeacherId(teacherId);
    }

    @GetMapping(value = "/getSolvedTestsAssignedToTeacherByTeacherId")
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToTeacherByTeacherId(String teacherId){
        return this.teacherTestService.getSolvedTestsAssignedToTeacherByTeacherId(teacherId);
    }

    @GetMapping(value = "/getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId")
    public DataResult<List<TestInfo>> getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId){
        return this.teacherTestService.getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(teacherId, patientId);
    }

    @GetMapping(value = "/getSolvedTestAssignedToTeacherByTeacherIdWithPatientId")
    public DataResult<List<TestInfo>> getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId){
        return this.teacherTestService.getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(teacherId, patientId);
    }

    @GetMapping(value = "/getSolvedTestDetailByTeacherIdAndPatientId")
    public DataResult<List<AssignedTestToTeacher>> getSolvedTestDetailByTeacherIdAndPatientId(String teacherId, String patientId){
        return this.teacherTestService.getTestDetailByTeacherIdAndPatientId(teacherId, patientId, true);
    }

    @GetMapping(value = "/getUnsolvedTestDetailByTeacherIdAndPatientId")
    public DataResult<List<AssignedTestToTeacher>> getUnsolvedTestDetailByTeacherIdAndPatientId(String teacherId, String patientId){
        return this.teacherTestService.getTestDetailByTeacherIdAndPatientId(teacherId, patientId, false);
    }



}
