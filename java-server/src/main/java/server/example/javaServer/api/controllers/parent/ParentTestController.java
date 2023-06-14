package server.example.javaServer.api.controllers.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.parent.ParentTestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToParent;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/parenttests")
@CrossOrigin(origins = "http://localhost:3000")
public class ParentTestController {
    private ParentTestService parentTestService;

    @Autowired
    public ParentTestController(ParentTestService parentTestService) {
        this.parentTestService = parentTestService;
    }

    @GetMapping(value = "/getSolvedTestsAssignedToParentByParentId")
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToParentByParentId(String parentId){
        return this.parentTestService.getSolvedTestsAssignedToParentByParentId(parentId);
    }

    @GetMapping(value = "/getUnsolvedTestsAssignedToParentByParentId")
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToParentByParentId(String parentId){
        return this.parentTestService.getUnsolvedTestsAssignedToParentByParentId(parentId);
    }

    @GetMapping(value = "/getUnsolvedTestAssignedToParentByParentIdWithPatientId")
    public DataResult<List<TestInfo>> getUnsolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId){
        return this.parentTestService.getUnsolvedTestAssignedToParentByParentIdWithPatientId(parentId, patientId);
    }

    @GetMapping(value = "/getSolvedTestAssignedToParentByParentIdWithPatientId")
    public DataResult<List<TestInfo>> getSolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId){
        return this.parentTestService.getSolvedTestAssignedToParentByParentIdWithPatientId(parentId, patientId);
    }

    @GetMapping(value = "/getSolvedTestDetailByParentIdAndPatientId")
    public DataResult<List<AssignedTestToParent>> getSolvedTestDetailByParentIdAndPatientId(String parentId, String patientId){
        return this.parentTestService.getTestDetailByParentIdAndPatientId(parentId, patientId, true);
    }

    @GetMapping(value = "/getUnsolvedTestDetailByParentIdAndPatientId")
    public DataResult<List<AssignedTestToParent>> getUnsolvedTestDetailByParentIdAndPatientId(String parentId, String patientId){
        return this.parentTestService.getTestDetailByParentIdAndPatientId(parentId, patientId, false);
    }
}
