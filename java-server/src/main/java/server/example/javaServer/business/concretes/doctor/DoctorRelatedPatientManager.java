package server.example.javaServer.business.concretes.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.doctor.DoctorRelatedPatientService;
import server.example.javaServer.business.abstracts.doctor.DoctorService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.DoctorDao;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.model.AssignedTestToPatient;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.userTypes.Doctor;
import server.example.javaServer.model.userTypes.Patient;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorRelatedPatientManager implements DoctorRelatedPatientService {
    private DoctorService doctorService;
    private PatientService patientService;
    private DoctorDao doctorDao;
    private PatientDao patientDao;

    @Autowired
    public DoctorRelatedPatientManager(DoctorService doctorService, PatientService patientService, DoctorDao doctorDao, PatientDao patientDao) {
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.doctorDao = doctorDao;
        this.patientDao = patientDao;
    }

    @Override
    public DataResult<Patient> savePatient(Patient patient) {
        Patient newPatient = new Patient();

        // user
        newPatient.setRole("patient");
        newPatient.setUsername(patient.getUsername());
        newPatient.setPassword(patient.getPassword());
        newPatient.setEmail(patient.getEmail());
        newPatient.setName(patient.getName());
        newPatient.setSurname(patient.getSurname());
        newPatient.setIsActive(patient.getIsActive());

        // patient
        newPatient.setDoctorId(patient.getDoctorId());
        newPatient.setAssignedTests(new ArrayList<AssignedTestToPatient>());
        newPatient.setParents(new ArrayList<String>());
        newPatient.setTeachers(new ArrayList<String>());
        newPatient.setDiagnosis(new ArrayList<String>());

        patientService.savePatient(newPatient).getData();

        Doctor doctor = doctorDao.getDoctorById(newPatient.getDoctorId());
        List<String> patientIds =  doctor.getPatientIds();


        patientIds.add(newPatient.getId());

        doctor.setPatientIds(patientIds);
        doctorDao.save(doctor);

        return new SuccessDataResult<>(newPatient.getDoctorId(), newPatient);
    }

    @Override
    public DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId(String doctorId) {
        List<String> patientIds = doctorDao.getDoctorById(doctorId).getPatientIds();

        if(patientIds.isEmpty()){
            return new ErrorDataResult<List<String>>("patientId list is empty", patientIds);
        }

        List<DptPatientInfo> infoList = new ArrayList<DptPatientInfo>();
        for(String patientId : patientIds){
            Patient patient = patientDao.getPatientById(patientId);

            if(patient == null){
                return new ErrorDataResult<List<Patient>>("Patient request result is null", null);
            }

            infoList.add(new DptPatientInfo(patient.getId(), patient.getName(), patient.getSurname()));
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<DptPatientInfo>>("infoList is empty", infoList);
        }

        return new SuccessDataResult<List<DptPatientInfo>>
                ("Name, surname and number information of patients related to the parent was retrieved", infoList);
    }

    @Override
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByDoctorIdWithPatientId(String doctorId, String patientId) {
        DataResult<List<DptPatientInfo>> doctorPatientInfoListResult = this.getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId(doctorId);

        if(!doctorPatientInfoListResult.isSuccess()){
            return new ErrorDataResult<List<DptPatientInfo>>(doctorPatientInfoListResult.getMessage(), doctorPatientInfoListResult.getData());
        }

        for(DptPatientInfo dptPatientInfo : doctorPatientInfoListResult.getData()){
            if(patientId.equals(dptPatientInfo.getId())){
                return new SuccessDataResult<DptPatientInfo>
                        ("There is a relationship between the patient and the doctor given the id.", dptPatientInfo);
            }
        }

        return new ErrorDataResult<DptPatientInfo>
                ("There is no relationship between the doctor given id and the patient.", null);
    }
}
