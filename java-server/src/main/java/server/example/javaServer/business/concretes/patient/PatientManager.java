package server.example.javaServer.business.concretes.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.userTypes.Patient;
import server.example.javaServer.model.info.test.PatientTestInfo;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientManager implements PatientService {
    private PatientDao patientDao;

    @Autowired
    public PatientManager(PatientDao patientDao) {
        this.patientDao = patientDao;
    }


    @Override
    public DataResult<Patient> savePatient(Patient patient) {
        patientDao.save(patient);
        return new SuccessDataResult<Patient>("Patient saved to database", patient);
    }

    @Override
    public DataResult<List<Patient>> getAll() {
        List<Patient> patients = patientDao.findAll();

        if(patients == null){
            return new ErrorDataResult<List<Patient>>("Patient is null", null);
        }
        else if(patients.isEmpty()){
            return new ErrorDataResult<List<Patient>>("No patient was found", patients);
        }
        else {
            return new SuccessDataResult<List<Patient>>("All patients were brought.", patients);
        }
    }

    @Override
    public DataResult<List<AssignedTestToPatient>> findAssignedTestsByPatientId(String patientId) {
        List<AssignedTestToPatient> assignedTests = patientDao.getPatientsBy(patientId).get(0).getAssignedTests();

        if(assignedTests == null){
            return new ErrorDataResult<List<AssignedTestToPatient>>("Assigned test to patient list is null", null);
        }
        else if(assignedTests.isEmpty()){
            return new ErrorDataResult<List<AssignedTestToPatient>>("No assigned test was found", assignedTests);
        } else {
            return new SuccessDataResult<List<AssignedTestToPatient>>
                    ("All assigned tests were brought.", assignedTests);
        }
    }

    @Override
    public DataResult<List<PatientTestInfo>> getPatientAssignedTestInfoByPatientId(String patientId) {
        DataResult<List<AssignedTestToPatient>> assignedTestsResult = findAssignedTestsByPatientId(patientId);

        if(!assignedTestsResult.isSuccess()){
            return new ErrorDataResult<>(assignedTestsResult.getMessage(), assignedTestsResult.getData());
        }
        List<AssignedTestToPatient> assignedTests = assignedTestsResult.getData();

        // filtreleme islemi
        List<PatientTestInfo> patientTestInfos = new ArrayList<PatientTestInfo>();
        for(AssignedTestToPatient testInfo : assignedTests){
            patientTestInfos.add(new PatientTestInfo(testInfo.getTestId(), testInfo.getSolved()));
        }

        return new SuccessDataResult<List<PatientTestInfo>>
                ("All tests assigned to the patient were brought.", patientTestInfos);
    }


    @Override
    public DataResult<List<String>> getPatientDiagnosesByPatientId(String patientId) {
        List<String> diagnoses = patientDao.getPatientById(patientId).getDiagnosis();

        if(diagnoses == null){
            return new ErrorDataResult<List<String>>("Diagnoses are null");
        }
        if(diagnoses.isEmpty()){
            return new ErrorDataResult<List<String>>("No diagnoses was found");
        }
        else {
            return new SuccessDataResult<List<String>>("All diagnoses were brought.", diagnoses);
        }
    }


}