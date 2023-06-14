package server.example.javaServer.business.concretes.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.patient.PatientRelatedTeacherService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.business.abstracts.teacher.TeacherService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.dataAccess.abstracts.TeacherDao;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.info.userTypes.TeacherInfo;
import server.example.javaServer.model.userTypes.Patient;
import server.example.javaServer.model.userTypes.Teacher;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientRelatedTeacherManager implements PatientRelatedTeacherService {
    private TeacherService teacherService;
    private PatientService patientService;

    private TeacherDao teacherDao;
    private PatientDao patientDao;

    @Autowired
    public PatientRelatedTeacherManager(TeacherService teacherService, PatientService patientService, TeacherDao teacherDao, PatientDao patientDao) {
        this.teacherService = teacherService;
        this.patientService = patientService;
        this.teacherDao = teacherDao;
        this.patientDao = patientDao;
    }

    @Override
    public DataResult<List<DptPatientInfo>> getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(String patientId) {
        List<String> teacherIds = patientDao.getPatientById(patientId).getTeachers();

        if(teacherIds == null){
            return new ErrorDataResult<List<String>>("TeacherIds request result is null", null);
        }
        else if(teacherIds.isEmpty()){
            return new ErrorDataResult<List<String>>("Teacher ids is empty", teacherIds);
        }

        // Patient related teacher info list
        List<DptPatientInfo> infoList = new ArrayList<DptPatientInfo>();
        for(String teacherId : teacherIds){
            Teacher teacher = teacherDao.getTeacherById(teacherId);

            if(teacher == null){
                return new ErrorDataResult<List<Patient>>("Teacher request result is null", null);
            }

            infoList.add(new DptPatientInfo(teacher.getId(), teacher.getName(), teacher.getSurname()));
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<DptPatientInfo>>("infoList is empty", infoList);
        }

        return new SuccessDataResult<List<DptPatientInfo>>
                ("Name, surname and number information of teachers related to the patient was retrieved", infoList);
    }
}
