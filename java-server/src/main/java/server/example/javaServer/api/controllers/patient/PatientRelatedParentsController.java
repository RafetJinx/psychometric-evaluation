package server.example.javaServer.api.controllers.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.patient.PatientRelatedParentService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/patientRelatedParentsController")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientRelatedParentsController {
    private PatientRelatedParentService patientRelatedParentService;

    @Autowired
    public PatientRelatedParentsController(PatientRelatedParentService patientRelatedParentService) {
        this.patientRelatedParentService = patientRelatedParentService;
    }

    @GetMapping(value = "/getRelatedParentNameAndSurnameAndParentNumberByPatientId")
    public DataResult<List<DptPatientInfo>> getRelatedParentNameAndSurnameAndParentNumberByPatientId(String patientId){
        return this.patientRelatedParentService.getRelatedParentNameAndSurnameAndParentNumberByPatientId(patientId);
    }

}
