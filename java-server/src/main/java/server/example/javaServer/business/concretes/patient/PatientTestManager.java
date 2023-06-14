package server.example.javaServer.business.concretes.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.business.abstracts.patient.PatientTestService;
import server.example.javaServer.business.abstracts.TestService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.dataAccess.abstracts.TestDao;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.info.test.PatientTestInfo;
import server.example.javaServer.model.info.test.TestInfo;
import server.example.javaServer.model.userTypes.Patient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@Service
public class PatientTestManager implements PatientTestService {

    private PatientDao patientDao;
    private TestDao testDao;
    private PatientService patientService;
    private TestService testService;

    @Autowired
    public PatientTestManager(PatientDao patientDao, TestDao testDao, PatientService patientService, TestService testService) {
        this.patientDao = patientDao;
        this.testDao = testDao;
        this.patientService = patientService;
        this.testService = testService;
    }

    @Override
    public DataResult<List<TestInfo>> testInfosByPatientId(List<PatientTestInfo> patientTestInfos){
        if(patientTestInfos.isEmpty()){
            return new ErrorDataResult<List<PatientTestInfo>>("'patientTestInfos' parameter argument haven't any element", patientTestInfos);
        }


        List<TestInfo> testInfos = new ArrayList<TestInfo>();
        for(PatientTestInfo patientTestInfo : patientTestInfos){
            DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(patientTestInfo.getId());
            if(!testInfoDataResult.isSuccess()){
                continue;
            }
            TestInfo testInfo = testInfoDataResult.getData();


            testInfos.add(new TestInfo(
                    testInfo.getId(),
                    testInfo.getName(),
                    testInfo.getTestCode()
            ));
        }


        if(testInfos.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("Request fulfilled successfully but testInfos list is empty", testInfos);
        }


        return new SuccessDataResult<List<TestInfo>>("patientTestInfos received", testInfos);
    }

    @Override
    public DataResult<List<TestInfo>> testInfosByPatientId(List<PatientTestInfo> patientTestInfos, boolean isSolved){
        if(patientTestInfos.isEmpty()){
            return new ErrorDataResult<List<PatientTestInfo>>("'patientTestInfos' parameter argument haven't any element", patientTestInfos);
        }


        List<TestInfo> testInfos = new ArrayList<TestInfo>();
        for(PatientTestInfo patientTestInfo : patientTestInfos){
            if (patientTestInfo.getSolved() == isSolved){
                DataResult<TestInfo> testInfoDataResult = testService.getNameAndTestCodeById(patientTestInfo.getId());
                if(!testInfoDataResult.isSuccess()){
                    continue;
                }
                TestInfo testInfo = testInfoDataResult.getData();

                testInfos.add(new TestInfo(
                        testInfo.getId(),
                        testInfo.getName(),
                        testInfo.getTestCode()
                ));
            }
        }

        if(testInfos.isEmpty()){
            return new ErrorDataResult<List<TestInfo>>("Request fulfilled successfully but testInfos list is empty", testInfos);
        }


        return new SuccessDataResult<List<TestInfo>>("patientTestInfos received", testInfos);
    }

    @Override
    public DataResult<List<TestInfo>> getTestInfosByPatientId(String patientId){
        DataResult<List<PatientTestInfo>> patientTestInfosResult = patientService.getPatientAssignedTestInfoByPatientId(patientId);
        if(!patientTestInfosResult.isSuccess()){
            return new ErrorDataResult<List<PatientTestInfo>>(patientTestInfosResult.getMessage(), patientTestInfosResult.getData());
        }
        List<PatientTestInfo> patientTestInfos = patientTestInfosResult.getData();


        DataResult<List<TestInfo>> testInfosDataResult = testInfosByPatientId(patientTestInfos);
        if(!testInfosDataResult.isSuccess()){
            return new ErrorDataResult<List<TestInfo>>(testInfosDataResult.getMessage(), testInfosDataResult.getData());
        }
        List<TestInfo> testInfos = testInfosDataResult.getData();


        return new SuccessDataResult<List<TestInfo>>("Patient assigned tests were brought.", testInfos);
    }

