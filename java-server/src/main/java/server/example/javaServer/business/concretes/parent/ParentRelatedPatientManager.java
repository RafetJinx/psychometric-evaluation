package server.example.javaServer.business.concretes.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.parent.ParentRelatedPatientService;
import server.example.javaServer.business.abstracts.parent.ParentService;
import server.example.javaServer.business.abstracts.patient.PatientService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.ParentDao;
import server.example.javaServer.dataAccess.abstracts.PatientDao;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.userTypes.Patient;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParentRelatedPatientManager implements ParentRelatedPatientService {
    private ParentService parentService;
    private PatientService patientService;
    private ParentDao parentDao;
    private PatientDao patientDao;

    @Autowired
    public ParentRelatedPatientManager(ParentService parentService, PatientService patientService, ParentDao parentDao, PatientDao patientDao) {
        this.parentService = parentService;
        this.patientService = patientService;
        this.parentDao = parentDao;
        this.patientDao = patientDao;
    }

    @Override
    public DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByParentId(String parentId) {
        // Parent related patient ids
        List<String> patientIds = parentDao.getParentById(parentId).getRelatedPatientIds();

        if(patientIds == null){
            return new ErrorDataResult<List<String>>("PatientId request result is null", null);
        }
        else if(patientIds.isEmpty()){
            return new ErrorDataResult<List<String>>("Patient ids is empty", patientIds);
        }

        // Parent related patient info list
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
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByParentIdWithPatientId(String parentId, String patientId) {
        DataResult<List<DptPatientInfo>> parentPatientInfoListResult = getRelatedPatientNameAndSurnameAndPatientNumberByParentId(parentId);

        if(!parentPatientInfoListResult.isSuccess()){
            return new ErrorDataResult<List<DptPatientInfo>>
                    (parentPatientInfoListResult.getMessage(), parentPatientInfoListResult.getData());
        }

        for(DptPatientInfo dptPatientInfo : parentPatientInfoListResult.getData()){
            if(patientId.equals(dptPatientInfo.getId())){
                return new SuccessDataResult<DptPatientInfo>
                        ("There is a relationship between the patient and the parent given the id.", dptPatientInfo);
            }
        }
        return new ErrorDataResult<DptPatientInfo>
                ("There is no relationship between the parent given id and the patient.", null);
    }
}
