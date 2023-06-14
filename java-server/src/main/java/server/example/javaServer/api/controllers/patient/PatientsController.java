package server.example.javaServer.api.controllers.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.userTypes.Patient;
import server.example.javaServer.model.info.test.PatientTestInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientsController {
    private PatientService patientService;

    @Autowired
    public PatientsController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping(value = "/getAll")
    public DataResult<List<Patient>> getAll() {
        return this.patientService.getAll();
    }


    @GetMapping(value = "/findAssignedTestsByPatientId")
    public DataResult<List<AssignedTestToPatient>> findPatientByAssignedTests(@RequestParam String patientId){
        return this.patientService.findAssignedTestsByPatientId(patientId);
    }

    @GetMapping(value = "/getPatientAssignedTestByPatientId")
    public DataResult<List<PatientTestInfo>> getPatientAssignedTestByPatientId(String patientId){
        return this.patientService.getPatientAssignedTestInfoByPatientId(patientId);
    }

    @GetMapping(value = "/getPatientDiagnosesByPatientId")
    public DataResult<List<String>> getPatientDiagnosesByPatientId(String patientId){
        return this.patientService.getPatientDiagnosesByPatientId(patientId);
    }
}