    @Override
    public DataResult<List<AssignedTestToPatient>> getTestDetailByPatientId(String patientId, boolean isSolved) {
        DataResult<List<AssignedTestToPatient>> patientTestResult = patientService.findAssignedTestsByPatientId(patientId);

        if(!patientTestResult.isSuccess()){
            return new ErrorDataResult<List<AssignedTestToPatient>>(patientTestResult.getMessage(), patientTestResult.getData());
        }
        List<AssignedTestToPatient> patientTests = patientTestResult.getData();

        List<AssignedTestToPatient> tests = new ArrayList<AssignedTestToPatient>();
        for(AssignedTestToPatient test : patientTests){
            if(test.getSolved() == isSolved){
                tests.add(test);
            }
        }

        return new SuccessDataResult<List<AssignedTestToPatient>>("test list is recieved", tests);
    }

    @Override
    public DataResult<List<TestInfo>> getTestInfosByPatientId(String patientId, boolean isSolved){
        DataResult<List<PatientTestInfo>> patientTestInfosResult = patientService.getPatientAssignedTestInfoByPatientId(patientId);
        if(!patientTestInfosResult.isSuccess()){
            return new ErrorDataResult<List<PatientTestInfo>>(patientTestInfosResult.getMessage(), patientTestInfosResult.getData());
        }
        List<PatientTestInfo> patientTestInfos = patientTestInfosResult.getData();


        DataResult<List<TestInfo>> testInfoDataResult = testInfosByPatientId(patientTestInfos, isSolved);
        if(!testInfoDataResult.isSuccess()){
            return new ErrorDataResult<List<TestInfo>>(testInfoDataResult.getMessage(), testInfoDataResult.getData());
        }
        List<TestInfo> testInfos = testInfoDataResult.getData();


        return new SuccessDataResult<List<TestInfo>>
                ("Patient assigned tests were brought. isSolved: " + isSolved , testInfos);
    }

    @Override
    public DataResult<List<AssignedTestToPatient>> deleteUnsolvedTestFromPatient(String patientId, String testId, int[] addedAt) {
        Patient patient = patientDao.getPatientById(patientId);
        if(patient == null){
            return new ErrorDataResult<Patient>("patient is null", patient);
        }

        List<AssignedTestToPatient> assignedTests = patient.getAssignedTests();
        Iterator<AssignedTestToPatient> iterator = assignedTests.iterator();
        while (iterator.hasNext()) {
            AssignedTestToPatient test = iterator.next();
            if (test.getSolved()) {
                continue;
            }
            if (!test.getTestId().equals(testId)) {
                continue;
            }
            if (!compareAddedAt(test.getAddedAt(), addedAt)) {
                continue;
            }
            iterator.remove();
        }

        patient.setAssignedTests(assignedTests);
        patientDao.save(patient);

        return new SuccessDataResult<>("Unsolved test removed from patient", addedAt);
        //return new SuccessDataResult<>("Unsolved test removed from patient", patient.getAssignedTests());
    }

    @Override
    public DataResult<List<AssignedTestToPatient>> addTestToPatient(String patientId, String testId) {
        Patient patient = patientDao.getPatientById(patientId);
        if(patient == null){
            return new ErrorDataResult<Patient>("patient is null", patient);
        }

        AssignedTestToPatient assignedTestToPatient = AssignedTestToPatient.builder()
                .testId(testId)
                .results(null)
                .solved(false)
                .addedAt(LocalDateTime.now())
                .solvedAt(null)
                .build();

        List<AssignedTestToPatient> assignedTests = patient.getAssignedTests();
        assignedTests.add(assignedTestToPatient);

        patient.setAssignedTests(assignedTests);
        patientDao.save(patient);

        return new SuccessDataResult<>("Added test to patient", patient.getAssignedTests());
    }

    // addedAt değerlerini karşılaştırmak için yardımcı fonksiyon
    private boolean compareAddedAt(LocalDateTime dbAddedAt, int[] frontendAddedAt) {
        int[] addedAtDate = {
                dbAddedAt.getYear(),
                dbAddedAt.getMonthValue(),
                dbAddedAt.getDayOfMonth(),
                dbAddedAt.getHour(),
                dbAddedAt.getMinute(),
                dbAddedAt.getSecond(),
                dbAddedAt.getNano()
        };

        return Arrays.equals(addedAtDate, frontendAddedAt);
    }
}
