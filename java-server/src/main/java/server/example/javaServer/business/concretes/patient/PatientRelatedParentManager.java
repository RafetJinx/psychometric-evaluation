package server.example.javaServer.business.concretes.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.parent.ParentService;
import server.example.javaServer.business.abstracts.patient.PatientRelatedParentService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.ParentDao;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.info.userTypes.ParentInfo;
import server.example.javaServer.model.userTypes.Parent;
import server.example.javaServer.model.userTypes.Patient;
import server.example.javaServer.model.userTypes.Teacher;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientRelatedParentManager implements PatientRelatedParentService {
    private ParentService parentService;
    private PatientService patientService;

    private ParentDao parentDao;
    private PatientDao patientDao;

    @Autowired
    public PatientRelatedParentManager(ParentService parentService, PatientService patientService, ParentDao parentDao, PatientDao patientDao) {
        this.parentService = parentService;
        this.patientService = patientService;
        this.parentDao = parentDao;
        this.patientDao = patientDao;
    }


    @Override
    public DataResult<List<DptPatientInfo>> getRelatedParentNameAndSurnameAndParentNumberByPatientId(String patientId) {
        List<String> parentIds = patientDao.getPatientById(patientId).getParents();

        if(parentIds == null){
            return new ErrorDataResult<List<String>>("ParentIds request result is null", null);
        }
        else if(parentIds.isEmpty()){
            return new ErrorDataResult<List<String>>("Parent ids is empty", parentIds);
        }

        // Patient related teacher info list
        List<DptPatientInfo> infoList = new ArrayList<DptPatientInfo>();
        for(String teacherId : parentIds){
            Parent parent = parentDao.getParentById(teacherId);

            if(parent == null){
                return new ErrorDataResult<List<Patient>>("Parent request result is null", null);
            }

            infoList.add(new DptPatientInfo(parent.getId(), parent.getName(), parent.getSurname()));
        }

        if(infoList.isEmpty()){
            return new ErrorDataResult<List<DptPatientInfo>>("infoList is empty", infoList);
        }

        return new SuccessDataResult<List<DptPatientInfo>>
                ("Name, surname and number information of parents related to the patient was retrieved", infoList);
    }
}
