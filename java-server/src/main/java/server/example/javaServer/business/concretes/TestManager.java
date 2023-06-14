package server.example.javaServer.business.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.TestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.TestDao;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestManager implements TestService {
    private TestDao testDao;

    @Autowired
    public TestManager(TestDao testDao) {
        this.testDao = testDao;
    }

    @Override
    public DataResult<List<Test>> getAll() {
        List<Test> tests = testDao.findAll();
        if(tests == null){
            return new ErrorDataResult<List<Test>>("Tests is null", null);
        }
        else if(tests.isEmpty()){
            return new ErrorDataResult<List<Test>>("No tests found", tests);
        }
        else {
            return new SuccessDataResult<List<Test>>("All tests were brought.", tests);
        }
    }

    @Override
    public DataResult<Test> getTestById(String testId) {
        Test test = testDao.getTestById(testId);

        if(test == null){
            return new ErrorDataResult<TestInfo>("Test not found", null);
        }

        return  new SuccessDataResult<Test>("Test was found.", test);
    }

    @Override
    public DataResult<TestInfo> getNameAndTestCodeById(String testId) {
        Test test = testDao.getNameAndTestCodeById(testId);

        if(test == null) {
            return new ErrorDataResult<TestInfo>("Test not found", null);
        }

        TestInfo testInfo = new TestInfo(test.getId(), test.getName(), test.getTestCode());

        return new SuccessDataResult<TestInfo>("Test name and test code were brought.", testInfo);
    }

    @Override
    public DataResult<List<TestInfo>> getPatientCanSolveTests() {
        DataResult<List<Test>> testsDataResult = this.getAll();
        if(!testsDataResult.isSuccess()){
            return new ErrorDataResult<List<Test>>(testsDataResult.getMessage(), testsDataResult.getData());
        }
        List<Test> tests = testsDataResult.getData();

        List<TestInfo> testInfos = new ArrayList<TestInfo>();
        for(Test test : tests){
            List<String> canSolveUserTypes = test.getCanSolve();
            for(String userType : canSolveUserTypes){
                if(userType.equals("patient")){
                    testInfos.add(new TestInfo(test.getId(), test.getName(), test.getTestCode()));
                }
            }
        }

        if(testInfos.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("testInfos is empty", testInfos);
        }

        return new SuccessDataResult<List<TestInfo>>("Patient can solve tests recieved.", testInfos);
    }

    @Override
    public DataResult<List<TestInfo>> getParentCanSolveTests() {
        DataResult<List<Test>> testsDataResult = this.getAll();
        if(!testsDataResult.isSuccess()){
            return new ErrorDataResult<List<Test>>(testsDataResult.getMessage(), testsDataResult.getData());
        }
        List<Test> tests = testsDataResult.getData();

        List<TestInfo> testInfos = new ArrayList<TestInfo>();
        for(Test test : tests){
            List<String> canSolveUserTypes = test.getCanSolve();
            for(String userType : canSolveUserTypes){
                if(userType.equals("parent")){
                    testInfos.add(new TestInfo(test.getId(), test.getName(), test.getTestCode()));
                }
            }
        }

        if(testInfos.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("testInfos is empty", testInfos);
        }

        return new SuccessDataResult<List<TestInfo>>("Parent can solve tests recieved.", testInfos);
    }

    @Override
    public DataResult<List<TestInfo>> getTeacherCanSolveTests() {
        DataResult<List<Test>> testsDataResult = this.getAll();
        if(!testsDataResult.isSuccess()){
            return new ErrorDataResult<List<Test>>(testsDataResult.getMessage(), testsDataResult.getData());
        }
        List<Test> tests = testsDataResult.getData();

        List<TestInfo> testInfos = new ArrayList<TestInfo>();
        for(Test test : tests){
            List<String> canSolveUserTypes = test.getCanSolve();
            for(String userType : canSolveUserTypes){
                if(userType.equals("teacher")){
                    testInfos.add(new TestInfo(test.getId(), test.getName(), test.getTestCode()));
                }
            }
        }

        if(testInfos.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("testInfos is empty", testInfos);
        }

        return new SuccessDataResult<List<TestInfo>>("Teacher can solve tests recieved.", testInfos);
    }


}
