package server.example.javaServer.api.controllers.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.parent.ParentService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToParent;

import java.util.List;

@RestController
@RequestMapping(value = "/api/parentController")
@CrossOrigin(origins = "http://localhost:3000")
public class ParentController {
    private ParentService parentService;

    @Autowired
    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @GetMapping(value = "/getRelatedPatientIdsByParentId")
    public DataResult<List<String>> getRelatedPatientIdsByParentId(String parentId){
        return this.parentService.getRelatedPatientIdsByParentId(parentId);
    }

    @GetMapping(value = "/getAssignedTestsByParentId")
    public DataResult<List<AssignedTestToParent>> getAssignedTestsByParentId(String parentId){
        return this.parentService.getAssignedTestsByParentId(parentId);
    }
}
