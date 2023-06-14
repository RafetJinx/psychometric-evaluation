package server.example.javaServer.api.controllers.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.patient.PatientRelatedParentService;
import server.example.javaServer.business.abstracts.patient.PatientRelatedTeacherService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/patientRelatedTeachersController")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientRelatedTeachersController {
    private PatientRelatedTeacherService patientRelatedTeacherService;

    @Autowired
    public PatientRelatedTeachersController(PatientRelatedTeacherService patientRelatedTeacherService) {
        this.patientRelatedTeacherService = patientRelatedTeacherService;
    }

    @GetMapping(value = "/getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId")
    public DataResult<List<DptPatientInfo>> getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(String patientId){
        return this.patientRelatedTeacherService.getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(patientId);
    }
}
