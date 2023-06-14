package server.example.javaServer.api.controllers.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.parent.ParentRelatedPatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/parentPatientController")
@CrossOrigin(origins = "http://localhost:3000")
public class ParentRelatedPatientsController {
    private ParentRelatedPatientService parentRelatedPatientService;

    @Autowired
    public ParentRelatedPatientsController(ParentRelatedPatientService parentRelatedPatientService) {
        this.parentRelatedPatientService = parentRelatedPatientService;
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndPatientNumberByParentId")
    public DataResult<List<DptPatientInfo>> getPatientNameAndSurnameAndPatientNumberByParentId(String parentId){
        return this.parentRelatedPatientService.getRelatedPatientNameAndSurnameAndPatientNumberByParentId(parentId);
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndIdByParentIdWithPatientId")
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByParentIdWithPatientId(String parentId, String patientId){
        return this.parentRelatedPatientService.getRelatedPatientNameAndSurnameAndIdByParentIdWithPatientId(parentId, patientId);
    }
}
