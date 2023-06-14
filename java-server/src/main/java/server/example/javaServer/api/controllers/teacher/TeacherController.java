package server.example.javaServer.api.controllers.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.teacher.TeacherService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToTeacher;

import java.util.List;
@RestController
@RequestMapping(value = "/api/teacherController")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {
    private TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping(value = "/getRelatedPatientIdsByTeacherId")
    public DataResult<List<String>> getRelatedPatientIdsByTeacherId(String teacherId){
        return this.teacherService.getRelatedPatientIdsByTeacherId(teacherId);
    }

    @GetMapping(value = "/getAssignedTestsByTeacherId")
    public DataResult<List<AssignedTestToTeacher>> getAssignedTestsByTeacherId(String teacherId){
        return this.teacherService.getAssignedTestsByTeacherId(teacherId);
    }
}