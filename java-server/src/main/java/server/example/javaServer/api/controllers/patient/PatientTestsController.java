package server.example.javaServer.api.controllers.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.example.javaServer.business.abstracts.patient.PatientTestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/patienttests")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientTestsController {
    private PatientTestService patientTestService;

    @Autowired
    public PatientTestsController(PatientTestService patientTestService) {
        this.patientTestService = patientTestService;
    }

    @GetMapping(value = "/getAllTestInfosByPatientId")
    public DataResult<List<TestInfo>> getTestInfosByPatientId(String patientId){
        return patientTestService.getTestInfosByPatientId(patientId);
    }

    @GetMapping(value = "/getSolvedTestDetailByPatientId")
    public DataResult<List<AssignedTestToPatient>> getSolvedTestDetailByPatientId(String patientId) {
        return patientTestService.getTestDetailByPatientId(patientId, true);
    }

    @GetMapping(value = "/getUnsolvedTestDetailByPatientId")
    public DataResult<List<AssignedTestToPatient>> getUnsolvedTestDetailByPatientId(String patientId) {
        return patientTestService.getTestDetailByPatientId(patientId, false);
    }

    @GetMapping(value = "/getSolvedTestInfosByPatientId")
    public DataResult<List<TestInfo>> getSolvedTestInfosByPatientId(String patientId){
        return patientTestService.getTestInfosByPatientId(patientId, true);
    }

    @GetMapping(value = "/getUnsolvedTestInfosByPatientId")
    public DataResult<List<TestInfo>> getUnsolvedTestInfosByPatientId(String patientId){
        return patientTestService.getTestInfosByPatientId(patientId, false);
    }

    @DeleteMapping(value = "deleteUnsolvedTestFromPatient")
    public DataResult<List<AssignedTestToPatient>> deleteUnsolvedTestFromPatient(String patientId, String testId, int[] addedAt){
        return this.patientTestService.deleteUnsolvedTestFromPatient(patientId, testId, addedAt);
    }

    @PostMapping(value = "/{patientId}/tests")
    public ResponseEntity<DataResult<List<AssignedTestToPatient>>> addTestToPatient(
            @PathVariable String patientId,
            @RequestParam String testId
    ) {
        DataResult<List<AssignedTestToPatient>> result = this.patientTestService.addTestToPatient(patientId, testId);
        return ResponseEntity.ok(result);
    }
}
