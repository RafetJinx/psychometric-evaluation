package server.example.javaServer.business.concretes.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.business.abstracts.teacher.TeacherRelatedPatientService;
import server.example.javaServer.business.abstracts.teacher.TeacherService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.dataAccess.abstracts.TeacherDao;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.userTypes.Patient;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherRelatedPatientManager implements TeacherRelatedPatientService {
    private TeacherService teacherService;
    private PatientService patientService;
    private TeacherDao teacherDao;
    private PatientDao patientDao;

    @Autowired
    public TeacherRelatedPatientManager(TeacherService teacherService, PatientService patientService, TeacherDao teacherDao, PatientDao patientDao) {
        this.teacherService = teacherService;
        this.patientService = patientService;
        this.teacherDao = teacherDao;
        this.patientDao = patientDao;
    }


    @Override
    public DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId(String teacherId) {
        // Teacher related patient ids
        List<String> patientIds = teacherDao.getTeacherById(teacherId).getRelatedPatientIds();

        if(patientIds == null){
            return new ErrorDataResult<List<String>>("PatientId request result is null", null);
        }
        else if(patientIds.isEmpty()){
            return new ErrorDataResult<List<String>>("Patient ids is empty", patientIds);
        }

        // Teacher related patient info list
        List<DptPatientInfo> infoList = new ArrayList<DptPatientInfo>();
        for(String patientId : patientIds){
            Patient patient = patientDao.getPatientById(patientId);

            if(patient == null){
                return new ErrorDataResult<List<Patient>>("Patient request result is null", null);
            }

            infoList.add(new DptPatientInfo(patient.getId(), patient.getName(), patient.getSurname()));
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<DptPatientInfo>>("infolist is empty", infoList);
        }

        return new SuccessDataResult<List<DptPatientInfo>>
                ("Name, surname and number information of patients related to the teacher was retrieved", infoList);
    }

    @Override
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByTeacherIdWithTeacherId(String teacherId, String patientId) {
        DataResult<List<DptPatientInfo>> teacherPatientInfoListResult = getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId(teacherId);

        if(!teacherPatientInfoListResult.isSuccess()){
            return new ErrorDataResult<List<DptPatientInfo>>
                    (teacherPatientInfoListResult.getMessage(), teacherPatientInfoListResult.getData());
        }

        for(DptPatientInfo teacherAndTeacherPatientInfo : teacherPatientInfoListResult.getData()){
            if(patientId.equals(teacherAndTeacherPatientInfo.getId())){
                return new SuccessDataResult<DptPatientInfo>
                        ("There is a relationship between the patient and the teacher given the id.", teacherAndTeacherPatientInfo);
            }
        }
        return new ErrorDataResult<DptPatientInfo>
                ("There is no relationship between the teacher given id and the patient.", null);
    }
}
