package server.example.javaServer.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.TestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

@RestController
@RequestMapping(value = "/api/tests")
@CrossOrigin(origins = "http://localhost:3000")
public class TestsController {
    private TestService testService;

    @Autowired
    public TestsController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping(value = "/getAll")
    public DataResult<List<Test>> getAll(){
        return this.testService.getAll();
    }

    @GetMapping(value = "/getTestById")
    public DataResult<Test> getTestById(String testId){
        return this.testService.getTestById(testId);
    }

    @GetMapping(value = "/getNameAndTestCodeById")
    public DataResult<TestInfo> getNameAndTestCodeById(String testId){
        return this.testService.getNameAndTestCodeById(testId);
    }

    @GetMapping(value = "/getPatientCanSolveTests")
    public DataResult<List<TestInfo>> getPatientCanSolveTests(){
        return this.testService.getPatientCanSolveTests();
    }

    @GetMapping(value = "/getParentCanSolveTests")
    public DataResult<List<TestInfo>> getParentCanSolveTests(){
        return this.testService.getParentCanSolveTests();
    }

    @GetMapping(value = "/getTeacherCanSolveTests")
    public DataResult<List<TestInfo>> getTeacherCanSolveTests(){
        return this.testService.getTeacherCanSolveTests();
    }
}
