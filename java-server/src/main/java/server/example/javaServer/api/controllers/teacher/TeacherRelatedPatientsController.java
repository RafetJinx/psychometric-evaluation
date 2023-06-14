package server.example.javaServer.api.controllers.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.teacher.TeacherRelatedPatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/teacherPatientController")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherRelatedPatientsController {
    private TeacherRelatedPatientService teacherRelatedPatientService;

    @Autowired
    public TeacherRelatedPatientsController(TeacherRelatedPatientService teacherRelatedPatientService) {
        this.teacherRelatedPatientService = teacherRelatedPatientService;
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId")
    public DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId(String teacherId){
        return this.teacherRelatedPatientService.getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId(teacherId);
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndIdByTeacherIdWithTeacherId")
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByTeacherIdWithTeacherId(String teacherId, String patientId){
        return this.teacherRelatedPatientService.getRelatedPatientNameAndSurnameAndIdByTeacherIdWithTeacherId(teacherId, patientId);
    }

}
