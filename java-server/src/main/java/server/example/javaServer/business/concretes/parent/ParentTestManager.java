package server.example.javaServer.business.concretes.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.TestService;
import server.example.javaServer.business.abstracts.UserService;
import server.example.javaServer.business.abstracts.parent.ParentService;
import server.example.javaServer.business.abstracts.parent.ParentTestService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.ParentDao;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.dataAccess.abstracts.TestDao;
import server.example.javaServer.model.AssignedTestToParent;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParentTestManager implements ParentTestService {
    private ParentDao parentDao;
    private PatientDao patientDao;
    private TestDao testDao;

    private ParentService parentService;

    private PatientService patientService;

    private TestService testService;

    private UserService userService;

    @Autowired
    public ParentTestManager(ParentDao parentDao, PatientDao patientDao, TestDao testDao, ParentService parentService, PatientService patientService, TestService testService, UserService userService) {
        this.parentDao = parentDao;
        this.patientDao = patientDao;
        this.testDao = testDao;
        this.parentService = parentService;
        this.patientService = patientService;
        this.testService = testService;
        this.userService = userService;
    }

    @Override
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToParentByParentId(String parentId) {
        DataResult<List<AssignedTestToParent>> assignedTestsResult = parentService.getAssignedTestsByParentId(parentId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToParent> assignedTests = assignedTestsResult.getData();


        List<ParentAndTeacherPatientTestInfo> infoList = new ArrayList<ParentAndTeacherPatientTestInfo>();

        for(AssignedTestToParent assignedTest : assignedTests){
            if(assignedTest.getSolved() == false){
                DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(assignedTest.getTestId());
                if(!testInfoDataResult.isSuccess()){
                    return new ErrorDataResult<TestInfo>(testInfoDataResult.getMessage(),testInfoDataResult.getData());
                }
                TestInfo testInfo = testInfoDataResult.getData();


                DataResult<UserInfo> userInfoDataResult = userService.getUserInfoByUserId(assignedTest.getRelatedPatient());
                if(!userInfoDataResult.isSuccess()){
                    return new ErrorDataResult<UserInfo>(userInfoDataResult.getMessage(),userInfoDataResult.getData());
                }
                UserInfo userInfo = userInfoDataResult.getData();

                infoList.add(new ParentAndTeacherPatientTestInfo(
                        userInfo.getId(),
                        userInfo.getName(),
                        userInfo.getSurname(),
                        testInfo.getTestCode(),
                        testInfo.getName()
                ));
            }
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<ParentAndTeacherPatientTestInfo>>("Test info list is empty", infoList);
        }

        return new SuccessDataResult<List<ParentAndTeacherPatientTestInfo>>
                ("Parent-assigned and unsolved tests were successfully brought in", infoList);
    }

    @Override
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToParentByParentId(String parentId) {
        DataResult<List<AssignedTestToParent>> assignedTestsResult = parentService.getAssignedTestsByParentId(parentId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToParent> assignedTests = assignedTestsResult.getData();

        List<ParentAndTeacherPatientTestInfo> infoList = new ArrayList<ParentAndTeacherPatientTestInfo>();

        for(AssignedTestToParent assignedTest : assignedTests){
            if(assignedTest.getSolved() == true){
                DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(assignedTest.getTestId());
                if(!testInfoDataResult.isSuccess()){
                    return new ErrorDataResult<TestInfo>(testInfoDataResult.getMessage(),testInfoDataResult.getData());
                }
                TestInfo testInfo = testInfoDataResult.getData();


                DataResult<UserInfo> userInfoDataResult = userService.getUserInfoByUserId(assignedTest.getRelatedPatient());
                if(!userInfoDataResult.isSuccess()){
                    return new ErrorDataResult<UserInfo>(userInfoDataResult.getMessage(),userInfoDataResult.getData());
                }
                UserInfo userInfo = userInfoDataResult.getData();

                infoList.add(new ParentAndTeacherPatientTestInfo(
                        userInfo.getId(),
                        userInfo.getName(),
                        userInfo.getSurname(),
                        testInfo.getTestCode(),
                        testInfo.getName()
                ));
            }
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<ParentAndTeacherPatientTestInfo>>("Test info list is empty", infoList);
        }

        return new SuccessDataResult<List<ParentAndTeacherPatientTestInfo>>
                ("Parent-assigned and solved tests were successfully brought in.", infoList);
    }

    @Override
    public DataResult<List<TestInfo>> getUnsolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId) {
        DataResult<List<AssignedTestToParent>> assignedTestsResult = parentService.getAssignedTestsByParentId(parentId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToParent> assignedTests = assignedTestsResult.getData();

        List<TestInfo> testInfoList = new ArrayList<TestInfo>();

        for(AssignedTestToParent assignedTest : assignedTests){

            if(assignedTest.getRelatedPatient().equals(patientId)){
                 if(assignedTest.getSolved() == false){
                     DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(assignedTest.getTestId());

                     if(!testInfoDataResult.isSuccess()){
                         return new ErrorDataResult<TestInfo>(testInfoDataResult.getMessage(), testInfoDataResult.getData());
                     }

                    testInfoList.add(testInfoDataResult.getData());
                }
            }
        }

        if(testInfoList.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("Test info list is empty", testInfoList);
        }

        return new SuccessDataResult<List<TestInfo>>
                ("Parent-assigned and unsolved tests were successfully brought in.", testInfoList);
    }

    @Override
    public DataResult<List<TestInfo>> getSolvedTestAssignedToParentByParentIdWithPatientId(String parentId, String patientId) {
        DataResult<List<AssignedTestToParent>> assignedTestsResult = parentService.getAssignedTestsByParentId(parentId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToParent> assignedTests = assignedTestsResult.getData();

        List<TestInfo> testInfoList = new ArrayList<TestInfo>();

        for(AssignedTestToParent assignedTest : assignedTests){

            if(assignedTest.getRelatedPatient().equals(patientId)){
                if(assignedTest.getSolved() == true){
                    DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(assignedTest.getTestId());

                    if(!testInfoDataResult.isSuccess()){
                        return new ErrorDataResult<TestInfo>(testInfoDataResult.getMessage(), testInfoDataResult.getData());
                    }

                    testInfoList.add(testInfoDataResult.getData());
                }
            }
        }

        if(testInfoList.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("Test info list is empty", testInfoList);
        }

        return new SuccessDataResult<List<TestInfo>>
                ("Parent-assigned and solved tests were successfully brought in.", testInfoList);
    }

    @Override
    public DataResult<List<AssignedTestToParent>> getTestDetailByParentIdAndPatientId(String parentId, String patientId, boolean isSolved) {
        DataResult<List<AssignedTestToParent>> assignedTestsResult = parentService.getAssignedTestsByParentId(parentId);

        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToParent> assignedTests = assignedTestsResult.getData();

        List<AssignedTestToParent> tests = new ArrayList<AssignedTestToParent>();
        for(AssignedTestToParent assignedTest : assignedTests){
            if(assignedTest.getSolved() == isSolved){
                tests.add(assignedTest);
            }
        }

        /**
        if(tests.isEmpty()){
            return new ErrorDataResult<List<AssignedTestToParent>>("test list is empty", tests);
        }
         */

        return new SuccessDataResult<List<AssignedTestToParent>>("test list is recieved", tests);
    }
}
