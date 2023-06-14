package server.example.javaServer.business.abstracts.patient;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

public interface PatientRelatedTeacherService {
    DataResult<List<DptPatientInfo>> getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(String patientId);
}
