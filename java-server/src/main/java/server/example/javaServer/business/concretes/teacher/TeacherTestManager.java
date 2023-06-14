package server.example.javaServer.business.concretes.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.TestService;
import server.example.javaServer.business.abstracts.UserService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.business.abstracts.teacher.TeacherService;
import server.example.javaServer.business.abstracts.teacher.TeacherTestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.dataAccess.abstracts.TeacherDao;
import server.example.javaServer.dataAccess.abstracts.TestDao;
import server.example.javaServer.model.AssignedTestToTeacher;
import server.example.javaServer.model.info.mixedInfo.ParentAndTeacherPatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherTestManager implements TeacherTestService {
    private TeacherDao teacherDao;
    private PatientDao patientDao;
    private TestDao testDao;

    private TeacherService teacherService;

    private PatientService patientService;

    private TestService testService;

    private UserService userService;

    @Autowired
    public TeacherTestManager(TeacherDao teacherDao, PatientDao patientDao, TestDao testDao, TeacherService teacherService, PatientService patientService, TestService testService, UserService userService) {
        this.teacherDao = teacherDao;
        this.patientDao = patientDao;
        this.testDao = testDao;
        this.teacherService = teacherService;
        this.patientService = patientService;
        this.testService = testService;
        this.userService = userService;
    }


    @Override
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getUnsolvedTestsAssignedToTeacherByTeacherId(String teacherId) {
        DataResult<List<AssignedTestToTeacher>> assignedTestsResult = teacherService.getAssignedTestsByTeacherId(teacherId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToTeacher> assignedTests = assignedTestsResult.getData();


        List<ParentAndTeacherPatientTestInfo> infoList = new ArrayList<ParentAndTeacherPatientTestInfo>();

        for(AssignedTestToTeacher assignedTest : assignedTests){
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
                ("Teacher-assigned and unsolved tests were successfully brought in", infoList);
    }

    @Override
    public DataResult<List<ParentAndTeacherPatientTestInfo>> getSolvedTestsAssignedToTeacherByTeacherId(String teacherId) {
        DataResult<List<AssignedTestToTeacher>> assignedTestsResult = teacherService.getAssignedTestsByTeacherId(teacherId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToTeacher> assignedTests = assignedTestsResult.getData();

        List<ParentAndTeacherPatientTestInfo> infoList = new ArrayList<ParentAndTeacherPatientTestInfo>();

        for(AssignedTestToTeacher assignedTest : assignedTests){
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
                ("Teacher-assigned and solved tests were successfully brought in.", infoList);
    }

    @Override
    public DataResult<List<TestInfo>> getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId) {
        DataResult<List<AssignedTestToTeacher>> assignedTestsResult = teacherService.getAssignedTestsByTeacherId(teacherId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToTeacher> assignedTests = assignedTestsResult.getData();

        List<TestInfo> testInfoList = new ArrayList<TestInfo>();

        for(AssignedTestToTeacher assignedTest : assignedTests){

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
                ("Teacher-assigned and unsolved tests were successfully brought in.", testInfoList);
    }

    @Override
    public DataResult<List<TestInfo>> getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(String teacherId, String patientId) {
        DataResult<List<AssignedTestToTeacher>> assignedTestsResult = teacherService.getAssignedTestsByTeacherId(teacherId);
        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToTeacher> assignedTests = assignedTestsResult.getData();

        List<TestInfo> testInfoList = new ArrayList<TestInfo>();

        for(AssignedTestToTeacher assignedTest : assignedTests){

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
                ("Teacher-assigned and solved tests were successfully brought in.", testInfoList);
    }

    @Override
    public DataResult<List<AssignedTestToTeacher>> getTestDetailByTeacherIdAndPatientId(String teacherId, String patientId, boolean isSolved) {
        DataResult<List<AssignedTestToTeacher>> assignedTestsResult = teacherService.getAssignedTestsByTeacherId(teacherId);

        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage());
        }
        List<AssignedTestToTeacher> assignedTests = assignedTestsResult.getData();

        List<AssignedTestToTeacher> tests = new ArrayList<AssignedTestToTeacher>();
        for(AssignedTestToTeacher assignedTest : assignedTests){
            if(assignedTest.getSolved() == isSolved){
                tests.add(assignedTest);
            }
        }

        /**
        if(tests.isEmpty()){
            return new ErrorDataResult<List<AssignedTestToTeacher>>("test list is empty", tests);
        }
         */

        return new SuccessDataResult<List<AssignedTestToTeacher>>("test list is recieved", tests);
    }
}
